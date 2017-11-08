class Vector2AngController extends Vector2Controller {
    constructor(points: Vector2Timepoint[], controllable: Vector2){
        super(points, controllable);
    }

    protected prepare(): void {
        this.v1.assign(this.controllable);
        Vector2.addAngle(this.v2, this.v1, this.points[this.p2].value);
    }

    protected interpolate(t: number): void {
        Vector2.slerp(this.controllable, this.v1, this.v2, t);
    }

    protected stepForward(): void {
        this.v1.assign(this.v2);
        Vector2.addAngle(this.v2, this.v1, this.points[this.p1].value);
    }

    protected stepBackward(): void {
        this.v2.assign(this.v1);
        Vector2.subtractAngle(this.v1, this.v2, this.points[this.p2].value);
    }
}