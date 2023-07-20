import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavBarComponent, SideBarComponent } from "./components";
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbMenuService,
  NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbUserModule,
} from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalComponent } from "./components/modal/modal.component";
import { PaginationComponent } from "./components/pagination/pagination.component";

const MODULES = [
  CommonModule,
  NbSidebarModule,
  NbIconModule,
  NbActionsModule,
  NbMenuModule,
  NbUserModule,
  NbContextMenuModule,
  NbSpinnerModule,
  NbDialogModule.forChild({
    autoFocus: true,
    closeOnBackdropClick: false,
    dialogClass: "container",
    closeOnEsc: false,
  }),
  FormsModule,
  ReactiveFormsModule,
  NbLayoutModule,
  NbCardModule,
  NbAlertModule,
  NbCheckboxModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbFormFieldModule,
  NbActionsModule,
  NbSelectModule,
];

const SERVICES = [NbSidebarService, NbMenuService];

const COMPONENTS = [
  NavBarComponent,
  SideBarComponent,
  PaginationComponent,
  ModalComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [MODULES, ...COMPONENTS],
  providers: [...SERVICES],
})
export class SharedModule {}
