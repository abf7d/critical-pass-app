import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '@critical-pass/project/types';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import { ProjectCompilerService } from '@critical-pass/project/processor';
@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(
        public projSerializer: ProjectSerializerService,
        public compiler: ProjectCompilerService,
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
    get activeProject$(): BehaviorSubject<Project> {
        return this._activeProject;
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
    get cache(): Map<number, Project> {
        return this._cache;
    }

    public cleanSlateForNewPage(project: Project) {
        this._activeProject = new BehaviorSubject<Project>(project);
    }
    public updateProject(project: Project, compile: boolean = true) {
        if (compile) this.compiler.compile(project);
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
}
/*
 private history = {
    past: [] as State[],
    future: [] as State[],
        node.settings = p.settings;
      }
    });
    this.emit();
  }

  private emit() {
    // very simple implementation of state diff check
    // TODO: implement a more sophisticated state diff check
    const oldState = this.state$$.getValue();
    if (JSON.stringify(oldState) !== JSON.stringify(this.inState)) {
      this.state$$.next(this.inState);
      this.history.past.push(oldState);
      this.history.future = [];
    }
  }
    public undo() {
    const oldState = this.history.past.pop();
    if (oldState) {
      this.inState = oldState;
      this.state$$.next(this.inState);
      this.history.future.push(this.state$$.getValue());
    }
  }

  public redo() {
    const newState = this.history.future.pop();
    if (newState) {
      this.inState = newState;
      this.state$$.next(this.inState);
      this.history.past.push(this.state$$.getValue());
    }
  }
  */
