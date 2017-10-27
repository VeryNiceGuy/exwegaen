var Vector2 = (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0.0; }
        if (y === void 0) { y = 0.0; }
        this.x = x;
        this.y = y;
    }
    Vector2.rotate = function (angle, pivot, vector) {
        var vectorRelativeToPivot = Vector2.subtract(vector, pivot);
        var rotatedVector = new Vector2(vectorRelativeToPivot.x * angle.x - vectorRelativeToPivot.y * angle.y, vectorRelativeToPivot.y * angle.x + vectorRelativeToPivot.x * angle.y);
        return Vector2.add(rotatedVector, pivot);
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
    Vector2.magnitude = function (vector) {
        return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
    };
    Vector2.dot = function (vector1, vector2) {
        return (vector1.x * vector2.x) + (vector1.y * vector2.y);
    };
    Vector2.assign = function (vector1, vector2) {
        vector1.x = vector2.x;
        vector1.y = vector2.y;
        return vector1;
    };
    Vector2.add = function (vector1, vector2) {
        return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);
    };
    Vector2.addAssign = function (vector1, vector2) {
        vector1.x += vector2.x;
        vector1.y += vector2.y;
        return vector1;
    };
    Vector2.addAssignScalar = function (vector, scalar) {
        vector.x += scalar;
        vector.y += scalar;
        return vector;
    };
    Vector2.subtract = function (vector1, vector2) {
        return new Vector2(vector1.x - vector2.x, vector1.y - vector2.y);
    };
    Vector2.subtractAssign = function (vector1, vector2) {
        vector1.x -= vector2.x;
        vector1.y -= vector2.y;
        return vector1;
    };
    Vector2.subtractAssignScalar = function (vector, scalar) {
        vector.x -= scalar;
        vector.y -= scalar;
        return vector;
    };
    Vector2.multiplyScalar = function (vector, scalar) {
        return new Vector2(vector.x * scalar, vector.y * scalar);
    };
    Vector2.divideScalar = function (vector, scalar) {
        return new Vector2(vector.x / scalar, vector.y / scalar);
    };
    Vector2.multiplyAssignScalar = function (vector, scalar) {
        vector.x *= scalar;
        vector.y *= scalar;
        return vector;
    };
    Vector2.angleBetween = function (vector1, vector2) {
        return Math.acos(Vector2.dot(vector1, vector2) /
            (Vector2.magnitude(vector1) * Vector2.magnitude(vector2)));
    };
    Vector2.lerp = function (vector1, vector2, t) {
        return Vector2.add(vector1, Vector2.multiplyAssignScalar(Vector2.subtract(vector2, vector1), t));
    };
    Vector2.slerp = function (vector1, vector2, t) {
        var angle = Vector2.angleBetween(vector1, vector2);
        return Vector2.divideScalar(Vector2.add(Vector2.multiplyScalar(vector1, Math.sin((1.0 - t) * angle)), Vector2.multiplyScalar(vector2, Math.sin(t * angle))), Math.sin(angle));
    };
    return Vector2;
}());
//# sourceMappingURL=Vector2.js.map