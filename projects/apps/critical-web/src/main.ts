import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { environment } from '@critical-pass/shared/environments';
if (environment.production) {
    enableProdMode();
}
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

// import { AppModule } from './app/app.module';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { provideHttpClient } from '@angular/common/http';
// if (environment.production) {
//     enableProdMode();
// }

// platformBrowserDynamic()
//     .bootstrapModule(AppModule)
//     .catch(err => console.error(err));
