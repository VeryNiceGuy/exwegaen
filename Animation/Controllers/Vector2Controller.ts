abstract class Vector2Controller extends Controller {
    protected interpolant: Vector2;
    public transformed: Vector2;
    public transformedInterpolated: Vector2;

    constructor(timeline: Vector2Timeline, value: Vector2) {
        super(timeline);
        this.transformed = new Vector2();

        Vector2.assign(this.transformed, value);
        this.transformedInterpolated = new Vector2();
    }
}