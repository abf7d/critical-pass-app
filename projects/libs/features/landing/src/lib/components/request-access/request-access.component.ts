import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MsalService } from '@critical-pass/auth';

@Component({
    selector: 'da-request-access',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './request-access.component.html',
    styleUrl: './request-access.component.scss',
})
export class RequestAccessComponent {
    constructor(private authService: MsalService) {}
    public logout() {
        this.authService.logout();
    }
}
