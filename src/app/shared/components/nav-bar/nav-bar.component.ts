import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NbMediaBreakpointsService, NbMenuItem, NbMenuService, NbSidebarService, NbThemeService, NbToastrService } from '@nebular/theme';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input() public menu!: NbMenuItem[];
  @Input() public user: User | null = null;

  @Output() deselectSideBar = new EventEmitter<void>();

  public userPictureOnly = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor (
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private authService: AuthService,
    private toastrService: NbToastrService,
    private breakpointService: NbMediaBreakpointsService,
    private themeService: NbThemeService,
  ) { }

  ngOnInit(): void {
    const { md } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < md),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanMd: boolean) => this.userPictureOnly = isLessThanMd);
    this.menuService
      .onItemClick()
      .pipe(
        takeUntil(this.destroy$),
        filter(({ tag }) => tag === 'user-context-menu')
      )
      .subscribe((clickedItem) => {
        if (clickedItem.item.data.id === 'logout') {
          this.logout();
        }
        if (clickedItem.item.data.id === 'profile') {
          this.deselectSideBar.emit();
          this.router.navigateByUrl('/pages/profile');
        }
      });
  }

  logout() {
    this.authService.logout();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
