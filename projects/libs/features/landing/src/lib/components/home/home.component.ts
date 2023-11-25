import { BehaviorSubject, fromEvent, merge, Observable, of } from 'rxjs';
import { Component, OnInit, HostListener } from '@angular/core';
import { mapTo } from 'rxjs/operators';
import * as CONST from '../../constants';
import { AuthStateService, MsalService } from '@critical-pass/auth';
import { from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public isLoggedIn$: BehaviorSubject<boolean | null>;
    public online$: Observable<boolean>;
    public name!: string;
    public isLoggedIn!: boolean;
    public thirdPartyCookiesBlocked: boolean;

    constructor(
        private authService: MsalService,
        private authStore: AuthStateService,
    ) {
        this.isLoggedIn$ = this.authStore.isLoggedIn$;
        this.thirdPartyCookiesBlocked = false;
        this.online$ = this.checkInternetConnection();
        // this.online$ =
        //     typeof window !== 'undefined' && typeof navigator !== 'undefined'
        //         ? merge(of(navigator.onLine), fromEvent(window, 'online').pipe(mapTo(true)), fromEvent(window, 'offline').pipe(mapTo(false)))
        //         : of(false);
    }

    public ngOnInit() {
        this.isLoggedIn$.subscribe((loggedIn: boolean | null) => {
            this.name = this.authService.getUserName() ?? '';
            this.isLoggedIn = !this.authService.accessExpired();
        });
    }

    public login() {
        this.authService.login();
    }

    public logout() {
        this.authService.logout();
    }

    @HostListener('window:message', ['$event'])
    public receiveMessage(event: any) {
        if (event.data === CONST.COOKIES_BLOCKED_ID) {
            this.thirdPartyCookiesBlocked = true;
        } else if (event.data === CONST.COOKIES_AVAIL_ID) {
            this.thirdPartyCookiesBlocked = false;
        }
    }

    private checkInternetConnection(): Observable<boolean> {
        return from(fetch('https://cors-anywhere.herokuapp.com/https://www.google.com')).pipe(
            map(() => true),
            catchError(() => of(false)),
        );
    }
}
