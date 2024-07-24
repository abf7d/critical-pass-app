import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MsalService } from '@critical-pass/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactForm, EmailApiService } from '@critical-pass/shared/data-access';
@Component({
    selector: 'da-request-access',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './request-access.component.html',
    styleUrl: './request-access.component.scss',
})
export class RequestAccessComponent {
    public hasConsented: boolean = false;
    public form: FormGroup;
    public hasError: boolean = false;
    public hasAccess: boolean = false;
    public loading: boolean = true;

    maxLengthMessage = 255;
    remainingCharacters: number = 255;
    constructor(
        private authService: MsalService,
        private fb: FormBuilder,
        private emailApi: EmailApiService,
    ) {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
            phone: [''],
            message: ['', [Validators.required, Validators.maxLength(this.maxLengthMessage)]],
            consent: [false],
        });
    }
    ngOnInit() {
        this.form.get('message')!.valueChanges.subscribe(value => {
            this.remainingCharacters = this.maxLengthMessage - (value ? value.length : 0);
        });
        this.emailApi.getAccess('request-access').subscribe(hasAccess => {
            this.hasAccess = hasAccess;
            this.loading = false;
        });
    }
    public logout() {
        this.authService.logout();
    }

    onSubmit() {
        if (this.form.valid) {
            console.log(this.form.value);
            const contactInfo = this.form.value as ContactForm;
            contactInfo.form = 'request-access';
            this.emailApi.contactUs(contactInfo).subscribe(
                message => {
                    console.log('Email sent successfully');
                },
                error => {
                    console.error('Error sending email', error);
                    this.hasError = true;
                },
            );
        } else {
            this.form.value;
            console.log('Form is not valid');
        }
    }
}
