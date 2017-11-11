abstract class Animator {
    protected p1: number;
    protected p2: number;

    initialize(): void {
        this.p1 = 0;
        this.p2 = 1;

        this.prepare();
    }

    private searchForward(time: number): void {
        do {
            this.p1 = this.p2++;
            this.stepForward();
        } while(this.getPointTime(this.p2) < time);
    }

    private searchBackward(time: number): void {
        do {
            this.p2 = this.p1--;
            this.stepBackward();
        } while(this.getPointTime(this.p1) > time);
    }

    protected findSegment(time: number): void {
        if(time > this.getPointTime(this.p2)) {
            this.searchForward(time);
        } else if(time < this.getPointTime(this.p1)) {
            this.searchBackward(time);
        }
    }

    protected abstract getNumPoints(): number;
    protected abstract getPointTime(i: number): number;
    protected abstract prepare(): void;
    protected abstract stepForward(): void;
    protected abstract stepBackward(): void;

    protected update(time: number): void {
        time = clamp(time, 0, this.getPointTime(this.getNumPoints()-1));
        this.findSegment(time);
    }
}