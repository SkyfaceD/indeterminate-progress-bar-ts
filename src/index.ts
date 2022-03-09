import PulseIndeterminateProgressBar from './ipb/sync/pulse-indeterminate-progress-bar.js';
import './util/extensions.js';

const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const context = <CanvasRenderingContext2D> canvas.getContext("2d");

context.font = "24px serif";

function print(idx: number, progress: string, isDebug: boolean = true) {
    if (isDebug) console.log(`${idx}: ${progress}`);
    else console.log(progress);
}

function draw(progress: string) {
    let bar = context.measureText(progress);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(
        progress,
        canvas.width / 2 - bar.width / 2,
        canvas.height / 2
    );
}

function main() {
    let pipb = new PulseIndeterminateProgressBar();
    pipb.start((idx: number, progress: string) => {
        print(idx, progress);
        draw(progress);
    });
}

main();