abstract class Vector2Controller extends Controller {
    public points: Vector2Timepoint[];
    public controllable: Vector2;

    protected v1: Vector2;
    protected v2: Vector2;

    protected getPointTime(i:number):number{
        return this.points[i].time;
    }

    protected getNumPoints(): number {
        return this.points.length;
    }

    constructor(timeline: Timeline, controllable: Vector2) {
        super();
        this.controllable = controllable;
        this.v1 = new Vector2();
        this.v2 = new Vector2();
    }
}