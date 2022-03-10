import IndeterminateProgressBar from "../indeterminate-progress-bar.js";
import { Action } from "../../util/types.js";

export default abstract class IndeterminateProgressBarSync extends IndeterminateProgressBar {
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

    protected abstract consume(action: Action): void

    start(action: Action) {
        super.start();
        this.consume(action);

        this.intervalId = setInterval(() => {
            this.consume(action);
        }, this.timeout);
    }

    stop() {
        super.stop();
        clearInterval(this.intervalId);

        this.intervalId = undefined;
    }

    protected saveTimeoutId(id: number) {
        this.timeouts.push(id);
    }

    protected clearTimeouts() {
        this.timeouts.forEach(it => {
            clearTimeout(it)
        });
        this.timeouts = [];
    }
}