class Vector3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static assign(vector1: Vector3, vector2: Vector3): Vector3 {
        vector1.x = vector2.x;
        vector1.y = vector2.y;
        vector1.z = vector2.z;

        return vector1;
    }

    static add(vector1: Vector3, vector2: Vector3): Vector3 {
        return new Vector3(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z);
    }

    static addAssign(vector1: Vector3, vector2: Vector3): Vector3 {
        vector1.x += vector2.x;
        vector1.y += vector2.y;
        vector1.z += vector2.z;

        return vector1;
    }

    static addAssignScalar(vector: Vector3, scalar: number): Vector3 {
        vector.x += scalar;
        vector.y += scalar;
        vector.z += scalar;

        return vector;
    }

    static subtract(vector1: Vector3, vector2: Vector3): Vector3 {
        return new Vector3(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z);
    }

    static subtractAssign(vector1: Vector3, vector2: Vector3): Vector3 {
        vector1.x -= vector2.x;
        vector1.y -= vector2.y;
        vector1.z -= vector2.z;

        return vector1;
    }

    static subtractAssignScalar(vector: Vector3, scalar: number): Vector3 {
        vector.x -= scalar;
        vector.y -= scalar;
        vector.z -= scalar;

        return vector;
    }

    static multiplyAssignScalar(vector: Vector3, scalar: number): Vector3 {
        vector.x *= scalar;
        vector.y *= scalar;
        vector.z *= scalar;

        return vector;
    }

    static lerp(vector1: Vector3, vector2: Vector3, t: number): Vector3 {
        return Vector3.add(vector1, Vector3.multiplyAssignScalar(Vector3.subtract(vector2, vector1), t));
    }
}
