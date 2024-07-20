import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project, View } from '@critical-pass/project/types';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import { NodeConnectorService, ProjectCompilerService } from '@critical-pass/project/processor';
import { CanUndoRedo, ProjectSanatizerService, ProjectUndoRedoService } from '@critical-pass/shared/project-utils';
@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(
        public projSerializer: ProjectSerializerService,
        public compiler: ProjectCompilerService,
        private undoRedo: ProjectUndoRedoService,
    ) {
        const emptyProj = projSerializer.fromJson();
        this._activeProject = new BehaviorSubject<Project>(emptyProj);
        this._secondaryProject = new BehaviorSubject<Project | null>(null);
    }
    private _activeProject: BehaviorSubject<Project>;
    private _secondaryProject: BehaviorSubject<Project | null>;
    private _library: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
    private _history: Project[] = [];
    private _cache: Map<number, Project> = new Map<number, Project>();
    private _allowUndoRedo = this.undoRedo.allowUndoRedo;
    private _canUndoRedo = this.undoRedo.canUndoRedo$;

    get activeProject$(): BehaviorSubject<Project> {
        return this._activeProject;
    }
    get canUndoRedo$(): BehaviorSubject<CanUndoRedo> {
        return this._canUndoRedo;
    }
    get secondaryProject$(): BehaviorSubject<Project | null> {
        return this._secondaryProject;
    }
    get library(): BehaviorSubject<Project[]> {
        return this._library;
    }
    get history(): Project[] {
        return this._history;
    }
    // For project / subproject swithcing in profile
    get cache(): Map<number, Project> {
        return this._cache;
    }
    get allowUndoRedo(): boolean {
        return this._allowUndoRedo;
    }
    set allowUndoRedo(value: boolean) {
        this._allowUndoRedo = value;
        this.undoRedo.allowUndoRedo = value;
        if (!value) {
            this.undoRedo.resetUndoRedo();
        }
    }
    public initializeActiveProject(project: Project) {
        this._activeProject.next(project);
        this.undoRedo.initializeState(project);
    }
    public cleanSlateForNewPage(project: Project) {
        this._activeProject = new BehaviorSubject<Project>(project);
    }
    public updateProject(project: Project, compile: boolean = true, recordForUndo: boolean = false) {
        if (compile) this.compiler.compile(project);
        if ((recordForUndo || !this.undoRedo.inState) && this._allowUndoRedo) this.undoRedo.addOneToUndo(project);
        this._cache.set(project.profile.id, project);
        this._activeProject.next(project);
    }
    public onDestroy() {
        const cacneKeys = Array.from(this._cache.keys());
        cacneKeys.forEach(key => {
            this._cache.delete(key);
        });
        this._secondaryProject.next(null);
        this._history = [];
        this._library.next([]);
    }

    public resetUndoRedo() {
        this.undoRedo.resetUndoRedo();
    }
    public undo() {
        this.undoRedo.undo(this.activeProject$);
    }

    public redo() {
        this.undoRedo.redo(this.activeProject$);
    }
}
