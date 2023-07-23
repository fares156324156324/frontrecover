import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastingComponent } from './IA/forecasting/forecasting.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((a) => a.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((p) => p.PagesModule),
  },
  {
    path: 'forecasting',
    component: ForecastingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
