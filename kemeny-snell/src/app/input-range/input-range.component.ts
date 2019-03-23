import { Component, OnInit } from '@angular/core';
import { RangesInfo, RangeInfo } from '../model/ranges-info';

@Component({
  selector: 'app-input-range',
  templateUrl: './input-range.component.html',
  styleUrls: ['./input-range.component.css']
})
export class InputRangeComponent implements OnInit {

  rangesInfo = new RangesInfo();

  isFirstStage = true;

  structures = ['>', '~'];

  initRange:string[] = [];

  constructor() { }

  ngOnInit() {
  }

  firstStageSubmit() {
    if (this.rangesInfo.m && this.rangesInfo.n) {
      this.clear();
      this.init();

      this.isFirstStage = false;
    }
  }

  backOnTheFirstStage() {
    this.isFirstStage = true;
  }

  submit() {
    console.log(this.rangesInfo.ranges)
  }

  clear() {
    this.rangesInfo.ranges.length = 0;
    this.initRange.length = 0;
  }

  init() {
    for(let i = 0; i < this.rangesInfo.m; i++) {
      const range = new RangeInfo();
      for(let j = 0; j < this.rangesInfo.n; j++) {
        const obj = 'a' + (j + 1);
        range.objects.push(obj);
        if(j < this.rangesInfo.n - 1) {
          range.structure.push('>');
        }
      }
      range.expertName = 'Эксперт ' + (i + 1);
      this.rangesInfo.ranges.push(range);
    }

    for (let i = 0; i < this.rangesInfo.n; i++) {
      const obj = 'a' + (i + 1);
      this.initRange.push(obj);
    }
  }

  select(object, i, j) {
    this.rangesInfo.ranges[i].objects[j] = object;
  }

}
