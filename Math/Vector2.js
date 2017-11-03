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
    Vector2.complexDivide = function (r, v1, v2) {
        var y2 = -v2.y;
        var x = v1.x * v2.x - v1.y * y2;
        var y = v1.x * y2 + v2.x * v1.y;
        r.x = x;
        r.y = y;
    };
    Vector2.prototype.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
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
    Vector2.angleBetween = function (v1, v2) {
        return Math.acos(Vector2.dot(v1, v2) / (v1.magnitude() * v2.magnitude()));
    };
    Vector2.lerp = function (r, v1, v2, t) {
        Vector2.subtract(r, v2, v1);
        Vector2.multiplyScalar(r, r, t);
        Vector2.add(r, v1, r);
    };
    Vector2.slerp = function (r, v1, v2, t) {
        var angle = Vector2.angleBetween(v1, v2);
        var sin1 = Math.sin((1.0 - t) * angle);
        var sin2 = Math.sin(t * angle);
        var sin3 = Math.sin(angle);
        r.x = (v1.x * sin1 + v2.x * sin2) / sin3;
        r.y = (v1.y * sin1 + v2.x * sin2) / sin3;
    };
    return Vector2;
}());
//# sourceMappingURL=Vector2.js.map