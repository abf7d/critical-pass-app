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
// import { SelectedActivityComponent } from '../../components/selected-activity/selected-activity.component';
// import { GraphOptionsComponent } from '../../components/graph-options/graph-options.component';
// import { RiskDecompressComponent } from '../../components/risk-decompress/risk-decompress.component';

@NgModule({
    declarations: [ArrowBarComponent, SelectedActivityComponent, GraphOptionsComponent, RiskDecompressComponent],
    imports: [CommonModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatIconModule],
    exports: [ArrowBarComponent, SelectedActivityComponent, GraphOptionsComponent, RiskDecompressComponent],
})
export class ArrowBarModule {}
