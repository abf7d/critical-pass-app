import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@critical-pass/shared/environments';

@Component({
    selector: 'cp-left-menu-layout',
    templateUrl: './left-menu-layout.component.html',
    styleUrls: ['./left-menu-layout.component.scss'],
})
export class LeftMenuLayoutComponent implements OnInit {
    ngOnInit(): void {}

    public navigateHome(): void {
        window.location.href = environment.postLogoutUrl;
    }
}
