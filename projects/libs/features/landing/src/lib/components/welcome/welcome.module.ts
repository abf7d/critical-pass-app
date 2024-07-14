import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { ArrowSnapshotModule } from '@critical-pass/charts';

@NgModule({
    declarations: [WelcomeComponent],
    imports: [CommonModule, RouterModule, ArrowSnapshotModule],
})
export class WelcomeModule {}
