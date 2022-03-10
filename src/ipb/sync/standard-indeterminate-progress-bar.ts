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
     * 0:   ▰▱▱▱▱
     * 1:   ▱▰▱▱▱
     * 2:   ▱▱▰▱▱
     * 3:   ▱▱▱▰▱
     * 4:   ▱▱▱▱▰
     */
    protected override consume(action: Action) {
        let idx = this.lastProgress == null ? 0 : this.lastProgress?.idx;
        this.clearProgress();

        for (let i = idx; i < this.length; i++) {
            this.saveTimeoutId(
                setTimeout(() => {
                    if (!this.isRunning) {
                        this.saveProgress(i, this.blankProgress.replaceAt(i, this.filled))
                        this.clearTimeouts()
                        return
                    }
                    
                    let progress = this.blankProgress.replaceAt(i, this.filled);

                    action(i, progress);
                }, i * this.delay)
            );
        }
    }
};