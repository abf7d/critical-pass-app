import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
import { routes } from '@critical-pass/web-lib';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthHttpInterceptor } from '@critical-pass/auth';
import { DASHBOARD_TOKEN, DashboardService, EVENT_SERVICE_TOKEN, EventService } from '@critical-pass/shared/data-access';
import { CanDeactivateGuard } from '@critical-pass/core';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
        },
        { provide: DASHBOARD_TOKEN, useClass: DashboardService },
        { provide: EVENT_SERVICE_TOKEN, useClass: EventService },
        CanDeactivateGuard,
        provideClientHydration(),
    ],
};

// bootstrapApplication(AppComponent, {
//     providers: [
//         provideHttpClient(
//             withInterceptors([authInterceptor]),
//         ),
//     ]
//     Funtional interceptor:

//     import { HttpInterceptorFn } from "@angular/common/http";

//     export const authInterceptor: HttpInterceptorFn = (req, next) => {

//         req = req.clone({
//             headers
//         }

//     return next(req)
//     }

// bootstrapApplication(AppComponent, {
//     providers: [
//         provideHttpClient(
//             withInterceptorsFromDi(),
//         ),
//         {
//             provide: HTTP_INTERCEPTORS,
//             useClass: AuthInterceptor,
//             multi: true,
//         },
//      ] })
