import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArrowBarComponent, LassoBarComponent, LeftMenuLayoutComponent } from '@critical-pass/shared/layout';
import { HistoryLayoutComponent } from './history-layout/history-layout.component';
import { ProjectResolver } from '@critical-pass/shared/data-access';
import { CanDeactivateGuard } from '@critical-pass/core';

const routes: Routes = [
    {
        path: '',
        component: LeftMenuLayoutComponent,
        children: [
            {
                path: ':id',
                component: HistoryLayoutComponent,
                resolve: { items: ProjectResolver },
                canDeactivate: [CanDeactivateGuard],
            },
            { path: 'arrow/:id', component: ArrowBarComponent, outlet: 'sidebar' },
            { path: 'lasso/:id', component: LassoBarComponent, outlet: 'sidebar' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HistoryRoutingModule {}
