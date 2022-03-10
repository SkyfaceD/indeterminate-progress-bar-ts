import IndeterminateProgressBarSync from "./indeterminate-progress-bar.js";
import { Action } from '../../util/types.js'

export default class WaveIndeterminateProgressBar extends IndeterminateProgressBarSync {
    constructor(
        readonly length: number = 7,
        readonly delay: number = 100,
        protected readonly blank: string = '▱',
        protected readonly filled: string = '▰'
    ) {
        super(length, delay, blank, filled);
    }

    protected override timeout: number = this.length * 2 * this.delay;

    /**
     * Animation phases:
     * 0: ▰▱▱▱▱▱▱
     * 1: ▰▰▱▱▱▱▱
     * 2: ▰▰▰▱▱▱▱
     * 3: ▰▰▰▰▱▱▱
     * 4: ▰▰▰▰▰▱▱
     * 5: ▰▰▰▰▰▰▱
     * 6: ▰▰▰▰▰▰▰
     * 7: ▱▰▰▰▰▰▰
     * 8: ▱▱▰▰▰▰▰
     * 9: ▱▱▱▰▰▰▰
     * 10: ▱▱▱▱▰▰▰
     * 11: ▱▱▱▱▱▰▰
     * 12: ▱▱▱▱▱▱▰
     * 13: ▱▱▱▱▱▱▱
     */
    protected override consume(action: Action) {
        let progress = this.blankProgress

        for (let i = 0; i < this.length * 2; i++) {
            setTimeout(() => {
                if (i < this.length) progress = progress.replaceFirst(this.blank, this.filled)
                else progress = progress.replaceFirst(this.filled, this.blank)
                action(i, progress);
            }, i * this.delay);
        }
    }
}