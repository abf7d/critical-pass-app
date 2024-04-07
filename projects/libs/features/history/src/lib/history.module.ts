import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryActionButtonsComponent } from './history-action-buttons/history-action-buttons.component';
import { HistoryLayoutComponent } from './history-layout/history-layout.component';
import { HistoryRoutingModule } from './history.routes';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArrowChartModule, ArrowSnapshotModule, ProjectTreeModule } from '@critical-pass/charts';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FileActionButtonsModule, SharedModule } from '@critical-pass/shared/layout';

@NgModule({
    declarations: [HistoryActionButtonsComponent, HistoryLayoutComponent],
    imports: [
        CommonModule,
        HistoryRoutingModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatTooltipModule,
        ArrowChartModule,
        ArrowSnapshotModule,
        ProjectTreeModule,
        FormsModule,
        FileActionButtonsModule,
    ],
    exports: [HistoryActionButtonsComponent],
})
export class HistoryModule {}
