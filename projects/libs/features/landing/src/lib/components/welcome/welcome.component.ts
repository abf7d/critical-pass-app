import { BehaviorSubject, combineLatest } from 'rxjs';
import { Component, OnInit, HostListener, Inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { AuthStateService, MsalService } from '@critical-pass/auth';
import * as CONST from '../../constants';
import { LibraryFilters, PROJECT_API_TOKEN, ProjectApi } from '@critical-pass/shared/data-access';
import { Project } from '@critical-pass/project/types';
import { NodeConnectorService } from '@critical-pass/project/processor';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from '../../types/video';
@Component({
    selector: 'cp-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
    public loading!: boolean;
    public isLoggedIn$: BehaviorSubject<boolean | null>;
    public name!: string;
    public isLoggedIn!: boolean;
    public unauthorizedClaims!: boolean;
    public errorLoadingProject: boolean;
    public thirdPartyCookiesBlocked: boolean;

    public isAuthorized: boolean | null;
    public loginError!: boolean | null;
    public showLoading: boolean;
    public isAuthorized$: BehaviorSubject<boolean | null>;
    public loginError$: BehaviorSubject<boolean | null>;
    public activeVideo: string = 'arrow1';
    public projectLists: string[] = [];
    public projectLoadState: string = 'loading';
    public projects: Project[] = [];
    public selectedVideo: Video;

    public videos: Video[] = [
        { menuName: 'Draw a Project', type: 'arrow1', id: '6vb-MKcynoM', videoTitle: 'Draw an Arrow Diagram', si: 'zGOsVuxj4lIEGBtL' },
        { menuName: 'Arrow Controls', type: 'arrowControls', id: 'cB35uUIFoP8', videoTitle: 'Arrow Diagram Controls', si: 'jIsxPNEwoc-cbh1L' },
        { menuName: 'Import Data', type: 'uploadExcelFile', id: 'tRR8aRHb4L4', videoTitle: 'Import Data into Project', si: 'LPBhkhIOGu3Vu_JP' },
        { menuName: 'Quick Start Example', type: 'quickStart', id: 'T0jwmYAB8gA', videoTitle: 'Quick Start Example', si: 'CdoTCesic5FWzQr6' },
        { menuName: 'Application Layout', type: 'applicationLayout', id: 'R3kPmTzawCE', videoTitle: 'Application Layout', si: 'HmDHijxNQPRuTAhI' },
    ];

    constructor(
        private authService: MsalService,
        private router: Router,
        private authStore: AuthStateService,
        @Inject(PROJECT_API_TOKEN) private projectApi: ProjectApi,
        private ngZone: NgZone,
        private nodeConnector: NodeConnectorService,
        private sanitizer: DomSanitizer,
    ) {
        this.isLoggedIn$ = this.authStore.isLoggedIn$;
        this.errorLoadingProject = false;
        this.thirdPartyCookiesBlocked = false;

        this.showLoading = !this.authService.hasClaims() && !this.authService.hasError();
        this.isAuthorized = this.authService.isAuthorized();
        this.isAuthorized$ = this.authStore.isAuthorized$;
        this.loginError$ = this.authStore.loginError$;
        this.videos.forEach((video: Video) => {
            video.src = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.id}?vq=hd720p&amp;hd=1&amp;si=${video.si}`);
        });
        this.selectedVideo = this.videos[0];
    }

    public ngOnInit() {
        this.loading = false;
        this.isLoggedIn$.subscribe((loggedIn: boolean | null) => {
            this.name = this.authService.getUserName() ?? '';
            this.isLoggedIn = !this.authService.accessExpired();
        });
        this.loginError$.pipe(filter(x => x !== null)).subscribe(error => {
            this.showLoading = false;
            this.loginError = error;
        });
        this.isAuthorized$.pipe(filter(auth => auth !== null)).subscribe(isAuthorized => {
            this.isAuthorized = isAuthorized;
            this.showLoading = false;
        });

        this.projectLoadState = 'loading';
        this.loadProjects(0, CONST.WELCOME_EXAMPLES_LIST_NAME);
    }

    private loadProjects(currentPage: number, listName: string | null = null) {
        const featuredExampleSize = 2;

        const filters: LibraryFilters = {
            page: currentPage,
            pageSize: featuredExampleSize,
            listName,
            sortDirection: 'desc',
            ownerFilter: null,
            searchFilter: null,
            details: 'false',
        };
        this.projectApi.list(filters).subscribe(
            projects => {
                if (projects !== null) {
                    this.initProjects(projects.items);
                }
            },
            error => {
                this.projectLoadState = 'error';
                console.error(error);
            },
        );
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
            this.projectLoadState = 'success';
        });
    }

    public login() {
        this.authService.login();
    }

    public logout() {
        this.authService.logout();
    }

    public loadLibrary() {
        if (this.isAuthorized) {
            this.loading = true;
            this.errorLoadingProject = false;
            this.router.navigateByUrl(CONST.LIBRARY_ROUTE);
        }
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

    public navigateToExamples() {
        this.router.navigateByUrl('/library/lists/default/(grid/0//sidebar:libar/0)');
    }

    @HostListener('window:message', ['$event'])
    public receiveMessage(event: any) {
        if (event.data === CONST.COOKIES_BLOCKED_ID) {
            this.thirdPartyCookiesBlocked = true;
        } else if (event.data === CONST.COOKIES_AVAIL_ID) {
            this.thirdPartyCookiesBlocked = false;
        }
    }
}
