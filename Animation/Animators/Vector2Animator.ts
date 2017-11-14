abstract class Vector2Animator extends Animator {
    public points: Vector2Timepoint[];
    public animatable: Vector2;

    protected v1: Vector2;
    protected v2: Vector2;

    getNumPoints(): number {
        return this.points.length;
    }

    getPointTime(i: number): number{
        return this.points[i].time;
    }

    constructor(points: Vector2Timepoint[], animatable: Vector2) {
        super();

        this.points = points;
        this.animatable = animatable;

        this.v1 = new Vector2();
        this.v2 = new Vector2();
    }
}