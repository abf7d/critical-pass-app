import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ExplorerLibModule } from '@critical-pass/web-lib';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppModule } from './app.module';
// import { ExplorerRoutingModule } from '../../../../libs/app-libs/web-lib/src/lib/explorer.routes';
@Component({
    selector: 'critical-pass-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, AppModule, HttpClientModule], //[AppModule, , ],
    // exportAs: [RouterModule],
})
export class AppComponent {
    title = 'Critical Pass';
}
