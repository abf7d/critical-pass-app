import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorialsComponent } from './tutorials.component';
import { SharedModule } from '@critical-pass/shared/layout';

@NgModule({
    declarations: [TutorialsComponent],
    imports: [CommonModule, SharedModule /*TutorialsRoutingModule*/],
})
export class TutorialsModule {}
