import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { NbCardModule, NbDialogModule, NbDialogService, NbFormFieldModule, NbInputModule, NbLayoutModule, NbMenuService, NbSidebarModule, NbSidebarService, NbSpinnerModule } from '@nebular/theme';
import { SharedModule } from '../shared/shared.module';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { TableModule } from 'ngx-easy-table';
import { AddUserComponent } from './users/add-user/add-user.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    UsersComponent,
    ListUsersComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbLayoutModule,
    SharedModule,
    NbSidebarModule,
    NbSpinnerModule,
    NbCardModule,
    NbInputModule,
    NbFormFieldModule,
    TableModule,
    NbDialogModule.forChild({ autoFocus: true, closeOnBackdropClick: false, dialogClass: 'container', closeOnEsc: false }),
  ],
  providers: [NbMenuService, NbDialogService],
})
export class PagesModule { }
