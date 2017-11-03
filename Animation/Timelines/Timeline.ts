abstract class Timepoint {
    time: number;
    next: Timepoint;
    prev: Timepoint;

    constructor(time: number, next: Timepoint, prev: Timepoint) {
        this.time = time;
        this.next = next;
        this.prev = prev;
    }

    static findPointAtGreaterTime(time: number, start: Timepoint): Timepoint {
        let p: Timepoint = start.next;
        while(p){
            if(p.time > time)
                return p;
        }
        return null;
    }

    static linkTwoPoints(left: Timepoint, right: Timepoint): void {
        left.next = right;
        right.prev = left;
    }

    static linkThreePoints(left: Timepoint, middle: Timepoint, right: Timepoint): void {
        left.next = middle;
        middle.prev = left;
        middle.next = right;
        right.prev = middle;
    }
}

abstract class Timeline {
    protected numberOfPoints: number;
    protected firstPoint: Timepoint;
    protected lastPoint: Timepoint;

    constructor() {
        this.numberOfPoints = 0;
        this.firstPoint = null;
        this.lastPoint = null;
    }

    getNumberOfPoints(): number {
        return this.numberOfPoints;
    }

    getFirstPoint(): Timepoint {
        return this.firstPoint;
    }

    getLastPoint(): Timepoint {
        return this.lastPoint;
    }
}