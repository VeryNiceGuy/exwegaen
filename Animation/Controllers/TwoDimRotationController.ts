class TwoDimRotationController extends TwoDimTransformController {
    constructor(timeline: TwoDimTransformTimeline, value: Vector2){
        super(timeline, value);
    }

    protected nextPoint(p2: Timepoint): void {
        Vector2.complexMultiply(
            this.transformed,
            this.transformed,
            (p2 as TwoDimTransformPoint).value);
    }

    protected thisPoint(p1: Timepoint, t: number): void {
        this.interpolant =
            Vector2.slerp(new Vector2(1.0, 0.0), (p1.next as TwoDimTransformPoint).value, t);

        Vector2.complexMultiply(
            this.transformedInterpolated,
            this.transformed,
            this.interpolant);
    }

    protected prevPoint(p1: Timepoint): void {
        Vector2.complexDivide(
            this.transformed,
            this.transformed,
            (p1 as TwoDimTransformPoint).value);
    }
}