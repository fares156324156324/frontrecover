import { Component, OnInit } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sapp2';
  constructor (private iconLibraries: NbIconLibraries) {

  }

  ngOnInit(): void {
    this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa', packClass: 'fas' });
    this.iconLibraries.setDefaultPack('font-awesome');
  }
}
