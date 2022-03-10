export class Holder {
    constructor(bar, canvas, context = canvas.getContext('2d')) {
        this.bar = bar;
        this.canvas = canvas;
        this.context = context;
    }
}
