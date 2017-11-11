abstract class InterpAnimator extends Animator {
    protected abstract interpolate(t: number): void;

    update(time: number): void {
        time = clamp(time, 0, this.getPointTime(this.getNumPoints()-1));
        this.findSegment(time);
        this.interpolate(
            (time - this.getPointTime(this.p1)) /
            (this.getPointTime(this.p2) -
                this.getPointTime(this.p1)));
    }
}