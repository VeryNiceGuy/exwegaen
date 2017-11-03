class Vector2Timepoint extends Timepoint {
    value: Vector2;

    constructor(
        time: number,
        value: Vector2,
        next: Vector2Timepoint = null,
        prev: Vector2Timepoint = null) {

        super(time, next, prev);
        this.value = value;
    }
}

class Vector2Timeline extends Timeline {
    constructor() {
        super();
    }

    createPoint(time: number, value: Vector2): Vector2Timepoint {
        let newPoint: Vector2Timepoint = new Vector2Timepoint(time, value);

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