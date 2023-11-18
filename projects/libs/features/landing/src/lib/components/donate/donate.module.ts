import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateComponent } from './donate.component';
import { SharedModule } from '@critical-pass/shared/layout';
import { NgxPayPalModule } from 'ngx-paypal';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [DonateComponent],
    imports: [CommonModule, SharedModule, FormsModule, NgxPayPalModule],
})
export class DonateModule {}
