class PolarVector2Controller extends Vector2Controller {
    constructor(timeline: Vector2Timeline, value: Vector2) {
        super(timeline, value);
    }

    protected interpolateBetweenPoints(p1: Timepoint, p2:Timepoint, t: number): void {
        this.interpolant = Vector2.lerp(new Vector2(), (p2 as Vector2Timepoint).value, t);
        this.transformedInterpolated = Vector2.add(this.transformed, this.interpolant);
    }

    protected transitToNextSegment(p1: Timepoint, p2: Timepoint): void {
        Vector2.addAssign(this.transformed, (p1 as Vector2Timepoint).value);
    }

    protected transitToPrevSegment(p1: Timepoint, p2:Timepoint): void {
        Vector2.subtractAssign(this.transformed, (p2 as Vector2Timepoint).value);
    }
}