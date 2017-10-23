﻿interface Transformable2 {
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

class TwoDimTransformPoint {
    constructor(
        public time: number,
        public value: Vector2,
        public next: TwoDimTransformPoint = null,
        public prev: TwoDimTransformPoint = null){}

    static findPointAtLesserTime(
        time: number, start: TwoDimTransformPoint): TwoDimTransformPoint {

        let p: TwoDimTransformPoint = start.next;
        while(p){
            if(p.time > time)
                return p;
        }

        return null;
    }

    static findPointAtGreaterTime(
        time: number, start: TwoDimTransformPoint): TwoDimTransformPoint {

        let p: TwoDimTransformPoint = start.next;
        while(p){
            if(p.time > time)
                return p;
        }

        return null;
    }
}

class TwoDimTransformTimeline {
    private numberOfPoints: number;
    private firstPoint: TwoDimTransformPoint;
    private lastPoint: TwoDimTransformPoint;

    constructor() {
        this.numberOfPoints = 0;
        this.firstPoint = null;
        this.lastPoint = null;
    }

    getNumberOfPoints(): number {
        return this.numberOfPoints;
    }

    getFirstPoint(): TwoDimTransformPoint {
        return this.firstPoint;
    }

    getLastPoint(): TwoDimTransformPoint {
        return this.lastPoint;
    }

    static linkTwoPoints(
        left: TwoDimTransformPoint,
        right: TwoDimTransformPoint): void {

        left.next = right;
        right.prev = left;
    }

    static linkThreePoints(
        left: TwoDimTransformPoint,
        middle: TwoDimTransformPoint,
        right: TwoDimTransformPoint): void {

        left.next = middle;
        middle.prev = left;
        middle.next = right;
        right.prev = middle;
    }

    createPoint(time: number, value: Vector2): TwoDimTransformPoint {
        let newPoint: TwoDimTransformPoint =
            new TwoDimTransformPoint(time, value);

        if (this.getNumberOfPoints())
        {
            if(time > this.getLastPoint().time) {
                TwoDimTransformTimeline.linkTwoPoints(
                    this.getLastPoint(), newPoint);
                this.lastPoint = newPoint;
            } else {
                let pointAtGreaterTime: TwoDimTransformPoint =
                    TwoDimTransformPoint.findPointAtGreaterTime(time, this.getFirstPoint());

                TwoDimTransformTimeline.linkThreePoints(
                    pointAtGreaterTime.prev, newPoint, pointAtGreaterTime)
            }
        }
        else
        {
            this.firstPoint = new TwoDimTransformPoint(time, value);
            this.lastPoint = this.getFirstPoint();
        }

        ++this.numberOfPoints;

        return null;
    }
}

const enum InterpolationType {
    Lerp, Slerp
}

class TwoDimTransformController {
    private p1: TwoDimTransformPoint;
    private interpolant: Vector2;
    public transformed: Vector2;

    constructor(
        private timeline: TwoDimTransformTimeline,
        private interpolationType: InterpolationType,
        private value: Vector2) {

        this.p1 = timeline.getFirstPoint();
        this.interpolant = new Vector2();
        this.transformed = value;
    }

    transform(time: number) {
        if (time >= 0 && time <= this.timeline.getLastPoint().time) {
            Vector2.subtractAssign(this.transformed, this.interpolant);
            this.interpolant = new Vector2();

            if(time < this.p1.time) {
                let p1: TwoDimTransformPoint = this.p1.prev;
                while(p1) {
                    Vector2.subtractAssign(this.transformed, p1.prev.value);

                    if(p1.time <= time) { /*search for new p1*/
                        break;
                    }

                    p1 = p1.prev;
                }

                this.p1 = p1;
            } else if(time > this.p1.next.time) {
                let p2: TwoDimTransformPoint = this.p1.next.next;
                while(p2) {
                    Vector2.addAssign(this.transformed, p2.prev.value);

                    if(p2.time >= time) { /*search for new p2*/
                        break;
                    }

                    p2 = p2.next;
                }
                this.p1 = p2.prev;
            }

            let t: number = (time - this.p1.time) / (this.p1.next.time - this.p1.time);
            this.interpolant = Vector2.lerp(this.p1.value, Vector2.add(this.p1.value, this.p1.next.value), t);
            Vector2.addAssign(this.transformed, this.interpolant);
        }
    }
}

class TwoDimTransformAnimator {
    animation: TwoDimTransformAnimation;
    transformable: Transformable2;

    startTime: number;
    elapsedTime: number;

    positionTransformController: TwoDimTransformController;

    go: boolean;

    constructor(animation: TwoDimTransformAnimation, transformable: Transformable2) {
        this.animation = animation;
        this.transformable = transformable;

        let timeline: TwoDimTransformTimeline = new TwoDimTransformTimeline();
        timeline.createPoint(0, new Vector2(0,0));
        timeline.createPoint(1, new Vector2(50,0));
        timeline.createPoint(3, new Vector2(-50,0));
        timeline.createPoint(4, new Vector2(50,0));
        timeline.createPoint(5, new Vector2(-50,0));


        this.positionTransformController =
            new TwoDimTransformController(
                timeline, InterpolationType.Lerp, transformable.position);

        this.go = false;
    }

    startAnimation(): void {
        this.go = true;
        this.startTime = performance.now() * 0.001;
        //this.positionTransformController.transform(6);
    }

    stopAnimation(): void { }

    animate(): void {
        if(!this.go) return;
        this.elapsedTime = (performance.now() * 0.001) - this.startTime;
        //this.elapsedTime = 6 - this.elapsedTime;

        this.positionTransformController.transform(this.elapsedTime);
        Vector2.assign(this.transformable.position, this.positionTransformController.transformed);
    }
}
