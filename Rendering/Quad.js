var Quad = (function () {
    function Quad(position, width, height, UVRectangle) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.UVRectangle = UVRectangle;
        this.pressed = false;
        this.anchor = new Vector2(0, 0);
        this.rotation = new Vector2(1, 0);
        this.scale = new Vector2(1, 1);
        this.transform2Animator = new TwoDimTransformAnimator(null, this);
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
        this.transform2Animator.positionTransformController.timeline = timeline1;
        this.transform2Animator.rotationTransformController.timeline = timeline3;
        this.transform2Animator.scaleTransformController.timeline = timeline2;
    }
    Quad.prototype.containsMousePointer = function (mousePointerPosition) {
        var upperLeftCorner = this.position;
        var lowerRightCorner = new Vector2();
        Vector2.add(lowerRightCorner, upperLeftCorner, new Vector2(this.width, this.height));
        if (mousePointerPosition.x >= upperLeftCorner.x &&
            mousePointerPosition.y >= upperLeftCorner.y &&
            mousePointerPosition.x <= lowerRightCorner.x &&
            mousePointerPosition.y <= lowerRightCorner.y) {
            return true;
        }
        else {
            return false;
        }
    };
    Quad.prototype.createVertices = function (vertices, offset, screenWidth, screenHeight) {
        var p0 = new Vector2(this.position.x, this.position.y + this.height);
        var p1 = new Vector2(this.position.x, this.position.y);
        var p2 = new Vector2(this.position.x + this.width, this.position.y);
        var p3 = new Vector2(this.position.x + this.width, this.position.y + this.height);
        var pivot = new Vector2(this.position.x + this.width * 0.5, this.position.y + this.height * 0.5);
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
        var screenCenter = new Vector2(screenWidth * 0.5, screenHeight * 0.5);
        Vector2.subtract(p0, p0, screenCenter);
        p0.x /= screenCenter.x;
        p0.y /= screenCenter.y;
        p0.y *= -1.0;
        Vector2.subtract(p1, p1, screenCenter);
        p1.x /= screenCenter.x;
        p1.y /= screenCenter.y;
        p1.y *= -1.0;
        Vector2.subtract(p2, p2, screenCenter);
        p2.x /= screenCenter.x;
        p2.y /= screenCenter.y;
        p2.y *= -1.0;
        Vector2.subtract(p3, p3, screenCenter);
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
    };
    Quad.prototype.createTVertices = function (tvertices, offset, textureWidth, textureHeight) {
        tvertices[offset] = this.UVRectangle.leftTop.x / textureWidth;
        tvertices[offset + 1] = 1.0 - this.UVRectangle.rightBottom.y / textureHeight;
        tvertices[offset + 2] = this.UVRectangle.leftTop.x / textureWidth;
        tvertices[offset + 3] = 1.0 - this.UVRectangle.leftTop.y / textureHeight;
        tvertices[offset + 4] = this.UVRectangle.rightBottom.x / textureWidth;
        tvertices[offset + 5] = 1.0 - this.UVRectangle.leftTop.y / textureHeight;
        tvertices[offset + 6] = this.UVRectangle.rightBottom.x / textureWidth;
        tvertices[offset + 7] = 1.0 - this.UVRectangle.rightBottom.y / textureHeight;
    };
    return Quad;
}());
//# sourceMappingURL=Quad.js.map