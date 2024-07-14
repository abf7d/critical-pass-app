import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LeftMenuLayoutComponent } from './left-menu-layout/left-menu-layout.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TopNavLayoutComponent } from './top-nav-layout/top-nav-layout.component';
@NgModule({
    declarations: [TopNavComponent, LeftMenuLayoutComponent, TopNavLayoutComponent],
    imports: [FormsModule, CommonModule, RouterModule],
    exports: [LeftMenuLayoutComponent, TopNavComponent, TopNavLayoutComponent],
})
export class SharedModule {}
