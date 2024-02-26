import { ApplicationConfig, ErrorHandler, Injectable, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthHttpInterceptor } from '@critical-pass/auth';
import { DASHBOARD_TOKEN, DashboardService, EVENT_SERVICE_TOKEN, EventService } from '@critical-pass/shared/data-access';
import { CanDeactivateGuard, LoggerService } from '@critical-pass/core';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoggerModule } from 'ngx-logger';
import { environment } from '@critical-pass/shared/environments';

export const appBaseConfig: ApplicationConfig = {
    providers: [
        // Routes provided in the web and desktop apps: provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        importProvidersFrom(LoggerModule.forRoot({ level: environment.logLevel })),
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthHttpInterceptor,
        //     multi: true,
        // },
        // { provide: DASHBOARD_TOKEN, useClass: DashboardService },
        { provide: EVENT_SERVICE_TOKEN, useClass: EventService },
        { provide: ErrorHandler, useClass: LoggerService },

        CanDeactivateGuard,
        provideClientHydration(),
        provideToastr(),
    ],
};
