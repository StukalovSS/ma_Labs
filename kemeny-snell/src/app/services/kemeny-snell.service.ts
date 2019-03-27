import { Injectable } from '@angular/core';
import { RangeInfo, ObjectInfo, RangesInfo, structure, CMatr } from '../model/ranges-info';

@Injectable({
  providedIn: 'root'
})
export class KemenySnellService {

  constructor() { }

  // ЭТАП 1

  // генерит матрицу сравнений по ранжированию и помещает в структуру
  getRMatrix(range: RangeInfo) {
    const matrix = this.getEmptyMatrix(range.objects.length);

    for (let i = 0; i < range.objects.length; i++) {
      for (let j = 0; j < range.objects.length; j++) {
        matrix[range.objects[i].index][range.objects[j].index] = this.compare(range, range.objects[i], range.objects[j]);
      }
    }
    return matrix;
  }

  // создает пустую матрицу и заполняет ее нулями
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
  // сравнивает два элемента в ранжировании
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

  // ЭТАП 2
  
  // собирает матрицу С по ранжированиям
  getCMatr(rangesInfo: RangesInfo) {
    const n = rangesInfo.n;
    const R = this.getInitRMatr(n);
    let C = this.sumMatr(rangesInfo.ranges[0].compMatrix, R);
    for (let i = 1; i < rangesInfo.m; i++) {
      let temp = this.sumMatr(rangesInfo.ranges[i].compMatrix, R);
      C = this.sumMatr(C, temp);
    }
    console.log(C)
    return C;
  }

  // генерит матрицу R со слешем (все двойки, диагональ единицы), 
  // которую будем отнимать от наших матриц R и складывать потом
  getInitRMatr(n: number) {
    const M = this.getEmptyMatrix(n);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i == j) {
          M[i][j] = -1;
        } else {
          M[i][j] = -2
        }
      }
    }
    return M;
  }

  // суммирует матрицы по модулю
  sumMatr(matr1, matr2){
    const matrix = this.getEmptyMatrix(matr1.length);

    for (let i = 0; i < matr1.length; i++) {
      for (let j = 0; j < matr1.length; j++) {
        matrix[i][j] = Math.abs(matr1[i][j] + matr2[i][j])
      }
    }

    return matrix;
  }

  // суммирует строки матрицы
  sumRows(matr) {
    let vector = [];
    matr.forEach(row => {
      let sum = 0;
      row.forEach(item => {
        sum += item;
      });
      vector.push(sum);
    });
    console.log(vector)
    return vector;
  }

  // возвращает индекс наименьшего элемента в векторе
  getIndexOfMinElement(vector: number[]) {
    return vector.indexOf(Math.min(...vector));
  }

  //Удалить из матрицы строку и столбец с заданным индексом
  removeRowAndCol(matr,index: number) {
    matr[index].fill(21);
    matr.forEach((row: number[])=> {
      row[index] = 0;;
    })
  }

  realyRemoveRowAndCol(matr,index: number) {
    matr.splice(index, 1);
    matr.forEach((row: number[])=> {
      row.splice(index, 1);
    })
  }

  // Собирает все вместе и выдает итоговое ранжирование
  getResRange(rangesInfo: RangesInfo) {
    const C = this.getCMatr(rangesInfo);
    const resIndexes = [];
    while(resIndexes.length <= rangesInfo.n - 1) {
      let index = this.getIndexOfMinElement(this.sumRows(C));
      this.removeRowAndCol(C, index);
      resIndexes.push(index);
      console.log(C);
    }
    // this.getCMatrsToDraw(rangesInfo, resIndexes);
    return resIndexes;
  }

  coplyArray(ar: any[]) {
    const res = [];
    ar.forEach(item => {
      res.push(item.slice())
    })
    return res;
  }

  getCMatrsToDraw(rangesInfo: RangesInfo, resIndexes: number[]) {
    const res: CMatr[] = [];
    let cmatr: CMatr = new CMatr();
    const C = this.getCMatr(rangesInfo);
    cmatr.matr = this.coplyArray(C);
    cmatr.vector = this.sumRows(C);
    res.push(cmatr);
    for (let i = 0; i < resIndexes.length -2; i++) {
      cmatr = new CMatr();
      this.realyRemoveRowAndCol(C, resIndexes[i]);
      cmatr.matr = this.coplyArray(C);
      cmatr.vector = this.sumRows(C);
      res.push(cmatr);
    }
    console.log(res);
    return res;
  }

  // по массиву из индексов получаем готвое ранжирование
  getRangeByIndexes(indexes: number[], n): RangeInfo{
    let res: RangeInfo = new RangeInfo();
    res.structure = new Array(n-1).fill('>');
    let objects = this.getAllObjects(n);
    indexes.forEach(index => {
      res.objects.push(objects[index])
    })
    return res;
  }

  // тот еще костыль, т.к. не вводим имена объектов
  getAllObjects(n: number) {
    let objects: ObjectInfo[] =  [];
    for (let i = 0; i < n; i++) {
      const obj = new ObjectInfo();
      obj.name =  'a' + (i + 1);
      obj.index = i;
      objects.push(obj);
    }
    return objects;
  }

  getRangeAsString(range:  RangeInfo) {
    let res = "";
    range.objects.forEach((object, i) => {
      if(i < range.objects.length - 1) {
        res += object.name + ' ' + range.structure[i] + ' ';
      } else {
        res += object.name;
      }
    })
    return res;
  }
}
