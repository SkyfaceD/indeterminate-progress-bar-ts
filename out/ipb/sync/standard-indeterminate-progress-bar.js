import IndeterminateProgressBarSync from './indeterminate-progress-bar.js';
export default class StandardIndeterminateProgressBar extends IndeterminateProgressBarSync {
    constructor(length = 5, delay = 150, blank = '▱', filled = '▰') {
        super(length, delay, blank, filled);
    }
    consume(action) {
        for (let i = 0; i < this.length; i++) {
            setTimeout(() => {
                let progress = this.blankProgress.replaceAt(i, this.filled);
                action(i, progress);
            }, i * this.delay);
        }
    }
}
;
