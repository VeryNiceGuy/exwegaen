class Vector2DispController extends Vector2Controller {
    constructor(timeline: Vector2Timeline, controllable: Vector2) {
        super(timeline, controllable);
    }

    protected prepare(): void {
        this.v1.assign(this.controllable);
        Vector2.add(this.v2, this.v1, this.points[this.p2].value);
    }

    protected interpolate(t: number): void {
        Vector2.lerp(this.controllable, this.v1, this.v2, t);
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