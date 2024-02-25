import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appBaseConfig } from '@critical-pass/core';
import { PROJECT_API_TOKEN, ProjectApiService } from '@critical-pass/shared/data-access';
import { routes } from '@critical-pass/web-lib';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), ...appBaseConfig.providers, { provide: PROJECT_API_TOKEN, useClass: ProjectApiService }],
};
