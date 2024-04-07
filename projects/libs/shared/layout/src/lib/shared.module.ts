import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LeftMenuLayoutComponent } from './left-menu-layout/left-menu-layout.component';
import { TopNavComponent } from './top-nav/top-nav.component';
@NgModule({
    declarations: [TopNavComponent, LeftMenuLayoutComponent],
    imports: [FormsModule, CommonModule, RouterModule],

    exports: [LeftMenuLayoutComponent, TopNavComponent],
})
export class SharedModule {}
