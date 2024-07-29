import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowBarComponent } from './arrow-bar.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { SelectedActivityComponent } from '../selected-activity/selected-activity.component';
import { GraphOptionsComponent } from '../graph-options/graph-options.component';
import { RiskDecompressComponent } from '../risk-decompress/risk-decompress.component';
import { MatNativeDateModule } from '@angular/material/core';
import { OutsideClickModule } from '../../../../../charts/src/lib/directives/outside-click/outside-click.module';

@NgModule({
    declarations: [ArrowBarComponent, SelectedActivityComponent, GraphOptionsComponent, RiskDecompressComponent],
    imports: [CommonModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, OutsideClickModule],
    exports: [ArrowBarComponent, SelectedActivityComponent, GraphOptionsComponent, RiskDecompressComponent],
})
export class ArrowBarModule {}
