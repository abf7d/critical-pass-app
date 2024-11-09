import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArrowBarComponent, LassoBarComponent, LeftMenuLayoutComponent } from '@critical-pass/shared/layout';
import { HistoryResolver } from '@critical-pass/shared/data-access';
import { CanDeactivateGuard } from '@critical-pass/core';
import { ArchitectureLayoutComponent } from './components/architecture-layout/architecture-layout.component';
import { ArchitectureBarComponent } from './components/architecture-bar/architecture-bar.component';

const routes: Routes = [
    {
        path: '',
        component: LeftMenuLayoutComponent,
        children: [
            {
                path: ':id',
                component: ArchitectureLayoutComponent,
                resolve: { items: HistoryResolver },
                canDeactivate: [CanDeactivateGuard],
            },
            { path: 'arch/:id', component: ArchitectureBarComponent, outlet: 'sidebar' },
            { path: 'lasso/:id', component: LassoBarComponent, outlet: 'sidebar' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ArchRoutingModule {}
