class Vector2
{
    public x: number;
    public y: number;

    public constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    public copy(): Vector2
    {
        return new Vector2(this.x, this.y);
    }

    public lengthSqr(): number
    {
        return Vector2.dot(this, this);
    }

    public length(): number
    {
        return Math.sqrt(this.lengthSqr());
    }

    public orthorgonal(): Vector2
    {
        return new Vector2(-this.y, this.x);
    }

    public normalized(): Vector2
    {
        return Vector2.mul(this, 1 / this.length());
    }

    public static add(left: Vector2, right: Vector2): Vector2;
    public static add(left: Vector2, right: number): Vector2;
    public static add(left: any, right: any): Vector2
    {
        if(right instanceof Vector2)
        {
            return new Vector2(left.x + right.x, left.y + right.y);
        }
        return new Vector2(left.x + right, left.y + right);
    }

    public static sub(left: Vector2, right: Vector2): Vector2;
    public static sub(left: Vector2, right: number): Vector2;
    public static sub(left: any, right: any): Vector2
    {
        if(right instanceof Vector2)
        {
            return new Vector2(left.x - right.x, left.y - right.y);
        }
        return new Vector2(left.x - right, left.y - right);
    }

    public static mul(left: Vector2, right: Vector2): Vector2;
    public static mul(left: Vector2, right: number): Vector2;
    public static mul(left: any, right: any): Vector2
    {
        if(right instanceof Vector2)
        {
            return new Vector2(left.x * right.x, left.y * right.y);
        }
        return new Vector2(left.x * right, left.y * right);
    }

    public static dot(left: Vector2, right: Vector2): number
    {
        return left.x * right.x + left.y * right.y;
    }

    public static proj(base: Vector2, shade: Vector2): Vector2
    {
        return Vector2.mul(base, Vector2.mul(Vector2.mul(base, shade), 1 / base.lengthSqr()));
    }

    public static angle(left: Vector2, right: Vector2): number
    {
        return Math.acos(Vector2.dot(left, right) / (left.length() * right.length()));
    }
}