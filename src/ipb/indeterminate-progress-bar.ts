import { Action } from "../util/types";

export default abstract class IndeterminateProgressBar {
    protected isRunning: boolean = false;

    constructor(
        readonly length: number = IndeterminateProgressBar.DEFAULT_LENGTH,
        readonly delay: number = IndeterminateProgressBar.DEFAULT_DELAY,
        protected readonly blank: string = '▱',
        protected readonly filled: string = '▰'
    ) {
        if (length < IndeterminateProgressBar.MIN_LENGTH) throw new Error(`Passed length < min length: ${length} < ${IndeterminateProgressBar.MIN_LENGTH}`);
        if (length > IndeterminateProgressBar.MAX_LENGTH) throw new Error(`Passed length > max length: ${length} > ${IndeterminateProgressBar.MAX_LENGTH}`);
    }

    protected timeout: number = this.length * this.delay;

    protected half: number = this.length / 2;

    protected blankProgress: string = this.blank.repeat(this.length);
    protected filledProgress: string = this.filled.repeat(this.length);

    start(action?: Action): void {
        this.isRunning = true;
    }

    stop() {
        this.isRunning = false;
    }

    /** Constanst */
    static readonly MIN_LENGTH = 3;
    static readonly MAX_LENGTH = 15;

    static readonly DEFAULT_LENGTH = 5;
    static readonly DEFAULT_DELAY = 300;
}