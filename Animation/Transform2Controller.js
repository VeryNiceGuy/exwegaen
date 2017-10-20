var Transform2Animation = (function () {
    function Transform2Animation(positionTimeline, rotationTimeline, scaleTimeline) {
        if (positionTimeline === void 0) { positionTimeline = new Timeline(); }
        if (rotationTimeline === void 0) { rotationTimeline = new Timeline(); }
        if (scaleTimeline === void 0) { scaleTimeline = new Timeline(); }
        this.positionTimeline = positionTimeline;
        this.rotationTimeline = rotationTimeline;
        this.scaleTimeline = scaleTimeline;
    }
    return Transform2Animation;
}());
var Vector2TransformInterpolationType;
(function (Vector2TransformInterpolationType) {
    Vector2TransformInterpolationType[Vector2TransformInterpolationType["Lerp"] = 0] = "Lerp";
    Vector2TransformInterpolationType[Vector2TransformInterpolationType["Slerp"] = 1] = "Slerp";
})(Vector2TransformInterpolationType || (Vector2TransformInterpolationType = {}));
var Vector2TransformController = (function () {
    function Vector2TransformController(timeline, original, interpolationType) {
        this.timepoint1 = new Timepoint(0, new Vector2(0, 0));
        this.timepoint2 = new Timepoint(0, new Vector2(0, 0));
        this.timeline = timeline;
        this.original = original;
        this.segmentIndex = 0;
        this.originalCopy = new Vector2(this.original.x, this.original.y);
        this.interpolationType = interpolationType;
    }
    Vector2TransformController.prototype.transform = function (time) {
        if (time >= 0 && time <= this.timeline.getLastPoint().time) {
            this.segmentIndex = this.timeline.getNextSegmentIndex(time, this.segmentIndex);
            this.timeline.getSegmentPoints(this.segmentIndex, this.timepoint1, this.timepoint2);
            var t = (time - this.timepoint1.time) / (this.timepoint2.time - this.timepoint1.time);
            if (this.interpolationType == Vector2TransformInterpolationType.Lerp) {
                this.result = Vector2.lerp(this.timepoint1.value, this.timepoint2.value, t);
                Vector2.assign(this.original, Vector2.add(this.result, this.originalCopy));
            }
            else {
                this.result = Vector2.slerp(this.timepoint1.value, this.timepoint2.value, t);
                this.original.x = this.originalCopy.x * this.result.x - this.originalCopy.y * this.result.y;
                this.original.y = this.originalCopy.x * this.result.y + this.result.x * this.originalCopy.y;
            }
        }
    };
    return Vector2TransformController;
}());
var Transform2Animator = (function () {
    function Transform2Animator(animation, transformable) {
        this.animation = animation;
        this.transformable = transformable;
        this.positionTransformController = new Vector2TransformController(animation.positionTimeline, transformable.position, Vector2TransformInterpolationType.Lerp);
        this.rotationTransformController = new Vector2TransformController(animation.rotationTimeline, transformable.rotation, Vector2TransformInterpolationType.Slerp);
        this.scaleTransformController = new Vector2TransformController(animation.scaleTimeline, transformable.scale, Vector2TransformInterpolationType.Lerp);
    }
    Transform2Animator.prototype.startAnimation = function () {
        this.startTime = performance.now() * 0.001;
    };
    Transform2Animator.prototype.stopAnimation = function () { };
    Transform2Animator.prototype.animate = function () {
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
    };
    return Transform2Animator;
}());
//# sourceMappingURL=Transform2Controller.js.map