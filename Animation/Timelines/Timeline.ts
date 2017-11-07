abstract class Timepoint {
    time: number;

    constructor(time: number) {
        this.time = time;
    }
}

abstract class Timeline {
    public points: Vector2Timepoint[];

    constructor() {
        this.points = [];
    }

    getNumberOfPoints(): number {
        return this.points.length;
    }

    getFirstPoint(): Timepoint {
        return this.points[0];
    }

    getLastPoint(): Timepoint {
        return this.points[this.getNumberOfPoints()-1];
    }
}