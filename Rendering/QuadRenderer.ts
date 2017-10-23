class QuadRenderer {
    private vertexShaderSource: string = "\
        attribute vec2 in_vertex;\
        attribute vec2 in_tvertex;\
        varying highp vec2 tvertex;\
        \
        void main(void) {\
            gl_Position = vec4(in_vertex, 1.0, 1.0);\
            tvertex = in_tvertex;\
        }";

    private fragmentShaderSource: string = "\
        varying highp vec2 tvertex;\
        uniform sampler2D sampler;\
        \
        void main(void) {\
            gl_FragColor = texture2D(sampler, vec2(tvertex.s, tvertex.t));\
        }";

    private vertexBuffer: WebGLBuffer;
    private tvertexBuffer: WebGLBuffer;
    private indexBuffer: WebGLBuffer;

    private program: WebGLProgram;
    private texture: WebGLTexture;

    private gl: WebGLRenderingContext;
    private quads: Quad[];

    private screenWidth: number;
    private screenHeight: number;

    private textureWidth: number;
    private textureHeight: number;

    private vertices: Float32Array;
    private tvertices: Float32Array;

    private numberOfQuadsToRender: number;

    constructor(gl: WebGLRenderingContext, screenWidth: number, screenHeight: number, image: HTMLImageElement, numberOfQuads: number) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.quads = [];
        this.numberOfQuadsToRender = 0;

        let numberOfVertices: number = numberOfQuads * 4;
        this.vertices = new Float32Array(numberOfVertices);
        this.tvertices = new Float32Array(numberOfVertices);

        this.gl = gl;

        this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.BLEND);

        this.gl.frontFace(this.gl.CW);
        this.gl.cullFace(this.gl.BACK);

        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.createProgram();
        this.createTexture(image);
        this.createBuffers(numberOfQuads);
    }

    private clearQuads(): void {
        this.quads.splice(0, this.quads.length);
    }

    private createProgram(): void {
        this.program = this.gl.createProgram();
        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        let fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

        this.gl.shaderSource(vertexShader, this.vertexShaderSource);
        this.gl.shaderSource(fragmentShader, this.fragmentShaderSource);

        this.gl.compileShader(vertexShader);
        this.gl.compileShader(fragmentShader);

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);

        this.gl.linkProgram(this.program);

        this.gl.detachShader(this.program, vertexShader);
        this.gl.detachShader(this.program, fragmentShader);

        this.gl.deleteShader(vertexShader);
        this.gl.deleteShader(fragmentShader);
    }

    private createTexture(image: HTMLImageElement): void {
        this.textureWidth = image.naturalWidth;
        this.textureHeight = image.naturalHeight;

        this.texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    }

    private createBuffers(numberOfQuads: number): void {
        this.gl.useProgram(this.program);

        let vertexAttributeLocation: number = this.gl.getAttribLocation(this.program, "in_vertex");
        let tvertexAttributeLocation: number = this.gl.getAttribLocation(this.program, "in_tvertex");

        this.gl.enableVertexAttribArray(vertexAttributeLocation);
        this.gl.enableVertexAttribArray(tvertexAttributeLocation);

        this.vertexBuffer = this.gl.createBuffer();
        this.tvertexBuffer = this.gl.createBuffer();
        this.indexBuffer = this.gl.createBuffer();

        let size: number = 4 * 2 * 4;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.vertexAttribPointer(vertexAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, size * numberOfQuads, this.gl.DYNAMIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.tvertexBuffer);
        this.gl.vertexAttribPointer(tvertexAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, size * numberOfQuads, this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        let indices: number[] = [];
        let quad: number = 0;
        let vertex: number = 0;

        while (quad < numberOfQuads) {
            indices.push(vertex, vertex + 1, vertex + 2, vertex + 2, vertex + 3, vertex);
            ++quad;
            vertex += 4;
        }

        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int16Array(indices), this.gl.STATIC_DRAW);
    }

    begin(): void {
        this.gl.useProgram(this.program);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    }

    addQuad(quad: Quad): void {
        this.quads.push(quad);
        ++this.numberOfQuadsToRender;
    }

    end(): void {
        let size: number = 4 * 2 * 4;
        let offset: number = 0;

        for (let quad of this.quads) {
            quad.createVertices(this.vertices, offset, this.screenWidth, this.screenHeight);
            quad.createTVertices(this.tvertices, offset, this.textureWidth, this.textureHeight);

            offset += size;
        }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.vertices);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.tvertexBuffer);
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.tvertices);

        this.clearQuads();
    }

    render(): void {
        this.gl.clearColor(0.0, 1.0, 0.0, 0.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.drawElements(this.gl.TRIANGLES, 6 * this.numberOfQuadsToRender, this.gl.UNSIGNED_SHORT, 0);
        this.numberOfQuadsToRender = 0;
    }
}

