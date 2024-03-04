import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArrowBarComponent, LassoBarComponent, LeftMenuLayoutComponent } from '@critical-pass/shared/layout';
import { AppDataLayoutComponent } from './app-data-layout/app-data-layout.component';
import { AppDataBarComponent } from './app-data-bar/app-data-bar.component';

const routes: Routes = [
    {
        path: '',
        component: LeftMenuLayoutComponent,
        children: [
            {
                path: '',
                component: AppDataLayoutComponent,
                // resolve: { items: ProjectResolver },
                // canDeactivate: [CanDeactivateGuard],
            },
            { path: 'databar', component: AppDataBarComponent, outlet: 'sidebar' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AppDataRoutingModule {}
