import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RangesInfo, RangeInfo, ObjectInfo } from '../model/ranges-info';
import { KemenySnellService } from '../services/kemeny-snell.service';

@Component({
  selector: 'app-input-range',
  templateUrl: './input-range.component.html',
  styleUrls: ['./input-range.component.css']
})
export class InputRangeComponent implements OnInit {

  @Output() rangesInfoChange = new EventEmitter<RangesInfo>();

  rangesInfo = new RangesInfo();

  isFirstStage = true;

  structures = ['>', '~'];

  initRange: ObjectInfo[] = [];


  constructor(private servise: KemenySnellService) { }

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
    this.clear();
    this.rangesInfoChange.emit(new RangesInfo);
  }

  submit() {
    const message = this.validate();
    if (message === "") {
      this.rangesInfoChange.emit(this.rangesInfo);
    } else {
      alert(message)
    }
  }

  clear() {
    this.rangesInfo.ranges.length = 0;
    this.initRange.length = 0;
  }

  init() {
    for(let i = 0; i < this.rangesInfo.m; i++) {
      const range = new RangeInfo();
      for(let j = 0; j < this.rangesInfo.n; j++) {
        const obj = new ObjectInfo();
        range.objects.push(obj);
        if(j < this.rangesInfo.n - 1) {
          range.structure.push('>');
        }
      }
      range.expertName = 'Эксперт ' + (i + 1);
      this.rangesInfo.ranges.push(range);
    }

    this.initRange = this.servise.getAllObjects(this.rangesInfo.n);
  }

  validate() {
    for (let i = 0; i < this.rangesInfo.m; i++) {
      let checkSet =  new Set<ObjectInfo>();
      for (let j = 0; j < this.rangesInfo.n; j++) {
        if (this.rangesInfo.ranges[i].objects[j].index !== null && this.rangesInfo.ranges[i].objects[j].index !== undefined) {
          checkSet.add(this.rangesInfo.ranges[i].objects[j]);
        } else {
          return 'Заполните все поля формы.';
        }
      }
      if (checkSet.size !== this.rangesInfo.n) {
        return 'Все объекты в строке должны быть уникальными.';
      }
    }
    return '';
  }

  select(object, i, j) {
    let obj = new ObjectInfo();
    obj.name = object;
    obj.index = this.initRange.indexOf(object);
    this.rangesInfo.ranges[i].objects[j] = obj;
  }

  compareFn(c1: ObjectInfo, c2: ObjectInfo): boolean {
    return c1 && c2 ? c1.index === c2.index : false;
  }

  isSelected(object: ObjectInfo, index: number) {
    console.log(object.index + ' ' +  index);
    return object.index === index;
  }

  onChangeObj(value) {
    console.log(value);
    // this.rangesInfo.ranges[i].objects[j] = value;
  }

}
