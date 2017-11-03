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
        var timeline1 = new Vector2Timeline();
        timeline1.createPoint(0, new Vector2(0, 0));
        timeline1.createPoint(2, new Vector2(250, 0));
        timeline1.createPoint(4, new Vector2(-250, 0));
        timeline1.createPoint(5, new Vector2(50, 0));
        timeline1.createPoint(7, new Vector2(-200, 50));
        timeline1.createPoint(9, new Vector2(50, 100));
        var timeline2 = new Vector2Timeline();
        timeline2.createPoint(0, new Vector2(0, 0));
        timeline2.createPoint(4, new Vector2(2, 2));
        timeline2.createPoint(8, new Vector2(-2, -2));
        var timeline3 = new Vector2Timeline();
        var a3 = 45 * Math.PI / 180;
        var a4 = -90 * Math.PI / 180;
        timeline3.createPoint(0, new Vector2(1.0, 0.0));
        timeline3.createPoint(10, new Vector2(Math.cos(a3), Math.sin(a3)));
        this.positionTransformController =
            new Vector2DispController(timeline1, transformable.position);
        this.rotationTransformController =
            new Vector2AngController(timeline3, transformable.rotation);
        this.scaleTransformController =
            new Vector2DispController(timeline2, transformable.scale);
        this.positionTransformController.initialize();
        this.rotationTransformController.initialize();
        this.scaleTransformController.initialize();
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
    };
    return TwoDimTransformAnimator;
}());
//# sourceMappingURL=TwoDimTransformAnimator.js.map