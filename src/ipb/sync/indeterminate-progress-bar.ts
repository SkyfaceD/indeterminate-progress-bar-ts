import IndeterminateProgressBar from "../indeterminate-progress-bar.js";
import { Action } from "../../util/types";

export default abstract class IndeterminateProgressBarSync extends IndeterminateProgressBar {
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
        setInterval(() => {
            this.consume(action);
        }, this.timeout);
    }
}