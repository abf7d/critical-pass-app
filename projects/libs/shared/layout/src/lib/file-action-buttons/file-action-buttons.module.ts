import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileActionButtonsComponent } from './file-action-buttons.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [FileActionButtonsComponent],
    imports: [MatTooltipModule, FormsModule, CommonModule, RouterModule],
    exports: [FileActionButtonsComponent],
})
export class FileActionButtonsModule {}
