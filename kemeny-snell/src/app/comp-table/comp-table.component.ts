import { Component, OnInit, Input } from '@angular/core';
import { RangeInfo } from '../model/ranges-info';

@Component({
  selector: 'app-comp-table',
  templateUrl: './comp-table.component.html',
  styleUrls: ['./comp-table.component.css']
})
export class CompTableComponent implements OnInit {

  @Input() range: RangeInfo;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

  test() {
    return JSON.stringify(this.range);
  }

}
