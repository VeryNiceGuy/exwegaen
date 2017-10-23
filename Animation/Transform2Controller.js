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
var TwoDimTransformPoint = (function () {
    function TwoDimTransformPoint(time, value, next, prev) {
        if (next === void 0) { next = null; }
        if (prev === void 0) { prev = null; }
        this.time = time;
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
    TwoDimTransformPoint.findPointAtLesserTime = function (time, start) {
        var p = start.next;
        while (p) {
            if (p.time > time)
                return p;
        }
        return null;
    };
    TwoDimTransformPoint.findPointAtGreaterTime = function (time, start) {
        var p = start.next;
        while (p) {
            if (p.time > time)
                return p;
        }
        return null;
    };
    return TwoDimTransformPoint;
}());
var TwoDimTransformTimeline = (function () {
    function TwoDimTransformTimeline() {
        this.numberOfPoints = 0;
        this.firstPoint = null;
        this.lastPoint = null;
    }
    TwoDimTransformTimeline.prototype.getNumberOfPoints = function () {
        return this.numberOfPoints;
    };
    TwoDimTransformTimeline.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };
    TwoDimTransformTimeline.prototype.getLastPoint = function () {
        return this.lastPoint;
    };
    TwoDimTransformTimeline.linkTwoPoints = function (left, right) {
        left.next = right;
        right.prev = left;
    };
    TwoDimTransformTimeline.linkThreePoints = function (left, middle, right) {
        left.next = middle;
        middle.prev = left;
        middle.next = right;
        right.prev = middle;
    };
    TwoDimTransformTimeline.prototype.createPoint = function (time, value) {
        var newPoint = new TwoDimTransformPoint(time, value);
        if (this.getNumberOfPoints()) {
            if (time > this.getLastPoint().time) {
                TwoDimTransformTimeline.linkTwoPoints(this.getLastPoint(), newPoint);
                this.lastPoint = newPoint;
            }
            else {
                var pointAtGreaterTime = TwoDimTransformPoint.findPointAtGreaterTime(time, this.getFirstPoint());
                TwoDimTransformTimeline.linkThreePoints(pointAtGreaterTime.prev, newPoint, pointAtGreaterTime);
            }
        }
        else {
            this.firstPoint = new TwoDimTransformPoint(time, value);
            this.lastPoint = this.getFirstPoint();
        }
        ++this.numberOfPoints;
        return null;
    };
    return TwoDimTransformTimeline;
}());
var TwoDimTransformController = (function () {
    function TwoDimTransformController(timeline, interpolationType, value) {
        this.timeline = timeline;
        this.interpolationType = interpolationType;
        this.value = value;
        this.p1 = timeline.getFirstPoint();
        this.interpolant = new Vector2();
        this.transformed = value;
    }
    TwoDimTransformController.prototype.transform = function (time) {
        if (time >= 0 && time <= this.timeline.getLastPoint().time) {
            Vector2.subtractAssign(this.transformed, this.interpolant);
            this.interpolant = new Vector2();
            if (time < this.p1.time) {
                var p1 = this.p1.prev;
                while (p1) {
                    Vector2.subtractAssign(this.transformed, p1.prev.value);
                    if (p1.time <= time) {
                        break;
                    }
                    p1 = p1.prev;
                }
                this.p1 = p1;
            }
            else if (time > this.p1.next.time) {
                var p2 = this.p1.next.next;
                while (p2) {
                    Vector2.addAssign(this.transformed, p2.prev.value);
                    if (p2.time >= time) {
                        break;
                    }
                    p2 = p2.next;
                }
                this.p1 = p2.prev;
            }
            var t = (time - this.p1.time) / (this.p1.next.time - this.p1.time);
            this.interpolant = Vector2.lerp(this.p1.value, Vector2.add(this.p1.value, this.p1.next.value), t);
            Vector2.addAssign(this.transformed, this.interpolant);
        }
    };
    return TwoDimTransformController;
}());
var TwoDimTransformAnimator = (function () {
    function TwoDimTransformAnimator(animation, transformable) {
        this.animation = animation;
        this.transformable = transformable;
        var timeline = new TwoDimTransformTimeline();
        timeline.createPoint(0, new Vector2(0, 0));
        timeline.createPoint(1, new Vector2(50, 0));
        timeline.createPoint(3, new Vector2(-50, 0));
        timeline.createPoint(4, new Vector2(50, 0));
        timeline.createPoint(5, new Vector2(-50, 0));
        this.positionTransformController =
            new TwoDimTransformController(timeline, 0 /* Lerp */, transformable.position);
        this.go = false;
    }
    TwoDimTransformAnimator.prototype.startAnimation = function () {
        this.go = true;
        this.startTime = performance.now() * 0.001;
        //this.positionTransformController.transform(6);
    };
    TwoDimTransformAnimator.prototype.stopAnimation = function () { };
    TwoDimTransformAnimator.prototype.animate = function () {
        if (!this.go)
            return;
        this.elapsedTime = (performance.now() * 0.001) - this.startTime;
        //this.elapsedTime = 6 - this.elapsedTime;
        this.positionTransformController.transform(this.elapsedTime);
        Vector2.assign(this.transformable.position, this.positionTransformController.transformed);
    };
    return TwoDimTransformAnimator;
}());
//# sourceMappingURL=Transform2Controller.js.map