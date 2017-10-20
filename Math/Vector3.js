var Vector3 = (function () {
    function Vector3(x, y, z) {
        if (x === void 0) { x = 0.0; }
        if (y === void 0) { y = 0.0; }
        if (z === void 0) { z = 0.0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector3.assign = function (vector1, vector2) {
        vector1.x = vector2.x;
        vector1.y = vector2.y;
        vector1.z = vector2.z;
        return vector1;
    };
    Vector3.add = function (vector1, vector2) {
        return new Vector3(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z);
    };
    Vector3.addAssign = function (vector1, vector2) {
        vector1.x += vector2.x;
        vector1.y += vector2.y;
        vector1.z += vector2.z;
        return vector1;
    };
    Vector3.addAssignScalar = function (vector, scalar) {
        vector.x += scalar;
        vector.y += scalar;
        vector.z += scalar;
        return vector;
    };
    Vector3.subtract = function (vector1, vector2) {
        return new Vector3(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z);
    };
    Vector3.subtractAssign = function (vector1, vector2) {
        vector1.x -= vector2.x;
        vector1.y -= vector2.y;
        vector1.z -= vector2.z;
        return vector1;
    };
    Vector3.subtractAssignScalar = function (vector, scalar) {
        vector.x -= scalar;
        vector.y -= scalar;
        vector.z -= scalar;
        return vector;
    };
    Vector3.multiplyAssignScalar = function (vector, scalar) {
        vector.x *= scalar;
        vector.y *= scalar;
        vector.z *= scalar;
        return vector;
    };
    Vector3.lerp = function (vector1, vector2, t) {
        return Vector3.add(vector1, Vector3.multiplyAssignScalar(Vector3.subtract(vector2, vector1), t));
    };
    return Vector3;
}());
//# sourceMappingURL=Vector3.js.map