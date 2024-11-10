import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@critical-pass/project/types';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LibraryStoreService } from '../library-store/library-store.service';
import * as CONST from '../constants';
import { API_CONST, PROJECT_STORAGE_TOKEN, ProjectStorage } from '@critical-pass/shared/data-access';
import { ProjectStorageApiService } from '@critical-pass/shared/data-access';
import { HttpClient } from '@angular/common/http';
import { ClaimsService } from '@critical-pass/auth';
import { environment } from '@critical-pass/shared/environments';

@Component({
    selector: 'cp-library-bar',
    templateUrl: './library-bar.component.html',
    styleUrls: ['./library-bar.component.scss'],
})
export class LibraryBarComponent implements OnInit, OnDestroy {
    public maxPage = 0;
    public currentPage = 0;
    public pageSize!: number;
    public sub!: Subscription;
    public hasWork!: boolean;

    public showPeek!: boolean;
    public peekProj!: Project | null;
    public isAdmin!: boolean;
    public filterByOwner: string = 'all';
    public sortDirection: string = 'asc';
    public enableJira: boolean = false;
    public showUserDetails: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private libraryStore: LibraryStoreService,
        private router: Router,
        @Inject(PROJECT_STORAGE_TOKEN) private storageApi: ProjectStorage,
        private httpClient: HttpClient,
        private claimsService: ClaimsService,
    ) {}

    public ngOnInit(): void {
        this.enableJira = environment.enableJira;
        this.isAdmin = this.claimsService.isAdmin();
        this.pageSize = CONST.LIBRARY_PAGE_SIZE;
        this.showPeek = false;
        const storedFilter = localStorage.getItem('filterByOwner');
        this.filterByOwner = storedFilter ? storedFilter : 'all';
        const sortDirection = localStorage.getItem('sortDirection');
        this.sortDirection = sortDirection ? sortDirection : 'asc';
        const storedDetails = localStorage.getItem('showDetails');
        this.showUserDetails = storedDetails === 'true';

        this.activatedRoute.params.subscribe(params => {
            this.currentPage = +params['page'];
            this.sub = this.libraryStore.maxProjectCount$.pipe(filter(x => x !== null)).subscribe(count => {
                if (count !== null) this.setMaxPage(count);
            });
            this.libraryStore.pageNumber$.next(this.currentPage);
        });

        this.hasWork = this.hasSavedWork();
    }
    public setMaxPage(count: number) {
        const max = Math.ceil(count / this.pageSize);
        this.maxPage = max - 1;
    }
    public pageRight(): void {
        this.router.navigateByUrl(
            `/library/(grid/${this.currentPage + 1}//sidebar:libar/${this.currentPage + 1})?sort=${this.sortDirection}&filter=${this.filterByOwner}`,
        );
    }
    public pageLeft(): void {
        this.router.navigateByUrl(
            `/library/(grid/${this.currentPage - 1}//sidebar:libar/${this.currentPage - 1})?sort=${this.sortDirection}&filter=${this.filterByOwner}`,
        );
    }
    public hasSavedWork(): boolean {
        const proj = this.storageApi.get(API_CONST.LOCAL_STORAGE);
        return proj !== null;
    }
    public ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    public async peekStorage() {
        this.peekProj = this.peekProj ?? (await this.storageApi.get(API_CONST.LOCAL_STORAGE));
    }
    public navigate(url: string): void {
        this.router.navigateByUrl(url);
    }

    public onFilterChange(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        this.filterByOwner = selectElement.value;
        localStorage.setItem('filterByOwner', this.filterByOwner);
        this.refreshPageUrl();
    }
    public setSortDirection(dir: string) {
        this.sortDirection = dir;
        localStorage.setItem('sortDirection', this.sortDirection);
        this.refreshPageUrl();
    }

    public toggleUserDetails() {
        this.showUserDetails = !this.showUserDetails;
        const show = JSON.stringify(this.showUserDetails);
        localStorage.setItem('showDetails', show);
        this.refreshPageUrl();
    }
    private refreshPageUrl() {
        const show = JSON.stringify(this.showUserDetails);
        this.router.navigateByUrl(
            `/library/(grid/${this.currentPage + 1}//sidebar:libar/0)?sort=${this.sortDirection}&filter=${this.filterByOwner}&details=${show}`,
        );
    }
}
