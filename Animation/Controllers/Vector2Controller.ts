abstract class Vector2Controller extends Controller {
    public controllable: Vector2;
    protected v1: Vector2;
    protected v2: Vector2;

    constructor(timeline: Timeline, controllable: Vector2) {
        super(timeline);
        this.controllable = controllable;
        this.v1 = new Vector2();
        this.v2 = new Vector2();
    }
}