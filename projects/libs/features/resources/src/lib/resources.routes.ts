import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectResolver } from '@critical-pass/shared/data-access';
import { CanDeactivateGuard } from '@critical-pass/core';
import { LeftMenuLayoutComponent } from '@critical-pass/shared/layout';
import { AssignLayoutComponent } from './assign-layout/assign-layout.component';
import { AssignBarComponent } from './sidebars/assign-bar/assign-bar.component';

const routes: Routes = [
    {
        path: '',
        component: LeftMenuLayoutComponent,
        children: [
            {
                path: ':id',
                component: AssignLayoutComponent,
                resolve: { items: ProjectResolver },
                canDeactivate: [CanDeactivateGuard],
            },
            { path: 'assignbar/:id', component: AssignBarComponent, outlet: 'sidebar' },
            { path: 'resources/:id', component: AssignBarComponent, outlet: 'sidebar' },
            { path: 'compare/:id', component: AssignBarComponent, outlet: 'sidebar' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ResourcesRoutingModule {}
