import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalService } from '@critical-pass/auth';

@Component({
    selector: 'da-login-error',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './login-error.component.html',
    styleUrl: './login-error.component.scss',
})
export class LoginErrorComponent {
    constructor(private authService: MsalService) {}
    public logout() {
        this.authService.logout();
    }
}
