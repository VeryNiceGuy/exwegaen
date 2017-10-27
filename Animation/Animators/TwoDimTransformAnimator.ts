interface Transformable2 {
    position: Vector2;
    rotation: Vector2;
    scale: Vector2;
}

interface Transformable3 {
    position: Vector3;
    rotation: Quaternion;
    scale: Vector3;
}

class TwoDimTransformAnimation {
    constructor(
        public positionTimeline: TwoDimTransformTimeline = new TwoDimTransformTimeline(),
        public rotationTimeline: TwoDimTransformTimeline = new TwoDimTransformTimeline(),
        public scaleTimeline: TwoDimTransformTimeline = new TwoDimTransformTimeline()) {}
}

class TwoDimTransformAnimator {
    animation: TwoDimTransformAnimation;
    transformable: Transformable2;

    startTime: number;
    elapsedTime: number;

    positionTransformController: TwoDimTransformController;
    rotationTransformController: TwoDimTransformController;
    scaleTransformController: TwoDimTransformController;

    go: boolean;

    constructor(animation: TwoDimTransformAnimation, transformable: Transformable2) {
        this.animation = animation;
        this.transformable = transformable;

        let timeline1: TwoDimTransformTimeline = new TwoDimTransformTimeline();
        timeline1.createPoint(0, new Vector2(0,0));
        timeline1.createPoint(2, new Vector2(250,0));
        timeline1.createPoint(4, new Vector2(-250,0));

        timeline1.createPoint(5, new Vector2(50,0));
        timeline1.createPoint(7, new Vector2(-200,50));
        timeline1.createPoint(9, new Vector2(50,100));

        let timeline2: TwoDimTransformTimeline = new TwoDimTransformTimeline();
        timeline2.createPoint(0, new Vector2(0,0));
        timeline2.createPoint(4, new Vector2(2,2));
        timeline2.createPoint(8, new Vector2(-2,-2));

        let timeline3: TwoDimTransformTimeline = new TwoDimTransformTimeline();

        let a3: number = 45 * Math.PI / 180;
        let a4: number = -90 * Math.PI / 180;

        timeline3.createPoint(0, new Vector2(1.0, 0.0));
        timeline3.createPoint(10, new Vector2(Math.cos(a3), Math.sin(a3)));

        this.positionTransformController =
            new TwoDimTranslationController(
                timeline1, transformable.position);

        this.rotationTransformController =
            new TwoDimRotationController(
                timeline3, transformable.rotation);

        this.scaleTransformController =
            new TwoDimTranslationController(
                timeline2, transformable.scale);

        this.go = false;
    }

    startAnimation(): void {
        this.go = true;
        this.startTime = performance.now() * 0.001;
    }

    stopAnimation(): void { }

    animate(): void {
        if(!this.go) return;
        this.elapsedTime = (performance.now() * 0.001) - this.startTime;

        this.positionTransformController.update(this.elapsedTime);
        this.rotationTransformController.update(this.elapsedTime);
        this.scaleTransformController.update(this.elapsedTime);

        Vector2.assign(this.transformable.position, this.positionTransformController.transformedInterpolated);
        Vector2.assign(this.transformable.rotation, this.rotationTransformController.transformedInterpolated);
        Vector2.assign(this.transformable.scale, this.scaleTransformController.transformedInterpolated);
    }
}