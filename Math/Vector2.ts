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

    static addAngle(r: Vector2, v1: Vector2, v2: Vector2): void {
        const x: number = v1.x * v2.x - v1.y * v2.y;
        const y: number = v1.x * v2.y + v2.x * v1.y;

        r.x = x;
        r.y = y;
    }

    static subtractAngle(r: Vector2, v1: Vector2, v2: Vector2): void {
        const y2: number = -v2.y;

        const x: number = v1.x * v2.x - v1.y * y2;
        const y: number = v1.x * y2 + v2.x * v1.y;

        r.x = x;
        r.y = y;
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    assign(v: Vector2): void {
        this.x = v.x;
        this.y = v.y;
    }

    static dot(v1: Vector2, v2: Vector2): number {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static add(r: Vector2, v1: Vector2, v2: Vector2): void {
        r.x = v1.x + v2.x;
        r.y = v1.y + v2.y;
    }

    static subtract(r: Vector2, v1: Vector2, v2: Vector2): void {
        r.x = v1.x - v2.x;
        r.y = v1.y - v2.y;
    }

    static addScalar(r: Vector2, v: Vector2, s: number): void {
        r.x = v.x + s;
        r.y = v.y + s;
    }

    static subtractScalar(r: Vector2, v: Vector2, s: number): void {
        r.x = v.x - s;
        r.y = v.y - s;
    }

    static divideScalar(r: Vector2, v: Vector2, s: number): void {
        r.x = v.x / s;
        r.y = v.y / s;
    }

    static multiplyScalar(r: Vector2, v: Vector2, s: number): void {
        r.x = v.x * s;
        r.y = v.y * s;
    }

    static angleBetween(v1: Vector2, v2: Vector2): number {
        return Math.acos(Vector2.dot(v1, v2) / (v1.magnitude() * v2.magnitude()));
    }

    static lerp(r: Vector2, v1: Vector2, v2: Vector2, t: number): void {
        Vector2.subtract(r, v2, v1);
        Vector2.multiplyScalar(r, r, t);
        Vector2.add(r, v1, r);
    }

    static slerp(r: Vector2, v1: Vector2, v2: Vector2, t: number): void {
        const angle: number = Vector2.angleBetween(v1, v2);
        const sin1: number = Math.sin((1.0 - t) * angle);
        const sin2: number = Math.sin(t * angle);
        const sin3: number = Math.sin(angle);

        r.x = (v1.x * sin1 + v2.x * sin2) / sin3;
        r.y = (v1.y * sin1 + v2.x * sin2) / sin3;
    } 
}