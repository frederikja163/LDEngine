enum TextureSlot
{
    texture0 = WebGL2RenderingContext.TEXTURE0,
    texture1 = WebGL2RenderingContext.TEXTURE1,
    texture2 = WebGL2RenderingContext.TEXTURE2,
    texture3 = WebGL2RenderingContext.TEXTURE3,
    texture4 = WebGL2RenderingContext.TEXTURE4,
    texture5 = WebGL2RenderingContext.TEXTURE5,
    texture6 = WebGL2RenderingContext.TEXTURE6,
    texture7 = WebGL2RenderingContext.TEXTURE7,
    texture8 = WebGL2RenderingContext.TEXTURE8,
    texture9 = WebGL2RenderingContext.TEXTURE9,
    texture10 = WebGL2RenderingContext.TEXTURE10,
    texture11 = WebGL2RenderingContext.TEXTURE11,
    texture12 = WebGL2RenderingContext.TEXTURE12,
    texture13 = WebGL2RenderingContext.TEXTURE13,
    texture14 = WebGL2RenderingContext.TEXTURE14,
    texture15 = WebGL2RenderingContext.TEXTURE15,
    texture16 = WebGL2RenderingContext.TEXTURE16,
    texture17 = WebGL2RenderingContext.TEXTURE17,
    texture18 = WebGL2RenderingContext.TEXTURE18,
    texture19 = WebGL2RenderingContext.TEXTURE19,
    texture20 = WebGL2RenderingContext.TEXTURE20,
    texture21 = WebGL2RenderingContext.TEXTURE21,
    texture22 = WebGL2RenderingContext.TEXTURE22,
    texture23 = WebGL2RenderingContext.TEXTURE23,
    texture24 = WebGL2RenderingContext.TEXTURE24,
    texture25 = WebGL2RenderingContext.TEXTURE25,
    texture26 = WebGL2RenderingContext.TEXTURE26,
    texture27 = WebGL2RenderingContext.TEXTURE27,
    texture28 = WebGL2RenderingContext.TEXTURE28,
    texture29 = WebGL2RenderingContext.TEXTURE29,
    texture30 = WebGL2RenderingContext.TEXTURE30,
    texture31 = WebGL2RenderingContext.TEXTURE31,
}

class Texture
{
    private boundSlot: number;
    private readonly gl: WebGL2RenderingContext;
    private readonly handle: WebGLTexture;

    public constructor(renderer: Renderer, path: string)
    {
        this.gl = renderer.gl;

        this.handle = this.gl.createTexture();

        this.bind(TextureSlot.texture0);
        this.gl.texImage2D(WebGL2RenderingContext.TEXTURE_2D, 0,
            WebGL2RenderingContext.RGBA,
            1, 1, 0,
            WebGL2RenderingContext.RGBA,
            WebGL2RenderingContext.UNSIGNED_BYTE,
            new Uint8Array([255, 0, 255, 255]));
        this.unbind();

        const image = new Image();
        image.addEventListener("load", () =>
        {
            this.bind(TextureSlot.texture0);

            this.gl.texImage2D(WebGL2RenderingContext.TEXTURE_2D, 0,
                WebGL2RenderingContext.RGBA,
                WebGL2RenderingContext.RGBA,
                WebGL2RenderingContext.UNSIGNED_BYTE,
                image);

            this.gl.texParameteri(WebGL2RenderingContext.TEXTURE_2D, WebGL2RenderingContext.TEXTURE_WRAP_S, WebGL2RenderingContext.MIRRORED_REPEAT)
            this.gl.texParameteri(WebGL2RenderingContext.TEXTURE_2D, WebGL2RenderingContext.TEXTURE_WRAP_T, WebGL2RenderingContext.MIRRORED_REPEAT)
            this.gl.generateMipmap(WebGL2RenderingContext.TEXTURE_2D);

            this.unbind();
        });
        image.src = path;
    }

    public bind(textureSlot: TextureSlot): void
    {
        // TODO: Make unbinding system for textures.
        this.gl.activeTexture(textureSlot);
        this.boundSlot = textureSlot;
        this.gl.bindTexture(WebGL2RenderingContext.TEXTURE_2D, this.handle);
    }

    public unbind(): void
    {
        this.gl.activeTexture(this.boundSlot);
        this.gl.bindTexture(WebGL2RenderingContext.TEXTURE_2D, null);
    }
}