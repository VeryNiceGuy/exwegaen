class Vector2DispAnimator extends Vector2Animator {
    constructor(points: Vector2Timepoint[], animatable: Vector2) {
        super(points, animatable);
    }

    protected prepare(): void {
        this.v1.assign(this.animatable);
        Vector2.add(this.v2, this.v1, this.points[this.p2].value);
    }

    protected interpolate(t: number): void {
        Vector2.lerp(this.animatable, this.v1, this.v2, t);
    }

    protected stepForward(): void {
        this.v1.assign(this.v2);
        Vector2.add(this.v2, this.v1, this.points[this.p2].value);
    }

    protected stepBackward(): void {
        this.v2.assign(this.v1);
        Vector2.subtract(this.v1, this.v2, this.points[this.p2].value);
    }
}