import IndeterminateProgressBar from "../indeterminate-progress-bar.js";
import { Action } from "../../util/types.js";

export default abstract class IndeterminateProgressBarSync extends IndeterminateProgressBar {
    private timeoutId: number | undefined = undefined;
    private intervalId: number | undefined = undefined;
    private timeouts: Array<number> = [];

    constructor(
        readonly length: number = IndeterminateProgressBar.DEFAULT_LENGTH,
        readonly delay: number = IndeterminateProgressBar.DEFAULT_DELAY,
        protected readonly blank: string = '▱',
        protected readonly filled: string = '▰'
    ) {
        super(length, delay, blank, filled);
    }

    protected interval: number = this.length * this.delay;

    protected abstract consume(action: Action): void

    private consumer(action: Action) {
        this.consume((idx, progress) => {
            action(idx, progress);
            this.clearProgress(idx);
        });
    }

    start(action: Action) {
        super.start();
        this.consumer(action);

        this.timeoutId = setTimeout(() => {
            this.consumer(action);

            this.intervalId = setInterval(() => {
                this.consumer(action);
            }, this.interval);
        }, this.timeout())
    }

    stop() {
        super.stop();
        clearTimeout(this.timeoutId);
        clearInterval(this.intervalId);

        this.timeoutId = undefined;
        this.intervalId = undefined;
    }

    protected saveTimeoutId(id: number) {
        this.timeouts.push(id);
    }

    protected clearTimeouts() {
        this.timeouts.forEach(clearTimeout);
        this.timeouts = [];
    }
}