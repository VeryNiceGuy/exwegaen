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
        public positionTimeline: Vector2Timeline = new Vector2Timeline(),
        public rotationTimeline: Vector2Timeline = new Vector2Timeline(),
        public scaleTimeline: Vector2Timeline = new Vector2Timeline()) {}
}

class TwoDimTransformAnimator {
    animation: TwoDimTransformAnimation;
    transformable: Transformable2;

    startTime: number;
    elapsedTime: number;

    positionTransformController: Vector2DispController;
    rotationTransformController: Vector2AngController;
    scaleTransformController: Vector2DispController;

    go: boolean;

    constructor(animation: TwoDimTransformAnimation, transformable: Transformable2) {
        this.animation = animation;
        this.transformable = transformable;

        let timeline1: Vector2Timeline = new Vector2Timeline();
        timeline1.createPoint(0, new Vector2(0,0));
        timeline1.createPoint(2, new Vector2(250,0));
        timeline1.createPoint(4, new Vector2(-250,0));

        timeline1.createPoint(5, new Vector2(50,0));
        timeline1.createPoint(7, new Vector2(-200,50));
        timeline1.createPoint(9, new Vector2(50,100));

        let timeline2: Vector2Timeline = new Vector2Timeline();
        timeline2.createPoint(0, new Vector2(0,0));
        timeline2.createPoint(4, new Vector2(2,2));
        timeline2.createPoint(8, new Vector2(-2,-2));

        let timeline3: Vector2Timeline = new Vector2Timeline();

        let a3: number = 45 * Math.PI / 180;
        let a4: number = -90 * Math.PI / 180;

        timeline3.createPoint(0, new Vector2(1.0, 0.0));
        timeline3.createPoint(10, new Vector2(Math.cos(a3), Math.sin(a3)));

        this.positionTransformController =
            new Vector2DispController(
                timeline1, transformable.position);

        this.rotationTransformController =
            new Vector2AngController(
                timeline3, transformable.rotation);

        this.scaleTransformController =
            new Vector2DispController(
                timeline2, transformable.scale);

        this.positionTransformController.initialize();
        this.rotationTransformController.initialize();
        this.scaleTransformController.initialize();

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

        //Vector2.assign(this.transformable.position, this.positionTransformController.transformedInterpolated);
        //Vector2.assign(this.transformable.rotation, this.rotationTransformController.transformedInterpolated);
        //Vector2.assign(this.transformable.scale, this.scaleTransformController.transformedInterpolated);
    }
}