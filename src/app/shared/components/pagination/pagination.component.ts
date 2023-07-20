import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() ranges = ['10', '25', '50', '75', '100'];
  @Input() selectedItem = '10';
  @Output() rangeChanged = new EventEmitter<{ event: string, value: any }>();

  constructor() { }

  ngOnInit(): void {
  }

  updateSelectedRange() {
    this.rangeChanged.emit({ event: 'onRange', value: { limit: this.selectedItem } });
  }

}
