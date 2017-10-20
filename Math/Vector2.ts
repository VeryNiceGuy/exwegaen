class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0.0, y: number = 0.0) {
        this.x = x;
        this.y = y;
    }

    static rotate(angle: Vector2, pivot: Vector2, vector: Vector2): Vector2 {
        let vectorRelativeToPivot: Vector2 = Vector2.subtract(vector, pivot);
        let rotatedVector: Vector2 = new Vector2(
            vectorRelativeToPivot.x * angle.x - vectorRelativeToPivot.y * angle.y,
            vectorRelativeToPivot.y * angle.x + vectorRelativeToPivot.x * angle.y
        );
        return Vector2.add(rotatedVector, pivot);
    }

    static magnitude(vector: Vector2): number {
        return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
    }

    static dot(vector1: Vector2, vector2: Vector2): number {
        return (vector1.x * vector2.x) + (vector1.y * vector2.y);
    }

    static assign(vector1: Vector2, vector2: Vector2): Vector2 {
        vector1.x = vector2.x;
        vector1.y = vector2.y;

        return vector1;
    }

    static add(vector1: Vector2, vector2: Vector2): Vector2 {
        return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    static addAssign(vector1: Vector2, vector2: Vector2): Vector2 {
        vector1.x += vector2.x;
        vector1.y += vector2.y;

        return vector1;
    }

    static addAssignScalar(vector: Vector2, scalar: number): Vector2 {
        vector.x += scalar;
        vector.y += scalar;

        return vector;
    }

    static subtract(vector1: Vector2, vector2: Vector2): Vector2 {
        return new Vector2(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    static subtractAssign(vector1: Vector2, vector2: Vector2): Vector2 {
        vector1.x -= vector2.x;
        vector1.y -= vector2.y;

        return vector1;
    }

    static subtractAssignScalar(vector: Vector2, scalar: number): Vector2 {
        vector.x -= scalar;
        vector.y -= scalar;

        return vector;
    }

    static multiplyScalar(vector: Vector2, scalar: number): Vector2 {
        return new Vector2(vector.x * scalar, vector.y * scalar);
    }

    static divideScalar(vector: Vector2, scalar: number): Vector2 {
        return new Vector2(vector.x / scalar, vector.y / scalar);
    }

    static multiplyAssignScalar(vector: Vector2, scalar: number): Vector2 {
        vector.x *= scalar;
        vector.y *= scalar;

        return vector;
    }

    static angleBetween(vector1: Vector2, vector2: Vector2): number {
        return Math.acos(Vector2.dot(vector1, vector2) /
            (Vector2.magnitude(vector1) * Vector2.magnitude(vector2)));
    }

    static lerp(vector1: Vector2, vector2: Vector2, t: number): Vector2 {
        return Vector2.add(vector1, Vector2.multiplyAssignScalar(Vector2.subtract(vector2, vector1), t));
    }

    static slerp(vector1: Vector2, vector2: Vector2, t: number): Vector2 {
        let angle: number = Vector2.angleBetween(vector1, vector2);

        return Vector2.divideScalar(Vector2.add(
            Vector2.multiplyScalar(vector1, Math.sin((1.0 - t) * angle)),
            Vector2.multiplyScalar(vector2, Math.sin(t * angle))), Math.sin(angle));
    } 
}
