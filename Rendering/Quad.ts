class Quad implements Transformable2 {
    position: Vector2;
    width: number;
    height: number;
    UVRectangle: Rectangle2;
    pressed: boolean;
    anchor: Vector2;

    rotation: Vector2;
    scale: Vector2;

    transform2Animator: TwoDimTransformAnimator;

    constructor(
        position: Vector2,
        width: number,
        height: number,
        UVRectangle: Rectangle2) {

        this.position = position;
        this.width = width;
        this.height = height;

        this.UVRectangle = UVRectangle;
        this.pressed = false;
        this.anchor = new Vector2(0, 0);

        this.rotation = new Vector2(1, 0);
        this.scale = new Vector2(1, 1);
        this.transform2Animator = new TwoDimTransformAnimator(null, this);

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

        this.transform2Animator.positionTransformController.timeline = timeline1;
        this.transform2Animator.rotationTransformController.timeline = timeline3;
        this.transform2Animator.scaleTransformController.timeline = timeline2;
    }

    containsMousePointer(mousePointerPosition: Vector2): boolean {
        let upperLeftCorner: Vector2 = this.position;
        let lowerRightCorner: Vector2 = new Vector2();

        Vector2.add(lowerRightCorner, upperLeftCorner, new Vector2(this.width, this.height));

        if (mousePointerPosition.x >= upperLeftCorner.x &&
            mousePointerPosition.y >= upperLeftCorner.y &&
            mousePointerPosition.x <= lowerRightCorner.x &&
            mousePointerPosition.y <= lowerRightCorner.y) {
            return true;
        } else {
            return false;
        }
    }

    createVertices(vertices: Float32Array, offset: number, screenWidth: number, screenHeight: number): void {
        let p0: Vector2 = new Vector2(this.position.x, this.position.y + this.height);
        let p1: Vector2 = new Vector2(this.position.x, this.position.y);
        let p2: Vector2 = new Vector2(this.position.x + this.width, this.position.y);
        let p3: Vector2 = new Vector2(this.position.x + this.width, this.position.y + this.height);

        let pivot: Vector2 = new Vector2(
            this.position.x + this.width * 0.5,
            this.position.y + this.height * 0.5);

        p0 = Vector2.rotate(this.rotation, pivot, p0);
        p1 = Vector2.rotate(this.rotation, pivot, p1);
        p2 = Vector2.rotate(this.rotation, pivot, p2);
        p3 = Vector2.rotate(this.rotation, pivot, p3);

        p0.x *= this.scale.x;
        p1.x *= this.scale.x;
        p2.x *= this.scale.x;
        p3.x *= this.scale.x;

        p0.y *= this.scale.y;
        p1.y *= this.scale.y;
        p2.y *= this.scale.y;
        p3.y *= this.scale.y;

        let screenCenter: Vector2 = new Vector2(screenWidth * 0.5, screenHeight * 0.5);

        Vector2.subtract(p0, p0, screenCenter);
        p0.x /= screenCenter.x;
        p0.y /= screenCenter.y;
        p0.y *= -1.0;

        Vector2.subtract(p1, p1, screenCenter);
        p1.x /= screenCenter.x;
        p1.y /= screenCenter.y;
        p1.y *= -1.0;

        Vector2.subtract(p2,p2, screenCenter);
        p2.x /= screenCenter.x;
        p2.y /= screenCenter.y;
        p2.y *= -1.0;

        Vector2.subtract(p3,p3, screenCenter);
        p3.x /= screenCenter.x;
        p3.y /= screenCenter.y;
        p3.y *= -1.0;

/*
        let inGLSpace: Vector2 = Vector2.subtract(this.position, screenCenter);
        inGLSpace.x /= screenCenter.x;
        inGLSpace.y /= screenCenter.y;
        inGLSpace.y *= -1.0;

        let widthInGLSpace: number = this.width / screenCenter.x;
        let heightInGLSpace: number = this.height / screenCenter.y;

        let v0: Vector2 = new Vector2(inGLSpace.x, inGLSpace.y - heightInGLSpace);
        let v1: Vector2 = new Vector2(inGLSpace.x, inGLSpace.y);
        let v2: Vector2 = new Vector2(inGLSpace.x + widthInGLSpace, inGLSpace.y);
        let v3: Vector2 = new Vector2(inGLSpace.x + widthInGLSpace, inGLSpace.y - heightInGLSpace);
        */
        vertices[offset] = p0.x;
        vertices[offset + 1] = p0.y;
        vertices[offset + 2] = p1.x;
        vertices[offset + 3] = p1.y;
        vertices[offset + 4] = p2.x;
        vertices[offset + 5] = p2.y;
        vertices[offset + 6] = p3.x;
        vertices[offset + 7] = p3.y;
    }

    createTVertices(tvertices: Float32Array, offset: number, textureWidth: number, textureHeight: number): void {
        tvertices[offset] = this.UVRectangle.leftTop.x / textureWidth;
        tvertices[offset + 1] = 1.0 - this.UVRectangle.rightBottom.y / textureHeight;
        tvertices[offset + 2] = this.UVRectangle.leftTop.x / textureWidth;
        tvertices[offset + 3] = 1.0 - this.UVRectangle.leftTop.y / textureHeight;
        tvertices[offset + 4] = this.UVRectangle.rightBottom.x / textureWidth;
        tvertices[offset + 5] = 1.0 - this.UVRectangle.leftTop.y / textureHeight;
        tvertices[offset + 6] = this.UVRectangle.rightBottom.x / textureWidth;
        tvertices[offset + 7] = 1.0 - this.UVRectangle.rightBottom.y / textureHeight;
    }
}