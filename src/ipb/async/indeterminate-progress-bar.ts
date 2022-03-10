import IndeterminateProgressBar from "../indeterminate-progress-bar.js";
import { Action } from "../../util/types";

export default abstract class IndeterminateProgressBarAsync extends IndeterminateProgressBar {
    constructor(
        readonly length: number = IndeterminateProgressBar.DEFAULT_LENGTH,
        readonly delay: number = IndeterminateProgressBar.DEFAULT_DELAY,
        protected readonly blank: string = '▱',
        protected readonly filled: string = '▰'
    ) {
        super(length, delay, blank, filled);
    }

    protected abstract consume(action: Action): Promise<void>

    async start(action: Action) {
        super.start()
        while(this.isRunning) {
            this.consume(action);
            await new Promise(res => setTimeout(res, this.timeout));
        }
    }
}