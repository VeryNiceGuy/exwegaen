const ERROR: number = -1;

class Timepoint<T> {
    constructor(public time: number, public value: T) {}
}

class Timeline<T> {
    private points: Timepoint<T>[];

    constructor(points: Timepoint<T>[] = []) {
        this.points = points;
    }

    getNumberOfPoints(): number {
        return this.points.length;
    }

    getPointAtIndex(index: number): Timepoint<T> {
        return this.points[index];
    }

    getLastPoint(): Timepoint<T> {
        return this.getPointAtIndex(this.getNumberOfSegments());
    }

    getNumberOfSegments(): number {
        return this.getNumberOfPoints() - 1;
    }

    getSegmentIndex(time: number): number {
        for (let i: number = 0; i < this.points.length; ++i) {
            if (this.getPointAtIndex(i).time >= time) {
                if (time === this.getPointAtIndex(i).time) {
                    return i;
                } else {
                    return i - 1;
                }
            }
        }

        return ERROR;
    }

    getNextSegmentIndex(time: number, currentSegmentIndex: number): number {
        let i: number = currentSegmentIndex;
        if (time < this.getPointAtIndex(i).time) {
            i -= 1;
            for (; i >= 0; --i) {
                if (time >= this.getPointAtIndex(i).time) {
                    return i;
                }
            }
        } else if (time > this.getPointAtIndex(i + 1).time) {
            i += 1;
            for (; i < this.getNumberOfPoints(); ++i) {
                if (time <= this.getPointAtIndex(i).time) {
                    return i - 1;
                }
            }
        } else {
            return currentSegmentIndex;
        }
    }

    getSegmentPoints(index: number, timepoint1: Timepoint<T>, timepoint2: Timepoint<T>): void {
        /*timepoint1 = this.points[index];
        timepoint2 = this.points[index + 1];*/

        timepoint1.time = this.points[index].time;
        timepoint1.value = this.points[index].value;

        timepoint2.time = this.points[index + 1].time;
        timepoint2.value = this.points[index + 1].value;
    }
}
