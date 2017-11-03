var TwoDimTransformAnimation = (function () {
    function TwoDimTransformAnimation(positionTimeline, rotationTimeline, scaleTimeline) {
        if (positionTimeline === void 0) { positionTimeline = new Vector2Timeline(); }
        if (rotationTimeline === void 0) { rotationTimeline = new Vector2Timeline(); }
        if (scaleTimeline === void 0) { scaleTimeline = new Vector2Timeline(); }
        this.positionTimeline = positionTimeline;
        this.rotationTimeline = rotationTimeline;
        this.scaleTimeline = scaleTimeline;
    }
    return TwoDimTransformAnimation;
}());
var TwoDimTransformAnimator = (function () {
    function TwoDimTransformAnimator(animation, transformable) {
        this.animation = animation;
        this.transformable = transformable;
        this.animating = false;
        this.positionTransformController = new Vector2DispController(null, transformable.position);
        this.rotationTransformController = new Vector2AngController(null, transformable.rotation);
        this.scaleTransformController = new Vector2DispController(null, transformable.scale);
    }
    TwoDimTransformAnimator.prototype.startAnimation = function () {
        this.animating = true;
        this.startTime = performance.now() * 0.001;
        this.positionTransformController.initialize();
        this.rotationTransformController.initialize();
        this.scaleTransformController.initialize();
    };
    TwoDimTransformAnimator.prototype.stopAnimation = function () {
        this.animating = false;
    };
    TwoDimTransformAnimator.prototype.animate = function () {
        if (!this.animating)
            return;
        this.elapsedTime = (performance.now() * 0.001) - this.startTime;
        this.positionTransformController.update(this.elapsedTime);
        this.rotationTransformController.update(this.elapsedTime);
        this.scaleTransformController.update(this.elapsedTime);
    };
    return TwoDimTransformAnimator;
}());
//# sourceMappingURL=TwoDimTransformAnimator.js.map