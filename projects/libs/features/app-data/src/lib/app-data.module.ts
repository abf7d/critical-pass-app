import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { ArrowChartModule, ArrowSnapshotModule, ProjectTreeModule } from '@critical-pass/charts';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AppDataLayoutComponent } from './app-data-layout/app-data-layout.component';
import { AppDataBarComponent } from './app-data-bar/app-data-bar.component';
import { AppDataRoutingModule } from './app-data.routes';

@NgModule({
    declarations: [AppDataLayoutComponent, AppDataBarComponent],
    imports: [
        CommonModule,
        AppDataRoutingModule,
        // MatDatepickerModule,
        // MatInputModule,
        // MatNativeDateModule,
        // MatTooltipModule,
        // ArrowChartModule,
        // ArrowSnapshotModule,
        // ProjectTreeModule,
        FormsModule,
    ],
})
export class AppDataModule {}
