import IndeterminateProgressBar from "./indeterminate-progress-bar.js";
export default class IndeterminateProgressBarSync extends IndeterminateProgressBar {
    constructor(length = IndeterminateProgressBar.DEFAULT_LENGTH, delay = IndeterminateProgressBar.DEFAULT_DELAY, blank = '▱', filled = '▰') {
        super(length, delay, blank, filled);
        this.length = length;
        this.delay = delay;
        this.blank = blank;
        this.filled = filled;
    }
    start(action) {
        super.start();
        setInterval(() => {
            this.consume(action);
        }, this.timeout);
    }
}
