interface Transformable2 {
    position: Vector2;
    rotation: Vector2;
    scale: Vector2;
}

class Transform2Animation {
    constructor(
        public positionTimeline: Timeline<Vector2> = new Timeline<Vector2>(),
        public rotationTimeline: Timeline<Vector2> = new Timeline<Vector2>(),
        public scaleTimeline: Timeline<Vector2> = new Timeline<Vector2>()) {}
}

enum Vector2TransformInterpolationType {
    Lerp, Slerp 
}

class Vector2TransformController {
    timeline: Timeline<Vector2>;
    segmentIndex: number;
    timepoint1: Timepoint<Vector2>;
    timepoint2: Timepoint<Vector2>;
    original: Vector2;
    originalCopy: Vector2;
    result: Vector2;
    interpolationType: Vector2TransformInterpolationType;

    transform(time: number) {
        if (time >= 0 && time <= this.timeline.getLastPoint().time) {
            this.segmentIndex = this.timeline.getNextSegmentIndex(time, this.segmentIndex);
            this.timeline.getSegmentPoints(this.segmentIndex, this.timepoint1, this.timepoint2);
            let t: number = (time - this.timepoint1.time) / (this.timepoint2.time - this.timepoint1.time);

            if (this.interpolationType == Vector2TransformInterpolationType.Lerp) {
                this.result = Vector2.lerp(this.timepoint1.value, this.timepoint2.value, t);
                Vector2.assign(this.original, Vector2.add(this.result, this.originalCopy));
            } else {
                this.result = Vector2.slerp(this.timepoint1.value, this.timepoint2.value, t);
                this.original.x = this.originalCopy.x * this.result.x - this.originalCopy.y * this.result.y;
                this.original.y = this.originalCopy.x * this.result.y + this.result.x * this.originalCopy.y;
            }
        }
    }

    constructor(timeline: Timeline<Vector2>, original: Vector2, interpolationType: Vector2TransformInterpolationType) {
        this.timepoint1 = new Timepoint<Vector2>(0, new Vector2(0, 0));
        this.timepoint2 = new Timepoint<Vector2>(0, new Vector2(0, 0));

        this.timeline = timeline;
        this.original = original;
        this.segmentIndex = 0;
        this.originalCopy = new Vector2(this.original.x, this.original.y);
        this.interpolationType = interpolationType;
    }
}

class Transform2Animator {
    animation: Transform2Animation;
    transformable: Transformable2;

    startTime: number;
    elapsedTime: number;

    positionTransformController: Vector2TransformController;
    rotationTransformController: Vector2TransformController;
    scaleTransformController: Vector2TransformController;

    constructor(animation: Transform2Animation, transformable: Transformable2) {
        this.animation = animation;
        this.transformable = transformable;

        this.positionTransformController = new Vector2TransformController(animation.positionTimeline, transformable.position, Vector2TransformInterpolationType.Lerp);
        this.rotationTransformController = new Vector2TransformController(animation.rotationTimeline, transformable.rotation, Vector2TransformInterpolationType.Slerp);
        this.scaleTransformController = new Vector2TransformController(animation.scaleTimeline, transformable.scale, Vector2TransformInterpolationType.Lerp);
    }

    startAnimation(): void {
        this.startTime = performance.now() * 0.001;
    }

    stopAnimation(): void { }

    animate(): void {
        this.elapsedTime = (performance.now() * 0.001) - this.startTime;

        if (this.animation.positionTimeline.getNumberOfPoints()) {
            this.positionTransformController.transform(this.elapsedTime);
        }

        if (this.animation.rotationTimeline.getNumberOfPoints()) {
            this.rotationTransformController.transform(this.elapsedTime);
        }

        if (this.animation.scaleTimeline.getNumberOfPoints()) {
            this.scaleTransformController.transform(this.elapsedTime);
        }
    }
}
