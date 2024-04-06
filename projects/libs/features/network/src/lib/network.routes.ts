import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArrowBarComponent, LeftMenuLayoutComponent } from '@critical-pass/shared/layout';
import { CanDeactivateGuard } from '@critical-pass/core';
import { NetworkLayoutComponent } from './network-layout/network-layout.component';
import { NetworkResolver, ProjectResolver } from '@critical-pass/shared/data-access';
import { NetworkBarComponent } from './network-bar/network-bar.component';

const routes: Routes = [
    {
        path: '',
        component: LeftMenuLayoutComponent,
        children: [
            {
                path: ':id',
                component: NetworkLayoutComponent,
                resolve: { items: NetworkResolver },
                canDeactivate: [CanDeactivateGuard],
            },
            { path: 'arrow/:id', component: ArrowBarComponent, outlet: 'sidebar' },
            { path: 'meta/:id', component: NetworkBarComponent, outlet: 'sidebar' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NetworkRoutingModule {}
