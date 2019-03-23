import { Component } from '@angular/core';
import { RangesInfo, RangeInfo, ObjectInfo } from './model/ranges-info';
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
      "expertName":"Эксперт 1"
    },
    {
      "objects":[
        {"name":"a2","index":1},
        {"name":"a3","index":2},
        {"name":"a1","index":0},
        {"name":"a4","index":3}
      ],
      "structure":["~",">",">"],
      "expertName":"Эксперт 2"
    },
    {
      "objects":[
        {"name":"a2","index":1},
        {"name":"a4","index":3},
        {"name":"a3","index":2},
        {"name":"a1","index":0}
      ],
      "structure":[">","~",">"],
      "expertName":"Эксперт 3"
    },
    {
      "objects":[
        {"name":"a1","index":0},
        {"name":"a3","index":2},
        {"name":"a2","index":1},
        {"name":"a4","index":3}
      ],
      "structure":[">",">","~"],
      "expertName":"Эксперт 4"
    },
    {
      "objects":[
        {"name":"a1","index":0},
        {"name":"a2","index":1},
        {"name":"a3","index":2},
        {"name":"a4","index":3}
      ],
      "structure":["~",">","~"]
      ,"expertName":"Эксперт 5"
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

  rangesInfo = new RangesInfo();

  constructor(private servise: KemenySnellService) { }

  onChanged(rangesInfo) {
    this.rangesInfo = rangesInfo;
    // console.log(this.servise.compare(rangesInfo.ranges[0], this.test1, this.test2))
    console.log(test.ranges[1]);
    console.log(this.servise.getRMatrix(test.ranges[2]));
  }
}
