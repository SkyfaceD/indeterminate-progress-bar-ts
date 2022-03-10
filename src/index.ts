import IndeterminateProgressBar from './ipb/indeterminate-progress-bar.js';
import PulseIndeterminateProgressBar from './ipb/sync/pulse-indeterminate-progress-bar.js';
import StandardIndeterminateProgressBar from './ipb/sync/standard-indeterminate-progress-bar.js';
import './util/extensions.js';
import { Holder as Holder } from './util/models.js';

function print(idx: number, progress: string, isDebug: boolean = true) {
    if (isDebug) console.log(`${idx}: ${progress}`);
    else console.log(progress);
}

function draw(holder: Holder, progress: string) {
    let bar = holder.context.measureText(progress);
    holder.context.clearRect(0, 0, holder.canvas.width, holder.canvas.height);
    holder.context.fillText(
        progress,
        holder.canvas.width / 2 - bar.width / 2,
        holder.canvas.height / 2
    );
}

function createHolders(bars: Array<IndeterminateProgressBar>): Array<Holder> {
    let result = [];
    for (let i = 0; i < bars.length; i++) {
        let div = document.createElement('div');
        let canvas = document.createElement('canvas');

        canvas.width = 225;
        canvas.height = 125;

        div.id = "main-div"
        div.appendChild(canvas);

        document.body.appendChild(div);

        result.push(new Holder(bars[i], canvas));
    }
    return result;
}

function main() {
    let bars: Array<IndeterminateProgressBar> = [
        new PulseIndeterminateProgressBar(),
        new StandardIndeterminateProgressBar()
    ];
    let holders: Array<Holder> = createHolders(bars);

    holders.forEach(it => {
        it.context.font = '24px serif';

        it.bar.start((idx, progress) => {
            draw(it, progress);
        });
    });
}

main();