import { Component } from '@angular/core';
import { RangesInfo, RangeInfo, ObjectInfo, CMatr } from './model/ranges-info';
import { KemenySnellService } from './services/kemeny-snell.service';

const test: RangesInfo = {
  "m":5,
  "n":4,
  "ranges":
  [
    {
      "objects":[
        {"name":"a1","index":0},
        {"name":"a2","index":1},
        {"name":"a3","index":2},
        {"name":"a4","index":3}
      ],
      "structure":[">","~",">"],
      "expertName":"Эксперт 1",
      "compMatrix":[]
    },
    {
      "objects":[
        {"name":"a2","index":1},
        {"name":"a3","index":2},
        {"name":"a1","index":0},
        {"name":"a4","index":3}
      ],
      "structure":["~",">",">"],
      "expertName":"Эксперт 2",
      "compMatrix":[]
    },
    {
      "objects":[
        {"name":"a2","index":1},
        {"name":"a4","index":3},
        {"name":"a3","index":2},
        {"name":"a1","index":0}
      ],
      "structure":[">","~",">"],
      "expertName":"Эксперт 3",
      "compMatrix":[]
    },
    {
      "objects":[
        {"name":"a1","index":0},
        {"name":"a3","index":2},
        {"name":"a2","index":1},
        {"name":"a4","index":3}
      ],
      "structure":[">",">","~"],
      "expertName":"Эксперт 4",
      "compMatrix":[]
    },
    {
      "objects":[
        {"name":"a1","index":0},
        {"name":"a2","index":1},
        {"name":"a3","index":2},
        {"name":"a4","index":3}
      ],
      "structure":["~",">","~"]
      ,"expertName":"Эксперт 5",
      "compMatrix":[]
    }
  ]
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kemeny-snell';

  test1: ObjectInfo = {
    name: 'a1',
    index: 0
  }
  test2: ObjectInfo = {
    name: 'a2',
    index: 1
  }

  test = test;

  rangesInfo = new RangesInfo();
  resultRange: RangeInfo = null;
  cMatrs: CMatr[] = [];

  constructor(private servise: KemenySnellService) {
    this.test.ranges.forEach((item) => {
      item.compMatrix = this.servise.getRMatrix(item)
    })
   }

  onChanged(rangesInfo) {
    this.rangesInfo = rangesInfo;
    this.rangesInfo.ranges.forEach((item) => {
      item.compMatrix = this.servise.getRMatrix(item)
    })
    console.log(rangesInfo)
    const indexes = this.servise.getResRange(rangesInfo);
    this.resultRange =  this.servise.getRangeByIndexes(indexes, rangesInfo.n);
    this.cMatrs = this.servise.getCMatrsToDraw(rangesInfo, indexes);
    console.log(this.cMatrs);
  }

  isShowResult() {
    return this.rangesInfo && this.rangesInfo.ranges.length != 0
  }

  getRangeAsString(range: RangeInfo) {
    return this.servise.getRangeAsString(range);
  }

  vectorToStr(ar: any[]) {
    return '(' + ar.join(', ') + ')'
  }
}
