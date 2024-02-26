import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appBaseConfig } from '@critical-pass/core';
import { DASHBOARD_TOKEN, DashboardService, PROJECT_API_TOKEN, ProjectApiService } from '@critical-pass/shared/data-access';
import { routes } from '@critical-pass/web-lib';
import { AuthHttpInterceptor } from '../../../../libs/auth/src/lib/interceptor/auth-http-interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        ...appBaseConfig.providers,
        { provide: PROJECT_API_TOKEN, useClass: ProjectApiService },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
        },
        { provide: DASHBOARD_TOKEN, useClass: DashboardService },
    ],
};
