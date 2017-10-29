class Vector2AngularDisplacementController extends Vector2Controller {
    constructor(timeline: Vector2Timeline, value: Vector2){
        super(timeline, value);
    }

    protected interpolateBetweenPoints(p1: Timepoint, p2:Timepoint, t: number): void {
        this.interpolant = Vector2.slerp(new Vector2(1.0, 0.0), (p2 as Vector2Timepoint).value, t);

        Vector2.complexMultiply(this.transformedInterpolated, this.transformed, this.interpolant);
    }

    protected transitToNextSegment(p1: Timepoint, p2: Timepoint): void {
        Vector2.complexMultiply(this.transformed, this.transformed, (p1 as Vector2Timepoint).value);
    }

    protected transitToPrevSegment(p1: Timepoint, p2: Timepoint): void {
        Vector2.complexDivide(this.transformed, this.transformed, (p2 as Vector2Timepoint).value);
    }
}