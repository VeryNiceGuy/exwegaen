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

    animating: boolean;

    constructor(animation: TwoDimTransformAnimation, transformable: Transformable2) {
        this.animation = animation;
        this.transformable = transformable;
        this.animating = false;

        this.positionTransformController = new Vector2DispController(null, transformable.position);
        this.rotationTransformController = new Vector2AngController(null, transformable.rotation);
        this.scaleTransformController = new Vector2DispController(null, transformable.scale);
    }

    startAnimation(): void {
        this.animating = true;
        this.startTime = performance.now() * 0.001;

        this.positionTransformController.initialize();
        this.rotationTransformController.initialize();
        this.scaleTransformController.initialize();
    }

    stopAnimation(): void {
        this.animating = false;
    }

    animate(): void {
        if(!this.animating)
            return;

        this.elapsedTime = (performance.now() * 0.001) - this.startTime;
        this.positionTransformController.update(this.elapsedTime);
        this.rotationTransformController.update(this.elapsedTime);
        this.scaleTransformController.update(this.elapsedTime);
    }
}