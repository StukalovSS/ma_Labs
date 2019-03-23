export class RangesInfo {
    m = 3;
    n = 3;
    ranges: RangeInfo[] = [];
}

export class RangeInfo {
    expertName: string;
    objects: string[] = [];
    structure: structure[] = [];
}

export type structure =  '>' | '~';