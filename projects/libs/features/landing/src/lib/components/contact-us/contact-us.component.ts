import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'da-contact-us',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
    public hasConsented: boolean = false;
}
