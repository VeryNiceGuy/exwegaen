class Vector2AngAnimator extends Vector2Animator {
    constructor(points: Vector2Timepoint[], animatable: Vector2){
        super(points, animatable);
    }

    protected prepare(): void {
        this.v1.assign(this.animatable);
        Vector2.addAngle(this.v2, this.v1, this.points[this.p2].value);
    }

    protected interpolate(t: number): void {
        Vector2.slerp(this.animatable, this.v1, this.v2, t);
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