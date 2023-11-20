import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ExplorerLibModule } from '@critical-pass/web-lib';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
@Component({
    selector: 'test-root',
    standalone: false,
    template: `<div>Test</div>`,
    styles: [''],
    // imports: [RouterOutlet, AppModule], //[AppModule, , ],
    // exportAs: [RouterModule],
})
export class TestComponent {
    title = 'Critical Pass';
}
