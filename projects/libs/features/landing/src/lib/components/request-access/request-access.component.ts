import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MsalService } from '@critical-pass/auth';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'da-request-access',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './request-access.component.html',
    styleUrl: './request-access.component.scss',
})
export class RequestAccessComponent {
    public hasConsented: boolean = false;
    constructor(private authService: MsalService) {}
    public logout() {
        this.authService.logout();
    }
}
