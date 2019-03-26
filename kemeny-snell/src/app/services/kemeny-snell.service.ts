import { Injectable } from '@angular/core';
import { RangeInfo, ObjectInfo } from '../model/ranges-info';

@Injectable({
  providedIn: 'root'
})
export class KemenySnellService {

  constructor() { }

  getRMatrix(range: RangeInfo) {
    const matrix = this.getEmptyMatrix(range.objects.length);

    for (let i = 0; i < range.objects.length; i++) {
      for (let j = 0; j < range.objects.length; j++) {
        matrix[range.objects[i].index][range.objects[j].index] = this.compare(range, range.objects[i], range.objects[j]);
      }
    }
    return matrix;
  }

  getEmptyMatrix(n: number) {
    const matrix = [];
    for (let i = 0; i < n; i++) {
      const row = new Array(n).fill(0);
      for (let j = 0; j < n; j++) {
        row[j] = 0;
      }
      matrix.push(row);
    }
    return matrix;
  }

  compare(range: RangeInfo, ai: ObjectInfo, aj:ObjectInfo) {
    let first: ObjectInfo;
    let second: ObjectInfo;
    let i = 0;
    let ok = true;
    let res;
    if (ai === aj) {
      return 1;
    }
    
    //get first element
    while (i < range.objects.length && ok) {
      if (range.objects[i].name === ai.name) {
        first = ai;
        second = aj;
        ok = false;
      } else if (range.objects[i].name === aj.name) {
        first = aj;
        second = ai;
        ok = false;
      } else {
        i++
      }
    }
    res = first === ai ? 2 : 0;

    if (range.structure[i] === '>') {
      return res;
    } else {
      let j = i;
      // если между ними есть хотя бы одна >
      while(j < range.objects.length && range.objects[j].name != second.name) {
        if (range.structure[j] && range.structure[j] === '>') {
          return res;
        }
        j++;
      }
      // иначе равны
      return 1;
    }
  }
}
