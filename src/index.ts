import IndeterminateProgressBar from './ipb/indeterminate-progress-bar.js';
import PulseIndeterminateProgressBar from './ipb/sync/pulse-indeterminate-progress-bar.js';
import StandardIndeterminateProgressBar from './ipb/sync/standard-indeterminate-progress-bar.js';
import WaveIndeterminateProgressBar from './ipb/sync/wave-indeterminate-progress-bar.js';
import { Holder } from './util/models.js';
import { RotationSide } from './util/enums.js';
import './util/extensions.js';
import IndeterminateProgressBarSync from './ipb/sync/indeterminate-progress-bar.js';

function createHolders(bars: Array<IndeterminateProgressBar>): Array<Holder> {
    let result = [];
    for (let i = 0; i < bars.length; i++) {
        let canvas = document.createElement('canvas');
        canvas.width = 250;
        canvas.height = 50;

        result.push(new Holder(bars[i], canvas));
    }
    return result;
}

function setupCanvas(holder: Holder) {
    holder.context.font = '24px serif';

    holder.canvas.onclick = () => {
        if (holder.bar.isRunning) holder.bar.stop();
        else start(holder);
    }
}

function start(holder: Holder) {
    holder.bar.start((idx, progress) => {
        if (holder.bar instanceof PulseIndeterminateProgressBar) print(idx, progress, true);
        // if (holder.bar instanceof StandardIndeterminateProgressBar) print(idx, progress, true);
        // if (holder.bar instanceof WaveIndeterminateProgressBar) print(idx, progress, true);
        draw(holder, progress);
    });
}

function print(idx: number, progress: string, isDebug: boolean = false) {
    if (isDebug) console.log(`${idx}: ${progress}`);
    else console.log(progress);
}

function draw(holder: Holder, progress: string) {
    let bar = holder.context.measureText(progress);
    holder.context.clearRect(0, 0, holder.canvas.width, holder.canvas.height);
    holder.context.fillStyle = '#9D6CD9';
    holder.context.fillRoundRect(0, 0, holder.canvas.width, holder.canvas.height, 8);
    holder.context.fillStyle = '#F2F2AA';
    holder.context.fillText(
        progress,
        holder.canvas.width / 2 - bar.width / 2,
        holder.canvas.height / 2 + 5
    );
}

function main() {
    let bars: Array<IndeterminateProgressBarSync> = [
        new PulseIndeterminateProgressBar(),
        new StandardIndeterminateProgressBar(),
        new WaveIndeterminateProgressBar(),
    ];
    let holders = createHolders(bars);

    holders.forEach(it => {
        setupCanvas(it);
        start(it);
    });

    const scale = 1

    const box = {
        width: holders[0].canvas.width,
        height: holders[0].canvas.height
    }

    let canvas = document.createElement('canvas');
    canvas.width = 500 * scale * 1.5;
    canvas.height = 500 * scale * 1.5;

    document.body.appendChild(canvas);

    const center = {
        x: canvas.width / 2,
        y: canvas.height / 2
    }

    let context = canvas.getContext('2d')!;
    context.strokeStyle = "#FF0000";
    context.lineWidth = 5;
    context.font = '24px serif';

    const radius = box.width / 2 + box.height / 2;
    const time = Date.now();

    function drawCircle(
        holders: Array<Holder>,
        speed: number = 1,
        rotationSide: RotationSide = RotationSide.Clockwise
    ) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.save();
        context.translate(center.x, center.y);
        context.scale(scale, scale);

        context.strokeStyle = '#FF0000'
        context.beginPath();
        context.arc(0, 0, radius, 0, Math.PI * 2);
        context.stroke();

        let frameSpeed = (speed / 1000) * (time - Date.now());
        for (let i = 0; i < holders.length; i++) {
            let angle = (i * 2 * Math.PI / holders.length) + frameSpeed;
            let x = Math.cos(angle * rotationSide) * radius - (box.width / 2);
            let y = Math.sin(angle * rotationSide) * radius - (box.height / 2);

            context.drawImage(holders[i].canvas, x, y)
        }
        context.restore();

        window.requestAnimationFrame(() => { drawCircle(holders, speed, rotationSide) });
    }

    window.requestAnimationFrame(() => { drawCircle(holders) });
}

main();