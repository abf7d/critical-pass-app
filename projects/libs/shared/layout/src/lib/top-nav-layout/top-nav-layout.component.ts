import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '@critical-pass/shared/environments';

@Component({
    selector: 'da-top-nav-layout',
    standalone: false,
    templateUrl: './top-nav-layout.component.html',
    styleUrl: './top-nav-layout.component.scss',
})
export class TopNavLayoutComponent {
    @Input() isSticky: boolean = true;
    constructor(private router: Router) {}
    public navigateHome(): void {
        window.location.href = environment.postLogoutUrl;
    }
}
