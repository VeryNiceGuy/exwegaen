abstract class Animator {
    private p1: number;
    private p2: number;
    private time: number;
    private t: number;

    constructor(){
        this.p1 = 0;
        this.p2 = 0;
        this.time = 0;
        this.t = 0;
    }

    initialize(): void {
        this.p1 = 0;
        this.p2 = 1;
        this.time = 0;
        this.t = 0;
        this.firstSegment(this.p1, this.p2);
    }

    private searchForward(time: number): void {
        do {
            this.p1 = this.p2++;
            this.nextSegment(this.p1, this.p2);
        } while(this.getPointTime(this.p2) < time);
    }

    private searchBackward(time: number): void {
        do {
            this.p2 = this.p1--;
            this.prevSegment(this.p1, this.p2);
        } while(this.getPointTime(this.p1) > time);
    }

    private findSegment(time: number): void {
        if(time > this.getPointTime(this.p2)) {
            this.searchForward(time);
        } else if(time < this.getPointTime(this.p1)) {
            this.searchBackward(time);
        }
    }

    abstract getNumPoints(): number;
    abstract getPointTime(i: number): number;

    getFirstTime(): number {
        return this.getPointTime(0);
    }

    getLastTime(): number {
        return this.getPointTime(this.getNumPoints()-1);
    }

    protected abstract firstSegment(p1: number, p2: number): void;
    protected abstract nextSegment(p1: number, p2: number): void;
    protected abstract prevSegment(p1: number, p2: number): void;
    protected abstract interpolate(p1: number, p2: number, t: number): void;

    update(time: number): void {
        this.time = clamp(time, 0, this.getLastTime());
        this.findSegment(this.time);

        let t1: number = this.getPointTime(this.p1);
        this.t = (this.time - t1) / (this.getPointTime(this.p2) - t1);
        this.interpolate(this.p1, this.p2, this.t);
    }
}