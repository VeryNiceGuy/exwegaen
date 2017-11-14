abstract class Animator {
    private p1: number;
    private p2: number;

    initialize(): void {
        this.p1 = 0;
        this.p2 = 1;
        this.prepare(this.p1, this.p2);
    }

    private searchForward(time: number): void {
        do {
            this.p1 = this.p2++;
            this.stepForward(this.p1, this.p2);
        } while(this.getPointTime(this.p2) < time);
    }

    private searchBackward(time: number): void {
        do {
            this.p2 = this.p1--;
            this.stepBackward(this.p1, this.p2);
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

    protected abstract prepare(p1: number, p2: number): void;
    protected abstract stepForward(p1: number, p2: number): void;
    protected abstract stepBackward(p1: number, p2: number): void;
    protected abstract interpolate(p1: number, p2: number, t: number): void;

    update(time: number): void {
        let lvTime: number = clamp(time, 0, this.getPointTime(this.getNumPoints()-1));
        this.findSegment(lvTime);

        let t: number =
            (lvTime - this.getPointTime(this.p1)) /
            (this.getPointTime(this.p2) - this.getPointTime(this.p1));

        this.interpolate(this.p1, this.p2, t);
    }
}