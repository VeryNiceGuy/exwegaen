var Vector2 = (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0.0; }
        if (y === void 0) { y = 0.0; }
        this.x = x;
        this.y = y;
    }
    Vector2.rotate = function (angle, pivot, vector) {
        var vectorRelativeToPivot = new Vector2();
        Vector2.subtract(vectorRelativeToPivot, vector, pivot);
        var rotatedVector = new Vector2(vectorRelativeToPivot.x * angle.x - vectorRelativeToPivot.y * angle.y, vectorRelativeToPivot.y * angle.x + vectorRelativeToPivot.x * angle.y);
        Vector2.add(rotatedVector, rotatedVector, pivot);
        return rotatedVector;
    };
    Vector2.complexMultiply = function (r, v1, v2) {
        var x = v1.x * v2.x - v1.y * v2.y;
        var y = v1.x * v2.y + v2.x * v1.y;
        r.x = x;
        r.y = y;
    };
    Vector2.complexDivide = function (r, c1, c2) {
        var y2 = -c2.y;
        var x = c1.x * c2.x - c1.y * y2;
        var y = c1.x * y2 + c2.x * c1.y;
        r.x = x;
        r.y = y;
    };
    Vector2.prototype.magnitude = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };
    Vector2.prototype.assign = function (v) {
        this.x = v.x;
        this.y = v.y;
    };
    Vector2.dot = function (v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    };
    Vector2.add = function (r, v1, v2) {
        r.x = v1.x + v2.x;
        r.y = v1.y + v2.y;
    };
    Vector2.subtract = function (r, v1, v2) {
        r.x = v1.x - v2.x;
        r.y = v1.y - v2.y;
    };
    Vector2.addScalar = function (r, v, s) {
        r.x = v.x + s;
        r.y = v.y + s;
    };
    Vector2.subtractScalar = function (r, v, s) {
        r.x = v.x - s;
        r.y = v.y - s;
    };
    Vector2.divideScalar = function (r, v, s) {
        r.x = v.x / s;
        r.y = v.y / s;
    };
    Vector2.multiplyScalar = function (r, v, s) {
        r.x = v.x * s;
        r.y = v.y * s;
    };
    Vector2.angleBetween = function (vector1, vector2) {
        return Math.acos(Vector2.dot(vector1, vector2) /
            (vector1.magnitude() * vector2.magnitude()));
    };
    Vector2.lerp = function (r, v1, v2, t) {
        Vector2.subtract(r, v2, v1);
        Vector2.multiplyScalar(r, r, t);
        Vector2.add(r, v1, r);
    };
    Vector2.slerp = function (r, v1, v2, t) {
        var angle = Vector2.angleBetween(v1, v2);
        var t1 = new Vector2();
        var t2 = new Vector2();
        Vector2.multiplyScalar(t1, v1, Math.sin((1.0 - t) * angle));
        Vector2.multiplyScalar(t2, v2, Math.sin(t * angle));
        Vector2.add(r, t1, t2);
        Vector2.divideScalar(r, r, Math.sin(angle));
    };
    return Vector2;
}());
//# sourceMappingURL=Vector2.js.map