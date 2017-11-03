class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0.0, y: number = 0.0) {
        this.x = x;
        this.y = y;
    }

    static rotate(angle: Vector2, pivot: Vector2, vector: Vector2): Vector2 {
        let vectorRelativeToPivot: Vector2 = new Vector2();
        Vector2.subtract(vectorRelativeToPivot, vector, pivot);

        let rotatedVector: Vector2 = new Vector2(
            vectorRelativeToPivot.x * angle.x - vectorRelativeToPivot.y * angle.y,
            vectorRelativeToPivot.y * angle.x + vectorRelativeToPivot.x * angle.y
        );
        Vector2.add(rotatedVector, rotatedVector, pivot);

        return rotatedVector;
    }

    static complexMultiply(r: Vector2, v1: Vector2, v2: Vector2): void {
        const x: number = v1.x * v2.x - v1.y * v2.y;
        const y: number = v1.x * v2.y + v2.x * v1.y;

        r.x = x;
        r.y = y;
    }

    static complexDivide(r: Vector2, c1: Vector2, c2: Vector2): void {
        const y2: number = -c2.y;

        const x: number = c1.x * c2.x - c1.y * y2;
        const y: number = c1.x * y2 + c2.x * c1.y;

        r.x = x;
        r.y = y;
    }

    magnitude(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    assign(v: Vector2): void {
        this.x = v.x;
        this.y = v.y;
    }

    static dot(vector1: Vector2, vector2: Vector2): number {
        return (vector1.x * vector2.x) + (vector1.y * vector2.y);
    }

    static add(r: Vector2, v1: Vector2, v2: Vector2): void {
        r.x = v1.x + v2.x;
        r.y = v1.y + v2.y;
    }

    static subtract(r: Vector2, v1: Vector2, v2: Vector2): void {
        r.x = v1.x - v2.x;
        r.y = v1.y - v2.y;
    }

    static addAssignScalar(vector: Vector2, scalar: number): Vector2 {
        vector.x += scalar;
        vector.y += scalar;

        return vector;
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
            (vector1.magnitude() * vector2.magnitude()));
    }

    static lerp(r: Vector2, v1: Vector2, v2: Vector2, t: number): void {
        Vector2.subtract(r, v2, v1);
        Vector2.add(r, v1, Vector2.multiplyAssignScalar(r, t));
    }

    static slerp(r: Vector2, v1: Vector2, v2: Vector2, t: number): void {
        let angle: number = Vector2.angleBetween(v1, v2);
        let temp: Vector2 = new Vector2();

        Vector2.add(
            temp,
            Vector2.multiplyScalar(v1, Math.sin((1.0 - t) * angle)),
            Vector2.multiplyScalar(v2, Math.sin(t * angle)))

        r.assign(Vector2.divideScalar(temp, Math.sin(angle)));
    } 
}
