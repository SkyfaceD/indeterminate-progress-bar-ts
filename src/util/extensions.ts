export { };

declare global {
    interface String {
        replaceAt(idx: number, replacement: string): string;

        replaceFirst(oldString: string, newString: string): string;
    }
}

String.prototype.replaceAt = function (idx: number, replacement: string) {
    return (
        this.substring(0, idx) +
        replacement +
        this.substring(idx + replacement.length)
    );
};

String.prototype.replaceFirst = function (oldString: string, newString: string) {
    let idx = this.indexOf(oldString);
    return this.replaceAt(idx, newString);
}