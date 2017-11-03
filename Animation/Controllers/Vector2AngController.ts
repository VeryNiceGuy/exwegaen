class Vector2AngController extends Controller {
    private v: Vector2;
    private v1: Vector2;
    private v2: Vector2;

    get value() {
        return this.v;
    }

    set value(v: Vector2) {
        this.v = v;
    }

    constructor(timeline: Vector2Timeline, value: Vector2){
        super(timeline);
        this.value = value;
    }

    protected prepare(): void {
        this.v1 = new Vector2(this.value.x, this.value.y);
        this.v2 = new Vector2();
        Vector2.complexMultiply(this.v2, this.v1, (this.p2 as Vector2Timepoint).value);
    }

    protected interpolate(t: number): void {
        Vector2.slerp(this.v, this.v1, this.v2, t);
    }

    protected stepForward(): void {
        this.v1.assign(this.v2);
        Vector2.complexMultiply(this.v2, this.v1, (this.p1 as Vector2Timepoint).value);
    }

    protected stepBackward(): void {
        this.v2.assign(this.v1);
        Vector2.complexDivide(this.v1, this.v2, (this.p2 as Vector2Timepoint).value);
    }
}