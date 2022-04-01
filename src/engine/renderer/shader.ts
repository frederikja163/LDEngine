enum ShaderType
{
    VertexShader = WebGL2RenderingContext.VERTEX_SHADER,
    FragmentShader = WebGL2RenderingContext.FRAGMENT_SHADER,
}

/** A webgl shader. */
class Shader
{
    private previouslyBoundShader: Shader | null;
    private static boundShader: Shader | null;

    private readonly gl: WebGL2RenderingContext;
    private readonly handle: WebGLProgram;
    private readonly uniformLocations: Map<string, WebGLUniformLocation> = new Map();

    /** Constructs a new shader with vertexSrc and fragmentSrc. */
    public constructor(renderer: Renderer, vertSrc: string, fragSrc: string)
    {
        const gl = renderer.gl;
        this.gl = gl;

        const vert: WebGLShader = this.createShader(ShaderType.VertexShader, vertSrc);
        const frag: WebGLShader = this.createShader(ShaderType.FragmentShader, fragSrc);

        const handle = gl.createProgram();
        this.handle = handle;

        gl.attachShader(handle, vert);
        gl.attachShader(handle, frag);

        gl.linkProgram(handle);
        const il: string = gl.getProgramInfoLog(handle);
        if(il != "")
        {
            console.error(il);
        }

        gl.detachShader(handle, vert);
        gl.deleteShader(vert);
        gl.detachShader(handle, frag);
        gl.deleteShader(frag);
    }

    public delete(): void
    {
        this.gl.deleteProgram(this.handle);
    }

    private createShader(type: ShaderType, src: string): WebGLShader
    {
        const gl = this.gl;

        const handle = gl.createShader(type);
        gl.shaderSource(handle, src);
        gl.compileShader(handle);
        const il: string = gl.getShaderInfoLog(handle);
        if(il != "")
        {
            console.error(il);
        }

        return handle;
    }

    /** Bind this object. */
    public bind(): void
    {
        if(Shader.boundShader == this)
        {
            return;
        }

        this.gl.useProgram(this.handle);

        this.previouslyBoundShader = Shader.boundShader;
        Shader.boundShader = this;
    }

    /** Unbind this object and bind what was previously bound. */
    public unbind(): void
    {
        this.gl.useProgram(this.previouslyBoundShader?.handle ?? null);

        Shader.boundShader = this.previouslyBoundShader;
    }

    // Uniforms.
    /** Gets the location of a uniform variable. */
    public getUniformLocation(name: string): WebGLUniformLocation
    {
        if(this.uniformLocations.has(name))
        {
            return this.uniformLocations.get(name);
        }
        return this.gl.getUniformLocation(this.handle, name);
    }

    /** Sets a uniform field on this shader with 1 float. */
    public setUniform1f(name: string, value1: number): void
    {
        const location: WebGLUniformLocation = this.getUniformLocation(name);
        this.gl.uniform1f(location, value1);
    }

    /** Sets a uniform field on this shader with 1 int. */
    public setUniform1i(name: string, value1: number): void
    {
        const location: WebGLUniformLocation = this.getUniformLocation(name);
        this.gl.uniform1i(location, value1);
    }

    /** Sets a uniform field on this shader with 2 floats. */
    public setUniform2f(name: string, value1: number, value2: number): void
    {
        const location: WebGLUniformLocation = this.getUniformLocation(name);
        this.gl.uniform2f(location, value1, value2);
    }

    /** Sets a uniform field on this shader with 2 ints. */
    public setUniform2i(name: string, value1: number, value2: number): void
    {
        const location: WebGLUniformLocation = this.getUniformLocation(name);
        this.gl.uniform2i(location, value1, value2);
    }

    /** Sets a uniform field on this shader with 3 floats. */
    public setUniform3f(name: string, value1: number, value2: number, value3: number): void
    {
        const location: WebGLUniformLocation = this.getUniformLocation(name);
        this.gl.uniform3f(location, value1, value2, value3);
    }

    /** Sets a uniform field on this shader with 3 ints. */
    public setUniform3i(name: string, value1: number, value2: number, value3: number): void
    {
        const location: WebGLUniformLocation = this.getUniformLocation(name);
        this.gl.uniform3i(location, value1, value2, value3);
    }

    /** Sets a uniform field on this shader with 4 floats. */
    public setUniform4f(name: string, value1: number, value2: number, value3: number, value4: number): void
    {
        const location: WebGLUniformLocation = this.getUniformLocation(name);
        this.gl.uniform4f(location, value1, value2, value3, value4);
    }

    /** Sets a uniform field on this shader with 4 ints. */
    public setUniform4i(name: string, value1: number, value2: number, value3: number, value4: number): void
    {
        const location: WebGLUniformLocation = this.getUniformLocation(name);
        this.gl.uniform4i(location, value1, value2, value3, value4);
    }
}