import PulseIndeterminateProgressBar from './ipb/sync/pulse-indeterminate-progress-bar.js';
import './util/extensions.js';
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.font = "24px serif";
function print(idx, progress, isDebug = true) {
    if (isDebug)
        console.log(`${idx}: ${progress}`);
    else
        console.log(progress);
}
function draw(progress) {
    let bar = context.measureText(progress);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(progress, canvas.width / 2 - bar.width / 2, canvas.height / 2);
}
function main() {
    let pipb = new PulseIndeterminateProgressBar();
    pipb.start((idx, progress) => {
        print(idx, progress);
        draw(progress);
    });
}
main();
