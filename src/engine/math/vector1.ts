class Vector1
{
    public x: number;

    public constructor(x: number)
    {
        this.x = x;
    }

    public lengthSqr(): number
    {
        return Vector1.dot(this, this);
    }

    public length(): number
    {
        return Math.sqrt(this.lengthSqr());
    }

    public static add(left: Vector1, right: Vector1): Vector1;
    public static add(left: Vector1, right: number): Vector1;
    public static add(left: any, right: any): Vector1
    {
        if(right instanceof Vector1)
        {
            return new Vector1(left.x + right.x);
        }
        return new Vector1(left.x + right);
    }

    public static sub(left: Vector1, right: Vector1): Vector1;
    public static sub(left: Vector1, right: number): Vector1;
    public static sub(left: any, right: any): Vector1
    {
        if(right instanceof Vector1)
        {
            return new Vector1(left.x - right.x);
        }
        return new Vector1(left.x - right);
    }

    public static mul(left: Vector1, right: Vector1): Vector1;
    public static mul(left: Vector1, right: number): Vector1;
    public static mul(left: any, right: any): Vector1
    {
        if(right instanceof Vector1)
        {
            return new Vector1(left.x * right.x);
        }
        return new Vector1(left.x * right);
    }

    public static dot(left: Vector1, right: Vector1): number
    {
        return left.x * right.x;
    }

    public static proj(base: Vector1, shade: Vector1): Vector1
    {
        return Vector1.mul(base, Vector1.mul(Vector1.mul(base, shade), 1 / base.lengthSqr()));
    }

    public static angle(left: Vector1, right: Vector1): number
    {
        return Math.acos(Vector1.dot(left, right) / (left.length() * right.length()));
    }
}