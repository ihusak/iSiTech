import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { MaintenanceComponent } from './user-list/maintenance/maintenance.component';
import { PageNotFoundComponent } from './shared/fallback/page-not-found/page-not-found.component';
import { ForbiddenComponent } from './shared/fallback/forbidden/forbidden.component';

export const routes: Routes = [
  { path: '', component: UserListComponent,
    children: [
      { path: 'maintenance', component: MaintenanceComponent },
      { path: 'maintenance/:id', component: MaintenanceComponent }
  ] },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
