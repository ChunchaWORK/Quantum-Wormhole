// https://github.com/AdhesionTek/Quantum-Wormhole/blob/main/index.mjs
// (modified)

const CURVE_NUMBER: number = 1024;

export class WormholeCanvas {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    seed: number

    constructor(selector: string = "canvas") {
        this.canvas = document.querySelector(selector)!;
        this.ctx = this.canvas.getContext("2d")!;
        this.seed = 1;
        return;
    }

    #getRandomBase() {
        let x = Math.sin(this.seed) * 10000;
        return x - Math.floor(x);
    }

    #getRandomInt(max: number, min: number = 0) {
        const val = Math.floor(this.#getRandomBase() * max) + min;
        this.seed++;

        return val;
    }

    wormhole() {
        const HEIGHT = this.canvas.height;
        const WIDTH = this.canvas.width;

        this.ctx.fillStyle = 'rgba(0,0,0,0)';
        this.ctx.fillRect(0, 0, HEIGHT, WIDTH);
        for (let index = 0; index < CURVE_NUMBER; index++) {
            this.ctx.strokeStyle = `rgb(
              ${Math.floor((255 * index) / CURVE_NUMBER)},
              ${Math.floor((255 * index) / CURVE_NUMBER)},
              ${Math.floor((255 * index) / CURVE_NUMBER)})`;
            this.ctx.beginPath();
            this.ctx.moveTo(this.#getRandomInt(WIDTH), this.#getRandomInt(HEIGHT));
            this.ctx.bezierCurveTo(
                WIDTH / 2 + this.#getRandomInt(100) - 50,
                HEIGHT / 2 + this.#getRandomInt(50) - 50,
                WIDTH / 2 + this.#getRandomInt(100) - 50,
                HEIGHT / 2 + this.#getRandomInt(50) - 50,
                this.#getRandomInt(WIDTH),
                this.#getRandomInt(HEIGHT)
            );
            this.ctx.stroke();
        }
        return;
    }
}
