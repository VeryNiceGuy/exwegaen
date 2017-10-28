abstract class Controller {
    private timeline: Timeline;
    private p1: Timepoint;
    private p2: Timepoint;

    protected abstract prevPoint(p1: Timepoint): void;
    protected abstract thisPoint(p1: Timepoint, t: number): void;
    protected abstract nextPoint(p2: Timepoint): void;

    constructor(timeline: Timeline) {
        this.timeline = timeline;
        this.p1 = this.timeline.getFirstPoint();
        this.p2 = this.p1.next;
    }

    private traverseForward(time: number): void {
        do {
            this.p1 = this.p2;
            this.p2 = this.p2.next;
            this.nextPoint(this.p1)
        } while(this.p2.time < time);
    }

    private traverseBackward(time: number): void {
        do {
            this.p1 = this.p1.prev;
            this.p2 = this.p1;
            this.prevPoint(this.p2);
        }while(this.p1.time > time);
    }

    update(time: number) {
        if (time >= 0 && time <= this.timeline.getLastPoint().time) {
            if(time > this.p1.next.time) {
                this.traverseForward(time);
            } else if(time < this.p1.time) {
                this.traverseBackward(time);
            }
            this.thisPoint(this.p1, (time - this.p1.time) / (this.p2.time - this.p1.time));
        }
    }
}