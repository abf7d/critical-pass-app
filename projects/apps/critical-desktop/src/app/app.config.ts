import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appBaseConfig } from '@critical-pass/core';
import { DesktopHistoryApiService, DesktopProjectApiService, DesktopProjectStorageApiService, routes } from '@critical-pass/desktop-lib';
import {
    DASHBOARD_TOKEN,
    DashboardService,
    EVENT_SERVICE_TOKEN,
    EventService,
    HISTORY_API_TOKEN,
    PROJECT_API_TOKEN,
    PROJECT_STORAGE_TOKEN,
    ProjectStorageApiService,
} from '@critical-pass/shared/data-access';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        ...appBaseConfig.providers,
        { provide: HISTORY_API_TOKEN, useClass: DesktopHistoryApiService },
        { provide: PROJECT_API_TOKEN, useClass: DesktopProjectApiService },
        { provide: PROJECT_STORAGE_TOKEN, useClass: DesktopProjectStorageApiService },
        { provide: ProjectStorageApiService, useValue: {} },
        { provide: DASHBOARD_TOKEN, useClass: DashboardService },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
};
