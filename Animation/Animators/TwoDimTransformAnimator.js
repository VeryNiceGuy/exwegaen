var TwoDimTransformAnimation = (function () {
    function TwoDimTransformAnimation(positionTimeline, rotationTimeline, scaleTimeline) {
        if (positionTimeline === void 0) { positionTimeline = new TwoDimTransformTimeline(); }
        if (rotationTimeline === void 0) { rotationTimeline = new TwoDimTransformTimeline(); }
        if (scaleTimeline === void 0) { scaleTimeline = new TwoDimTransformTimeline(); }
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
        var timeline1 = new TwoDimTransformTimeline();
        timeline1.createPoint(0, new Vector2(0, 0));
        timeline1.createPoint(2, new Vector2(250, 0));
        timeline1.createPoint(4, new Vector2(-250, 0));
        timeline1.createPoint(5, new Vector2(50, 0));
        timeline1.createPoint(7, new Vector2(-200, 50));
        timeline1.createPoint(9, new Vector2(50, 100));
        var timeline2 = new TwoDimTransformTimeline();
        timeline2.createPoint(0, new Vector2(0, 0));
        timeline2.createPoint(4, new Vector2(2, 2));
        timeline2.createPoint(8, new Vector2(-2, -2));
        var timeline3 = new TwoDimTransformTimeline();
        var a3 = 45 * Math.PI / 180;
        var a4 = -90 * Math.PI / 180;
        timeline3.createPoint(0, new Vector2(1.0, 0.0));
        timeline3.createPoint(10, new Vector2(Math.cos(a3), Math.sin(a3)));
        this.positionTransformController =
            new TwoDimTranslationController(timeline1, transformable.position);
        this.rotationTransformController =
            new TwoDimRotationController(timeline3, transformable.rotation);
        this.scaleTransformController =
            new TwoDimTranslationController(timeline2, transformable.scale);
        this.go = false;
    }
    TwoDimTransformAnimator.prototype.startAnimation = function () {
        this.go = true;
        this.startTime = performance.now() * 0.001;
    };
    TwoDimTransformAnimator.prototype.stopAnimation = function () { };
    TwoDimTransformAnimator.prototype.animate = function () {
        if (!this.go)
            return;
        this.elapsedTime = (performance.now() * 0.001) - this.startTime;
        this.positionTransformController.update(this.elapsedTime);
        this.rotationTransformController.update(this.elapsedTime);
        this.scaleTransformController.update(this.elapsedTime);
        Vector2.assign(this.transformable.position, this.positionTransformController.transformedInterpolated);
        Vector2.assign(this.transformable.rotation, this.rotationTransformController.transformedInterpolated);
        Vector2.assign(this.transformable.scale, this.scaleTransformController.transformedInterpolated);
    };
    return TwoDimTransformAnimator;
}());
//# sourceMappingURL=TwoDimTransformAnimator.js.map