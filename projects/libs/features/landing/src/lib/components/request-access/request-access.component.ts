import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MsalService } from '@critical-pass/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactForm, EmailApiService } from '@critical-pass/shared/data-access';
import { EmailFormComponent } from '../../../../../../shared/layout/src/lib/email-form/email-form.component';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'da-request-access',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, EmailFormComponent],
    templateUrl: './request-access.component.html',
    styleUrl: './request-access.component.scss',
})
export class RequestAccessComponent {
    maxLengthMessage = 255;
    remainingCharacters: number = 255;
    emailResponse: string | null = null;
    constructor(private authService: MsalService) {}
    ngOnInit() {}
    public logout() {
        this.authService.logout();
    }
    public onResponse(response: string) {
        this.emailResponse = response;
    }
}
