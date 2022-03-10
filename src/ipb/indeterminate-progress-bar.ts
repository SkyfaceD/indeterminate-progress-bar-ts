import { LastProgress } from "../util/models.js";
import { Action } from "../util/types.js";

export default abstract class IndeterminateProgressBar {
    protected _isRunning: boolean = false;
    get isRunning(): boolean {
        return this._isRunning
    }
    
    private _lastProgress: LastProgress | null = null;
    protected get lastProgress(): LastProgress | null {
        return this._lastProgress
    }

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
        if (this._isRunning) throw new Error('Progress already running. You forgot to stop it?');

        this._isRunning = true;
    }

    stop(): void {
        this._isRunning = false;
    }

    protected saveProgress(idx: number, progress: string): void {
        this._lastProgress = new LastProgress(idx, progress);
    }

    protected clearProgress(): void {
        this._lastProgress = null;
    }

    /** Constanst */
    static readonly MIN_LENGTH = 3;
    static readonly MAX_LENGTH = 15;

    static readonly DEFAULT_LENGTH = 5;
    static readonly DEFAULT_DELAY = 300;
}