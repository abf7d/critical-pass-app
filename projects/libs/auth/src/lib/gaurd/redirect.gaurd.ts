import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { combineLatest, filter, firstValueFrom, forkJoin, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthStateService, ClaimsService, MsalService } from '@critical-pass/auth';

@Injectable({
    providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
    jwtHelper: JwtHelperService;
    constructor(
        private authService: MsalService,
        private router: Router,
        private authStore: AuthStateService,
    ) {
        this.jwtHelper = new JwtHelperService();
    }

    canActivate(): Promise<boolean> {
        return this.authService.ensureRedirectCompleted().then((isAuthenticated: boolean) => {
            const observable$ = combineLatest([this.authStore.isLoggedIn$, this.authStore.isAuthorized$, this.authStore.loginError$]).pipe(
                filter(([isLoggedIn, isAuthorized, loginError]) => isLoggedIn !== null && (isAuthorized !== null || loginError !== null)),
                map(([isLoggedIn, isAuthorized, loginError]) => {
                    console.log('isLoggedIn', isLoggedIn, 'isAuthorized', isAuthorized, 'loginError', loginError);
                    if (loginError) {
                        this.router.navigate(['/login-error']);
                        return true;
                    }
                    if (isAuthorized) {
                        this.router.navigate(['/welcome']);
                        return true;
                    } else {
                        this.router.navigate(['/request-access']);
                        return true;
                    }
                }),
            );
            return firstValueFrom(observable$);
        });
    }
}
