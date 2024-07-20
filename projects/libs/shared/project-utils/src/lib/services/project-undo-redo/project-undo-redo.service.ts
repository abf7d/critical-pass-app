import { Injectable } from '@angular/core';
import { Project } from '@critical-pass/project/types';
import { BehaviorSubject } from 'rxjs';
import { CanUndoRedo } from '../../types/can-undo-redo';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import { NodeConnectorService, ProjectCompilerService } from '@critical-pass/project/processor';
import { ProjectSanatizerService } from '@critical-pass/shared/project-utils';

@Injectable({
    providedIn: 'root',
})
export class ProjectUndoRedoService {
    private _canUndoRedo = new BehaviorSubject<CanUndoRedo>({ canUndo: false, canRedo: false });
    public allowUndoRedo = false;
    public inState: string | null = null;
    private undoRedoState = {
        past: [] as string[],
        future: [] as string[],
    };

    constructor(
        private sanitizer: ProjectSanatizerService,
        private nodeConnector: NodeConnectorService,
        public projSerializer: ProjectSerializerService,
    ) {}
    get canUndoRedo$(): BehaviorSubject<CanUndoRedo> {
        return this._canUndoRedo;
    }

    public getState(project: Project) {
        const copy = this.projSerializer.fromJson(project);
        this.sanitizer.sanatizeForSave(copy);
        const save = { activities: copy.activities, integrations: copy.integrations };
        return JSON.stringify(save);
    }
    public initializeState(project: Project) {
        const newStateTxt = this.getState(project);
        this.inState = newStateTxt;
    }

    public resetUndoRedo() {
        this.undoRedoState.past = [];
        this.undoRedoState.future = [];
        this.inState = null;
        this.updateCanUndoRedo();
    }
    public addOneToUndo(project: Project) {
        // very simple implementation of state diff check
        // TODO: implement a more sophisticated state diff check
        if (!this.allowUndoRedo) return;
        // const newState = project; //this.activeProject$.getValue();
        const newStateTxt = this.getState(project);
        if (newStateTxt !== this.inState) {
            const oldState = this.inState;
            this.inState = newStateTxt;
            if (this.undoRedoState.past.length >= 3) {
                this.undoRedoState.past.shift(); // Remove the oldest entry
            }
            if (oldState) {
                this.undoRedoState.past.push(oldState);
            }
            this.undoRedoState.future = [];
            this.updateCanUndoRedo();
        }
    }
    private loadState(activeProject$: BehaviorSubject<Project>, state: string) {
        this.inState = state;
        const updateProject = this.projSerializer.fromJson(JSON.parse(state));
        this.nodeConnector.connectArrowsToNodes(updateProject);
        const currentProject = activeProject$.getValue();
        const copy = this.projSerializer.fromJson(currentProject);
        copy.activities = updateProject.activities;
        copy.integrations = updateProject.integrations;
        copy.profile.view.autoZoom = true;
        activeProject$.next(copy);
    }
    public undo(activeProject$: BehaviorSubject<Project>) {
        if (!this.allowUndoRedo) return;
        const oldState = this.undoRedoState.past.pop();
        if (oldState) {
            const futureProject = this.inState;
            this.loadState(activeProject$, oldState);
            if (futureProject) {
                this.undoRedoState.future.push(futureProject);
            }
            this.updateCanUndoRedo();
        }
    }

    public redo(activeProject$: BehaviorSubject<Project>) {
        if (!this.allowUndoRedo) return;
        const newState = this.undoRedoState.future.pop();
        if (newState) {
            const pastProject = this.inState;
            this.inState = newState;
            this.loadState(activeProject$, newState);
            if (pastProject) {
                this.undoRedoState.past.push(pastProject);
            }
            this.updateCanUndoRedo();
        }
    }
    private updateCanUndoRedo() {
        const canUndo = this.undoRedoState.past.length > 0;
        const prevCanUndoRedo = this._canUndoRedo.getValue();
        prevCanUndoRedo.undoCount = this.undoRedoState.past.length;
        prevCanUndoRedo.redoCount = this.undoRedoState.future.length;
        let update = false;
        if (canUndo !== prevCanUndoRedo.canUndo) {
            prevCanUndoRedo.canUndo = canUndo;
            update = true;
        }
        const canRedo = this.undoRedoState.future.length > 0;
        if (canRedo !== prevCanUndoRedo.canRedo) {
            prevCanUndoRedo.canRedo = canRedo;
            update = true;
        }
        this._canUndoRedo.next(prevCanUndoRedo);
    }
}
