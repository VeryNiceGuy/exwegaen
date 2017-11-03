abstract class Controller {
    private tl: Timeline;
    protected p1: Timepoint;
    protected p2: Timepoint;

    constructor(timeline: Timeline) {
        this.timeline = timeline;
    }

    get timeline() {
        return this.tl;
    }

    set timeline(timeline: Timeline) {
        this.tl = timeline;
    }

    protected abstract prepare(): void;
    protected abstract interpolate(t: number): void;
    protected abstract stepForward(): void;
    protected abstract stepBackward(): void;

    private traverseForward(time: number): void {
        do {
            this.p1 = this.p2;
            this.p2 = this.p2.next;
            this.stepForward();
        } while(this.p2.time < time);
    }

    private traverseBackward(time: number): void {
        do {
            this.p1 = this.p1.prev;
            this.p2 = this.p1;
            this.stepBackward();
        } while(this.p1.time > time);
    }

    initialize(): void {
        this.p1 = this.tl.getFirstPoint();
        this.p2 = this.p1.next;
        this.prepare();
    }

    update(time: number): void {
        time = clamp(time, 0, this.tl.getLastPoint().time);

        if(time > this.p2.time) {
            this.traverseForward(time);
        } else if(time < this.p1.time) {
            this.traverseBackward(time);
        }

        this.interpolate((time - this.p1.time) / (this.p2.time - this.p1.time));
    }
}