import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalService } from '@critical-pass/auth';

@Component({
    selector: 'da-login',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    constructor(private authService: MsalService) {}
    ngOnInit(): void {
        this.authService.login();
    }
}
