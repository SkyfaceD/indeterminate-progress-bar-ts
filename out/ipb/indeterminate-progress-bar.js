export default class IndeterminateProgressBar {
    constructor(length = IndeterminateProgressBar.DEFAULT_LENGTH, delay = IndeterminateProgressBar.DEFAULT_DELAY, blank = '▱', filled = '▰') {
        this.length = length;
        this.delay = delay;
        this.blank = blank;
        this.filled = filled;
        this.isRunning = false;
        this.timeout = this.length * this.delay;
        this.half = this.length / 2;
        this.blankProgress = this.blank.repeat(this.length);
        this.filledProgress = this.filled.repeat(this.length);
        if (length < IndeterminateProgressBar.MIN_LENGTH)
            throw new Error(`Passed length < min length: ${length} < ${IndeterminateProgressBar.MIN_LENGTH}`);
        if (length > IndeterminateProgressBar.MAX_LENGTH)
            throw new Error(`Passed length > max length: ${length} > ${IndeterminateProgressBar.MAX_LENGTH}`);
    }
    start(action) {
        this.isRunning = true;
    }
    stop() {
        this.isRunning = false;
    }
}
/** Constanst */
IndeterminateProgressBar.MIN_LENGTH = 3;
IndeterminateProgressBar.MAX_LENGTH = 15;
IndeterminateProgressBar.DEFAULT_LENGTH = 5;
IndeterminateProgressBar.DEFAULT_DELAY = 300;
