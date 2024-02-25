import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appBaseConfig } from '@critical-pass/core';
import { routes } from '@critical-pass/desktop-lib';
import { DesktopProjectApiService, PROJECT_API_TOKEN } from '@critical-pass/shared/data-access';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), ...appBaseConfig.providers, { provide: PROJECT_API_TOKEN, useClass: DesktopProjectApiService }],
};
