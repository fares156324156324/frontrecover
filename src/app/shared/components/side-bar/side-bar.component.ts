import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuItem, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() public menu: NbMenuItem[] = [];

  public isMobileView = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private menuService: NbMenuService,
    private breakpointService: NbMediaBreakpointsService,
    private themeService: NbThemeService,
    private sidebarService: NbSidebarService) {
  }

  ngOnInit(): void {
    const { md } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < md),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanMd: boolean) => this.isMobileView = isLessThanMd);

    this.menuService.onItemClick().pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.isMobileView) {
        this.sidebarService.toggle(true, 'menu-sidebar');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