let quadRenderer: QuadRenderer;
let quads: Quad[];

function loadImage(url: string): Promise < HTMLImageElement > {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        let image: HTMLImageElement = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.onerror = () => {
            reject("error");
        };
        image.src = url;
    });
}

function render() {
    for (let symbol of quads) {
        symbol.transform2Animator.animate();
    }


    quadRenderer.begin();
        quadRenderer.addQuad(quads[0]);
        quadRenderer.addQuad(quads[1]);
        quadRenderer.addQuad(quads[2]);
        quadRenderer.addQuad(quads[3]);
        quadRenderer.addQuad(quads[4]);
        quadRenderer.addQuad(quads[5]);
        quadRenderer.addQuad(quads[6]);
        quadRenderer.addQuad(quads[7]);
        quadRenderer.addQuad(quads[8]);
        quadRenderer.addQuad(quads[9]);
    quadRenderer.end();
    quadRenderer.render();

    requestAnimationFrame(() => { render(); });
}

function start(): void {
    quads = [];

    quads.push(new Quad(new Vector2(0.0, 0.0), 200.0, 200.0, Rectangle2.createFromLeftTopAndDimensions(new Vector2(0.0, 0.0), 256.0, 256.0)));
    quads.push(new Quad(new Vector2(300.0, 0.0), 200.0, 200.0, Rectangle2.createFromLeftTopAndDimensions(new Vector2(256.0, 0.0), 256.0, 256.0)));
    quads.push(new Quad(new Vector2(0.0, 0.0), 200.0, 200.0, Rectangle2.createFromLeftTopAndDimensions(new Vector2(512.0, 0.0), 256.0, 256.0)));
    quads.push(new Quad(new Vector2(0.0, 0.0), 200.0, 200.0, Rectangle2.createFromLeftTopAndDimensions(new Vector2(768.0, 0.0), 256.0, 256.0)));
    quads.push(new Quad(new Vector2(0.0, 0.0), 200.0, 200.0, Rectangle2.createFromLeftTopAndDimensions(new Vector2(1024.0, 0.0), 256.0, 256.0)));
    quads.push(new Quad(new Vector2(0.0, 0.0), 200.0, 200.0, Rectangle2.createFromLeftTopAndDimensions(new Vector2(0.0, 256.0), 256.0, 256.0)));
    quads.push(new Quad(new Vector2(0.0, 0.0), 200.0, 200.0, Rectangle2.createFromLeftTopAndDimensions(new Vector2(256.0, 256.0), 256.0, 256.0)));
    quads.push(new Quad(new Vector2(0.0, 0.0), 200.0, 200.0, Rectangle2.createFromLeftTopAndDimensions(new Vector2(512.0, 256.0), 256.0, 256.0)));
    quads.push(new Quad(new Vector2(0.0, 0.0), 200.0, 200.0, Rectangle2.createFromLeftTopAndDimensions(new Vector2(768.0, 256.0), 256.0, 256.0)));
    quads.push(new Quad(new Vector2(0.0, 0.0), 200.0, 200.0, Rectangle2.createFromLeftTopAndDimensions(new Vector2(1024.0, 256.0), 256.0, 256.0)));

    let screen: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("screen");
    let gl: WebGLRenderingContext = <WebGLRenderingContext>screen.getContext("webgl");

   screen.addEventListener("mousedown", (e) => {
        for (let symbol of quads) {
            if (symbol.containsMousePointer(new Vector2(e.x, e.y))) {
                /*symbol.pressed = true;
                symbol.anchor.x = e.clientX - symbol.position.x;
                symbol.anchor.y = e.clientY - symbol.position.y;*/
                symbol.transform2Animator.startAnimation();
            }
        }
    });
    /*
    screen.addEventListener("mouseup", (e) => {
        for (let symbol of quads) {
            symbol.pressed = false;
        }
    });

    screen.addEventListener("mousemove", (e) => {
        for (let symbol of quads) {
            if (symbol.pressed) {
                symbol.position.x = e.clientX - symbol.anchor.x;
                symbol.position.y = e.clientY - symbol.anchor.y;
            }
        }
    });
    */
    loadImage("symbols.png").then((image: HTMLImageElement) => {
        quadRenderer = new QuadRenderer(gl, screen.width, screen.height, image, 50);
        render();
   });


}
