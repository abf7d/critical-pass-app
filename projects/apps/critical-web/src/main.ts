import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
// bootstrapApplication(AppComponent, {
//     providers: [
//     //   importProvidersFrom(AppRoutingModule),
//       provideHttpClient()
//     ]
//   })

import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideHttpClient } from '@angular/common/http';
// if (environment.production) {
//     enableProdMode();
// }

// platformBrowserDynamic()
//     .bootstrapModule(AppModule)
//     .catch(err => console.error(err));
