import IndeterminateProgressBarSync from './indeterminate-progress-bar.js';
import { Action } from '../../util/types.js'

export default class StandardIndeterminateProgressBar extends IndeterminateProgressBarSync {
    constructor(
        length = 5,
        delay = 150,
        blank = '▱',
        filled = '▰',
    ) {
        super(length, delay, blank, filled);
    }

    protected consume(action: Action) {
        for (let i = 0; i < this.length; i++) {
            setTimeout(() => {
                let progress = this.blankProgress.replaceAt(i, this.filled)
                action(i, progress);
            }, i * this.delay);
        }
    }
};