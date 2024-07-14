import { Routes } from '@angular/router';
import { HomeComponent, LoginComponent, LoginErrorComponent, LoginRedirectComponent, RequestAccessComponent } from '@critical-pass/features/landing';
import { WelcomeComponent, AboutComponent, TutorialsComponent, DonateComponent } from '@critical-pass/features/landing';
import { AuthorizedUserGuard, RedirectGuard } from '@critical-pass/auth';
import { TopNavLayoutComponent } from '@critical-pass/shared/layout';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'welcome',
        component: TopNavLayoutComponent,
        children: [{ path: '', component: WelcomeComponent }],
        canActivate: [AuthorizedUserGuard],
    },
    {
        path: 'login-redirect',
        component: LoginRedirectComponent,
        canActivate: [RedirectGuard],
    },
    {
        path: 'request-access',
        component: RequestAccessComponent,
    },
    {
        path: 'login-error',
        component: LoginErrorComponent,
    },
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: 'tutorials',
        component: TutorialsComponent,
    },
    {
        path: 'donate',
        component: DonateComponent,
    },
    {
        path: 'library',
        loadChildren: () => import('@critical-pass/features/library').then(m => m.LibraryModule),
        canActivate: [AuthorizedUserGuard],
    },
    {
        path: 'profile',
        loadChildren: () => import('@critical-pass/features/profile').then(m => m.ProfileModule),
        canActivate: [AuthorizedUserGuard],
    },
    {
        path: 'history',
        loadChildren: () => import('@critical-pass/features/history').then(m => m.HistoryModule),
        canActivate: [AuthorizedUserGuard],
    },
    {
        path: 'network',
        loadChildren: () => import('@critical-pass/features/network').then(m => m.NetworkModule),
        canActivate: [AuthorizedUserGuard],
    },
    {
        path: 'import',
        loadChildren: () => import('@critical-pass/features/spreadsheet').then(m => m.SpreadsheetModule),
        canActivate: [AuthorizedUserGuard],
    },
    {
        path: 'resources',
        loadChildren: () => import('@critical-pass/features/resources').then(m => m.ResourcesModule),
        canActivate: [AuthorizedUserGuard],
    },
    {
        path: 'jira',
        loadChildren: () => import('@critical-pass/features/jira').then(m => m.JiraModule),
        canActivate: [AuthorizedUserGuard],
    },
];
