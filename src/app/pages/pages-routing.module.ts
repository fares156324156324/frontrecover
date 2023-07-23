import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent, DashboardComponent } from '.';
import { PagesComponent } from './pages.component';
import { ForecastingComponent } from '../IA/forecasting/forecasting.component';
import { KPIComponent } from '../IA/kpi/kpi.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'forecasting',
        component: ForecastingComponent,
      },
      {
        path: 'KPI',
        component: KPIComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'prefix',
      },
    ],
  },
  { path: '**', redirectTo: 'pages' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
