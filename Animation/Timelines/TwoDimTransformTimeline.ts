class TwoDimTransformPoint extends Timepoint {
    value: Vector2;

    constructor(
        time: number,
        value: Vector2,
        next: TwoDimTransformPoint = null,
        prev: TwoDimTransformPoint = null) {

        super(time, next, prev);
        this.value = value;
    }
}

class TwoDimTransformTimeline extends Timeline {
    constructor() {
        super();
    }

    createPoint(time: number, value: Vector2): TwoDimTransformPoint {
        let newPoint: TwoDimTransformPoint = new TwoDimTransformPoint(time, value);

        if (this.getNumberOfPoints())
        {
            if(time > this.getLastPoint().time) {
                Timepoint.linkTwoPoints(this.getLastPoint(), newPoint);
                this.lastPoint = newPoint;
            } else {
                let pointAtGreaterTime: Timepoint =
                    Timepoint.findPointAtGreaterTime(time, this.getFirstPoint());

                Timepoint.linkThreePoints(
                    pointAtGreaterTime.prev, newPoint, pointAtGreaterTime)
            }
        }
        else
        {
            this.firstPoint = newPoint;
            this.lastPoint = this.getFirstPoint();
        }

        ++this.numberOfPoints;

        return null;
    }
}