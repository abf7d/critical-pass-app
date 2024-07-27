import { ChangeDetectorRef, Component, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@critical-pass/project/types';
import { Subscription, combineLatest, forkJoin } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LibraryStoreService } from '../library-store/library-store.service';
import * as CONST from '../constants';
import { LibraryFilters, PROJECT_API_TOKEN, ProjectApi, ProjectApiService } from '@critical-pass/shared/data-access';
import { NodeConnectorService } from '@critical-pass/project/processor';
@Component({
    selector: 'cp-library-grid',
    templateUrl: './library-grid.component.html',
    styleUrls: ['./library-grid.component.scss'],
})
export class LibraryGridComponent implements OnInit, OnDestroy {
    public pageSize!: number;
    public projects!: Project[];
    public loadResult!: string;
    public subscription!: Subscription;
    public pageNumSub!: Subscription;
    public listName: string | null = null;
    public filterByOwner!: string;
    public sortDirection!: string;
    constructor(
        @Inject(PROJECT_API_TOKEN) private projectApi: ProjectApi,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private libraryStore: LibraryStoreService,
        private nodeConnector: NodeConnectorService,
        private ngZone: NgZone, // added for electron change detection
    ) {}

    public ngOnInit(): void {
        this.pageSize = CONST.LIBRARY_PAGE_SIZE;
        this.projects = [];
        const queryParams$ = this.activatedRoute!.parent!.queryParamMap;
        const routeParams$ = this.activatedRoute!.parent!.paramMap;
        combineLatest([queryParams$, routeParams$]).subscribe(([queryParams, routeParams]) => {
            const listName = routeParams.get('listName');
            let sortDirection = (queryParams as any).params['sort'] || null;
            let ownerFilter = (queryParams as any).params['filter'] || null;

            if (ownerFilter === null) {
                const storedFilter = localStorage.getItem('filterByOwner');
                ownerFilter = storedFilter ? storedFilter : 'all';
            }
            if (sortDirection === null) {
                const storedDir = localStorage.getItem('sortDirection');
                sortDirection = storedDir ? storedDir : 'asc';
            }

            this.pageNumSub = this.libraryStore.pageNumber$.pipe(filter(x => x !== null)).subscribe(currentPage => {
                if (currentPage !== null) {
                    this.pageSize, listName;
                    const filters: LibraryFilters = {
                        page: currentPage,
                        pageSize: this.pageSize,
                        listName,
                        sortDirection: sortDirection,
                        ownerFilter: ownerFilter,
                        searchFilter: null,
                    };
                    this.loadProjects(filters);
                }
            });
        });
    }

    public navigate(id: number) {
        this.router.navigateByUrl(`profile/(${id}//sidebar:grid/${id})`);
    }

    public navigateSketch(id: number) {
        this.router.navigateByUrl(`history/(${id}//sidebar:arrow/${id})`);
    }

    public navigateAssign(id: number) {
        this.router.navigateByUrl(`resources/(${id}//sidebar:assignbar/${id})`);
    }

    public navigateMetaGraph(id: number) {
        this.router.navigateByUrl(`network/(${id}//sidebar:meta/${id})`);
    }

    private loadProjects(filters: LibraryFilters) {
        this.loadResult = 'Loading';
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.projectApi.list(filters).subscribe(projects => {
            if (projects !== null) {
                this.libraryStore.maxProjectCount$.next(projects.totalCount);
                this.initProjects(projects.items);
            }
            this.loadResult = '';
        });
    }

    private initProjects(library: Project[]) {
        // ngZone added for electron change detection
        this.ngZone.run(() => {
            const projects: Project[] = [];
            for (const project of library) {
                this.nodeConnector.connectArrowsToNodes(project);
                projects.push(project);
            }
            this.projects = projects;
            this.loadResult = '';
        });
    }

    public ngOnDestroy() {
        if (this.pageNumSub) {
            this.pageNumSub.unsubscribe();
        }
    }
}
