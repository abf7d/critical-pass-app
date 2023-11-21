import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { AppComponent } from './app.component';
import { ExplorerLibModule } from '@critical-pass/web-lib';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    // declarations: [AppComponent],
    imports: [/*BrowserAnimationsModule,*/ ToastrModule.forRoot(), /*RouterModule,*/ HttpClientModule, ExplorerLibModule],
    // bootstrap: [AppComponent],
})
export class AppModule {}
