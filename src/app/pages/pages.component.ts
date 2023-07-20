import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Subject, takeUntil } from 'rxjs';
import { navBarMenuItems, sideBarMenuItems } from './menu';
import { User } from '../shared/models/user';
import { UserService } from '../core/services/user.service';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  protected menuNavBar = navBarMenuItems;
  protected menuSideBar = sideBarMenuItems;
  protected destroy$: Subject<void> = new Subject<void>();
  protected name: any = "";

  public currentUser: User | null = null;

  constructor (
    private userService: UserService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.updateNavBarTitles();
    this.updateSideBarTitles();
    this.userService
      .subCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (!this.currentUser) {
          this.name = user?.username
          this.toastrService.success("Welcome back " + this.name + "!", "success");
        }
        this.currentUser = user;
      });
  }

  updateNavBarTitles() {
    this.menuNavBar[0].children!.forEach((item) => {
      return item.title;
    });

  }

  updateSideBarTitles() {
    this.menuSideBar.forEach((item) => {
      return item.title;
    });
  }

  deselectSideBar() {
    this.menuSideBar.forEach((item) => {
      item.selected = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
