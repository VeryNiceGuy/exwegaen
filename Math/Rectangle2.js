var Rectangle2 = (function () {
    function Rectangle2(leftTop, rightBottom) {
        this.leftTop = leftTop;
        this.rightBottom = rightBottom;
    }
    Rectangle2.prototype.getWidth = function () {
        return this.rightBottom.x - this.leftTop.x;
    };
    Rectangle2.prototype.getHeight = function () {
        return this.rightBottom.y - this.leftTop.y;
    };
    Rectangle2.createFromLeftTopAndDimensions = function (leftTop, width, height) {
        return new Rectangle2(leftTop, new Vector2(leftTop.x + width, leftTop.y + height));
    };
    return Rectangle2;
}());
//# sourceMappingURL=Rectangle2.js.map