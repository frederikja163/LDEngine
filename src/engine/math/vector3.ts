class Vector3
{
    public x: number;
    public y: number;
    public z: number;

    public constructor(x: number, y: number, z: number)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public lengthSqr(): number
    {
        return Vector3.dot(this, this);
    }

    public length(): number
    {
        return Math.sqrt(this.lengthSqr());
    }

    public static add(left: Vector3, right: Vector3): Vector3;
    public static add(left: Vector3, right: number): Vector3;
    public static add(left: any, right: any): Vector3
    {
        if(right instanceof Vector3)
        {
            return new Vector3(left.x + right.x, left.y + right.y, left.z + right.z);
        }
        return new Vector3(left.x + right, left.y + right, left.z + right);
    }

    public static sub(left: Vector3, right: Vector3): Vector3;
    public static sub(left: Vector3, right: number): Vector3;
    public static sub(left: any, right: any): Vector3
    {
        if(right instanceof Vector3)
        {
            return new Vector3(left.x - right.x, left.y - right.y, left.z - right.z);
        }
        return new Vector3(left.x - right, left.y - right, left.z - right);
    }

    public static mul(left: Vector3, right: Vector3): Vector3;
    public static mul(left: Vector3, right: number): Vector3;
    public static mul(left: any, right: any): Vector3
    {
        if(right instanceof Vector3)
        {
            return new Vector3(left.x * right.x, left.y * right.y, left.z * right.z);
        }
        return new Vector3(left.x * right, left.y * right, left.z * right);
    }

    public static dot(left: Vector3, right: Vector3): number
    {
        return left.x * right.x + left.y * right.y + left.z * right.z;
    }

    public static proj(base: Vector3, shade: Vector3): Vector3
    {
        return Vector3.mul(base, Vector3.mul(Vector3.mul(base, shade), 1 / base.lengthSqr()));
    }

    public static angle(left: Vector3, right: Vector3): number
    {
        return Math.acos(Vector3.dot(left, right) / (left.length() * right.length()));
    }
}