abstract class Controller {
    protected p1: number;
    protected p2: number;

    protected abstract prepare(): void;
    protected abstract interpolate(t: number): void;
    protected abstract stepForward(): void;
    protected abstract stepBackward(): void;
    protected abstract getPointTime(i: number): number;
    protected abstract getNumPoints(): number;

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

    initialize(): void {
        this.p1 = 0;
        this.p2 = 1;

        this.prepare();
    }

    update(time: number): void {
        time = clamp(time, 0, this.getPointTime(this.getNumPoints()-1));

        if(time > this.getPointTime(this.p2)) {
            this.searchForward(time);
        } else if(time < this.getPointTime(this.p1)) {
            this.searchBackward(time);
        }

        this.interpolate(
            (time - this.getPointTime(this.p1)) /
            (this.getPointTime(this.p2) -
                this.getPointTime(this.p1)));
    }
}