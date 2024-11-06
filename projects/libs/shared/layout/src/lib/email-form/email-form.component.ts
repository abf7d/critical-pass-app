import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MsalService } from '@critical-pass/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactForm, EmailApiService } from '@critical-pass/shared/data-access';

@Component({
    selector: 'da-email-form',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './email-form.component.html',
    styleUrl: './email-form.component.scss',
})
export class EmailFormComponent {
    @Input() public formType: string = 'basic-form';
    @Input() public secure: boolean = false;
    @Input() public title: string = 'Email Form';
    @Output() public onSubmitResponse = new EventEmitter<string>();

    public hasConsented: boolean = false;
    public form: FormGroup;
    public hasError: boolean = false;
    public hasAccess: boolean = false;
    public loading: boolean = true;
    public loadMsg: string = 'loading';

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
            phone: ['', []],
            message: ['', [Validators.required, Validators.maxLength(this.maxLengthMessage)]],
            consent: [false],
        });
    }
    ngOnInit() {
        this.form.get('message')!.valueChanges.subscribe(value => {
            this.remainingCharacters = this.maxLengthMessage - (value ? value.length : 0);
        });
        this.emailApi.getAccess(this.formType).subscribe(
            status => {
                if (status?.code === '200') this.loadMsg = 'allowed';
                else if (status?.code === '400.U') {
                    this.loadMsg = 'user-blocked';
                    this.onSubmitResponse.emit('user-blocked');
                } else {
                    this.loadMsg = 'global-blocked';
                    this.onSubmitResponse.emit('global-blocked');
                }
            },
            error => {
                if (error.status === 429) {
                    // Handle HTTP 429: Too Many Requests
                    this.loadMsg = 'blocked';
                } else {
                    // General error handling
                    this.loadMsg = 'error'; // General error message
                }
            },
        );
    }
    public logout() {
        this.authService.logout();
    }

    onSubmit() {
        if (this.form.valid) {
            console.log(this.form.value);
            const contactInfo = this.form.value as ContactForm;
            contactInfo.form = this.formType;
            this.emailApi.contactUs(contactInfo, this.secure).subscribe(
                message => {
                    this.loadMsg = 'user-blocked';
                    this.onSubmitResponse.emit('success');
                },
                error => {
                    console.error('Error sending email', error);
                    this.loadMsg = 'error';
                },
            );
        } else {
            this.form.value;
            console.log('Form is not valid');
        }
    }
}
