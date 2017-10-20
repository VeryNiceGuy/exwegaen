class Rectangle2 {
    leftTop: Vector2;
    rightBottom: Vector2;

    constructor(leftTop: Vector2, rightBottom: Vector2) {
        this.leftTop = leftTop;
        this.rightBottom = rightBottom
    }

    getWidth(): number {
        return this.rightBottom.x - this.leftTop.x;
    }

    getHeight(): number {
        return this.rightBottom.y - this.leftTop.y;
    }

    static createFromLeftTopAndDimensions(leftTop: Vector2, width: number, height: number) {
        return new Rectangle2(leftTop, new Vector2(leftTop.x + width, leftTop.y + height));
    }
}
