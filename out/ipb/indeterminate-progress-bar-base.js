export default class IndeterminateProgressBarBase {
    constructor(length = IndeterminateProgressBarBase.DEFAULT_LENGTH, delay = IndeterminateProgressBarBase.DEFAULT_DELAY, blank = '▱', filled = '▰') {
        this.length = length;
        this.delay = delay;
        this.blank = blank;
        this.filled = filled;
        this.isRunning = false;
        this.timeout = this.length * this.delay;
        this.half = this.length / 2;
        this.blankProgress = this.blank.repeat(this.length);
        this.filledProgress = this.filled.repeat(this.length);
        if (length < IndeterminateProgressBarBase.MIN_LENGTH)
            throw new Error(`Passed length < min length: ${length} < ${IndeterminateProgressBarBase.MIN_LENGTH}`);
        if (length > IndeterminateProgressBarBase.MAX_LENGTH)
            throw new Error(`Passed length > max length: ${length} > ${IndeterminateProgressBarBase.MAX_LENGTH}`);
    }
    start(action) {
        this.isRunning = true;
    }
    stop() {
        this.isRunning = false;
    }
}
/** Constanst */
IndeterminateProgressBarBase.MIN_LENGTH = 3;
IndeterminateProgressBarBase.MAX_LENGTH = 15;
IndeterminateProgressBarBase.DEFAULT_LENGTH = 5;
IndeterminateProgressBarBase.DEFAULT_DELAY = 300;
