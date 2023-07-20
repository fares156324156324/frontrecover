import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  NbDialogService,
  NbMediaBreakpointsService,
  NbThemeService,
  NbToastrService,
} from "@nebular/theme";
import {
  API,
  APIDefinition,
  Columns,
  Config,
  DefaultConfig,
  Pagination,
} from "ngx-easy-table";
import { debounceTime, map, Subject, take, takeUntil } from "rxjs";
import { ModalComponent } from "src/app/shared/components/modal/modal.component";
import { AddUserComponent } from "../add-user/add-user.component";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.scss"],
})
export class ListUsersComponent implements OnInit {
  @ViewChild("tableUsers", { static: true }) table!: APIDefinition;

  public currentUser: User | null = null;
  public filterChange: Subject<void> = new Subject<void>();
  public loading = true;
  public isMobileView: null | boolean = null;
  public configuration!: Config;
  public columns!: Columns[];
  public toggledRows = new Set<number>();
  public filterData = new User({});
  public users: User[] = [];
  public globalSearch = "";
  public minMaxWidth = 150;
  public pagination: Pagination = {
    limit: 10,
    offset: 1,
    count: -1,
  };

  private ColumCountNumber = 5;
  private destroy$: Subject<void> = new Subject<void>();

  constructor (
    private userService: UserService,
    private breakpointService: NbMediaBreakpointsService,
    private themeService: NbThemeService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.threeWaySort = false;
    this.configuration.orderEnabled = false;
    this.configuration.paginationRangeEnabled = false;
    this.configuration.headerEnabled = false;
    this.configuration.fixedColumnWidth = true;
    this.configuration.detailsTemplate = true;
    this.configuration.horizontalScroll = true;

    const { md } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < md),
        takeUntil(this.destroy$)
      )
      .subscribe((isLessThanMd: boolean) => {
        this.isMobileView = isLessThanMd;
        this.filterData = new User({});
        this.globalSearch = "";
        this.checkView();
        this.cdr.detectChanges();
        this.getUsers();
      });

    this.filterChange
      .pipe(debounceTime(1200), takeUntil(this.destroy$))
      .subscribe((_) => this.getUsers());

    this.userService
      .subCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
      });
  }

  private checkView(): void {
    if (this.isMobileView) {
      this.minMaxWidth = 150;
      this.columns = [
        {
          key: "fullName",
          title: "Full Name",
        },
        {
          key: "",
          title: "Details",
        },
        {
          key: "",
          title: "Actions",
        },
      ];
    } else {
      const offsetWidth = this.elementRef.nativeElement.offsetWidth - 50;
      this.minMaxWidth =
        offsetWidth / this.ColumCountNumber > 150
          ? offsetWidth / this.ColumCountNumber
          : 150;
      this.columns = [
        { key: "cin", title: "CIN" },
        { key: "firstName", title: "First Name" },
        { key: "lastName", title: "Last Name" },
        { key: "email", title: "Email" },
        { key: "", title: "Actions" },
      ];
      this.toggledRows.forEach((item) => {
        this.table.apiEvent({
          type: API.toggleRowIndex,
          value: item,
        });
      });
      this.toggledRows.clear();
      this.pagination = { ...this.pagination };
    }
  }

  getUsers(showLoading = true) {
    if (showLoading) {
      this.loading = true;
    }
    this.userService
      .getUsers(
        this.filterData.prepareFilterSearch(this.pagination, this.globalSearch)
      )
      .then((suc) => {
        if (suc.code === 1) {
          this.users = suc.data.data.map((user: User) => new User(user));
          this.pagination.count = suc.total;
          this.pagination = { ...this.pagination };
        }
      })
      .catch((err) => {
        if (err.status !== 401 && err.status !== 403 && err.status !== 0) {
          this.toastrService.danger("Error", "Error");
        }
      })
      .finally(() => {
        if (this.users.length === 0 && this.pagination.offset > 1) {
          (this.pagination.offset = 1),
            (this.pagination.count = -1),
            (this.pagination = { ...this.pagination });
          this.getUsers();
        } else {
          this.loading = false;
        }
      });
  }

  onRowClickEvent($event: MouseEvent, index: number): void {
    $event.preventDefault();
    this.table.apiEvent({
      type: API.toggleRowIndex,
      value: index,
    });
    if (this.toggledRows.has(index)) {
      this.toggledRows.delete(index);
    } else {
      this.toggledRows.add(index);
    }
  }

  eventEmitted($event: { event: string; value: any }): void {
    if ($event.event === "onPagination" || $event.event === "onRange") {
      if ($event.event === "onPagination") {
        this.pagination.limit = $event.value.limit
          ? $event.value.limit
          : this.pagination.limit;
        this.pagination.offset = $event.value.page
          ? $event.value.page
          : this.pagination.offset;
        this.toggledRows.forEach((item) => {
          this.table.apiEvent({
            type: API.toggleRowIndex,
            value: item,
          });
        });
        this.toggledRows.clear();
      } else if ($event.event === "onRange") {
        this.pagination.limit = $event.value.limit
          ? $event.value.limit
          : this.pagination.limit;
      }
      this.pagination = { ...this.pagination };
      this.getUsers();
    }
  }

  showDetailsMobile($event: MouseEvent, index: number): void {
    $event.preventDefault();
    this.table.apiEvent({
      type: API.toggleRowIndex,
      value: index,
    });
    if (this.toggledRows.has(index)) {
      this.toggledRows.delete(index);
    } else {
      this.toggledRows.add(index);
    }
  }

  onEditTableRow(index: number) {
    return null;
  }

  onDeleteTableRow(index: number) {
    const user = this.users[index];
    const model = this.dialogService.open(ModalComponent);
    const modelInstance = model.componentRef.instance;
    modelInstance.title = "Confirm Delete";
    const fullName = user.getFullName();
    modelInstance.body = `Are you sure you want to delete ${fullName} ?`;
    const id = user.id!;
    model.onClose.pipe(take(1), takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        if (res) {
          this.loading = true;
          this.userService
            .deleteUser(id)
            .then((suc) => {
              if (suc.code === 1) {
                this.toastrService.success(
                  "User deleted successfully",
                  "Success"
                );
                this.getUsers();
              } else {
                this.toastrService.danger("Error", "Error");
              }
            })
            .catch((err) => {
              if (
                err.status !== 401 &&
                err.status !== 403 &&
                err.status !== 0
              ) {
                this.toastrService.danger("Error", "Error");
              }
            })
            .finally(() => {
              this.loading = false;
            });
        }
      },
    });
  }

  addNewUser() {
    const modal = this.dialogService.open(AddUserComponent);
    modal.onClose
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((userCreated) => {
        if (userCreated) {
          this.getUsers();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
