var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import IndeterminateProgressBar from "../indeterminate-progress-bar.js";
export default class IndeterminateProgressBarAsync extends IndeterminateProgressBar {
    constructor(length = IndeterminateProgressBar.DEFAULT_LENGTH, delay = IndeterminateProgressBar.DEFAULT_DELAY, blank = '▱', filled = '▰') {
        super(length, delay, blank, filled);
        this.length = length;
        this.delay = delay;
        this.blank = blank;
        this.filled = filled;
    }
    start(action) {
        const _super = Object.create(null, {
            start: { get: () => super.start }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.start.call(this);
            while (this.isRunning) {
                this.consume(action);
                yield new Promise(res => setTimeout(res, this.timeout));
            }
        });
    }
}
