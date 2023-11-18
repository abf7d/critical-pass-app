import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryGridComponent } from './library-grid/library-grid.component';
import { LibraryBarComponent } from './library-bar/library-bar.component';
import { LeftMenuLayoutComponent } from '@critical-pass/shared/layout';
const routes: Routes = [
    {
        path: '',
        component: LeftMenuLayoutComponent,
        children: [
            { path: 'grid/:page', component: LibraryGridComponent },
            { path: 'libar/:page', component: LibraryBarComponent, outlet: 'sidebar' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LibraryRoutingModule {}
