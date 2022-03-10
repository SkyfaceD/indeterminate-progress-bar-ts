import IndeterminateProgressBarSync from './indeterminate-progress-bar.js';
import { Action } from '../../util/types.js'

export default class StandardIndeterminateProgressBar extends IndeterminateProgressBarSync {
    constructor(
        readonly length: number = 5,
        readonly delay: number = 100,
        protected readonly blank: string = '▱',
        protected readonly filled: string = '▰'
    ) {
        super(length, delay, blank, filled);
    }

    /**
     * Animation phases:
     * 0: ▰▱▱▱▱
     * 1: ▱▰▱▱▱
     * 2: ▱▱▰▱▱
     * 3: ▱▱▱▰▱
     * 4: ▱▱▱▱▰
     */
    protected override consume(action: Action) {
        for (let i = 0; i < this.length; i++) {
            setTimeout(() => {
                let progress = this.blankProgress.replaceAt(i, this.filled)
                action(i, progress);
            }, i * this.delay);
        }
    }
};