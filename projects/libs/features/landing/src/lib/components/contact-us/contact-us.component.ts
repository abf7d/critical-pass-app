import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailFormComponent } from '../../../../../../shared/layout/src/lib/email-form/email-form.component';

@Component({
    selector: 'da-contact-us',
    standalone: true,
    imports: [CommonModule, FormsModule, EmailFormComponent],
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
    public hasConsented: boolean = false;
}
