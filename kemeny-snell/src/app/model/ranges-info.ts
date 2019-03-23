export class RangesInfo {
    m = 3;
    n = 3;
    ranges: RangeInfo[] = [];
}

export class RangeInfo {
    expertName: string;
    objects: ObjectInfo[] = [];
    structure: structure[] = [];
}

export type structure =  '>' | '~';

export class ObjectInfo {
    name: string;
    index: number;
}