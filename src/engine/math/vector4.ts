class Vector4
{
    public x: number;
    public y: number;
    public z: number;
    public w: number;

    public constructor(x: number, y: number, z: number, w: number)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public lengthSqr(): number
    {
        return Vector4.dot(this, this);
    }

    public length(): number
    {
        return Math.sqrt(this.lengthSqr());
    }

    public static add(left: Vector4, right: Vector4): Vector4;
    public static add(left: Vector4, right: number): Vector4;
    public static add(left: any, right: any): Vector4
    {
        if(right instanceof Vector4)
        {
            return new Vector4(left.x + right.x, left.y + right.y, left.z + right.z, left.w + right.w);
        }
        return new Vector4(left.x + right, left.y + right, left.z + right, left.w + right);
    }

    public static sub(left: Vector4, right: Vector4): Vector4;
    public static sub(left: Vector4, right: number): Vector4;
    public static sub(left: any, right: any): Vector4
    {
        if(right instanceof Vector4)
        {
            return new Vector4(left.x - right.x, left.y - right.y, left.z - right.z, left.w - right.w);
        }
        return new Vector4(left.x - right, left.y - right, left.z - right, left.w - right);
    }

    public static mul(left: Vector4, right: Vector4): Vector4;
    public static mul(left: Vector4, right: number): Vector4;
    public static mul(left: any, right: any): Vector4
    {
        if(right instanceof Vector4)
        {
            return new Vector4(left.x * right.x, left.y * right.y, left.z * right.z, left.w * right.w);
        }
        return new Vector4(left.x * right, left.y * right, left.z * right, left.w * right);
    }

    public static dot(left: Vector4, right: Vector4): number
    {
        return left.x * right.x + left.y * right.y + left.z * right.z + right.w * left.w;
    }

    public static proj(base: Vector4, shade: Vector4): Vector4
    {
        return Vector4.mul(base, Vector4.mul(Vector4.mul(base, shade), 1 / base.lengthSqr()));
    }

    public static angle(left: Vector4, right: Vector4): number
    {
        return Math.acos(Vector4.dot(left, right) / (left.length() * right.length()));
    }
}