abstract class Controller {
    private timeline: Timeline;
    private p1: Timepoint;

    protected abstract prevPoint(p1: Timepoint): void;
    protected abstract thisPoint(p1: Timepoint, t: number): void;
    protected abstract nextPoint(p2: Timepoint): void;

    constructor(timeline: Timeline) {
        this.timeline = timeline;
        this.p1 = this.timeline.getFirstPoint();
    }

    update(time: number) {
        if (time >= 0 && time <= this.timeline.getLastPoint().time) {
            if(time > this.p1.next.time) {
                let p2: Timepoint = this.p1.next.next;
                while(p2) {
                    this.nextPoint(this.p1.next);
                    if(p2.time >= time) { /*search for new p2*/
                        break;
                    }
                    p2 = p2.next;
                }
                this.p1 = p2.prev;
            } else if(time < this.p1.time) {
                let p1: Timepoint = this.p1.prev;
                while(p1) {
                    this.prevPoint(this.p1);
                    if(p1.time <= time) { /*search for new p1*/
                        break;
                    }
                    p1 = p1.prev;
                }
                this.p1 = p1;
            }
            this.thisPoint(this.p1, (time - this.p1.time) / (this.p1.next.time - this.p1.time));
        }
    }
}