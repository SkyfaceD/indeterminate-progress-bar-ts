export {};

declare global {
    interface String {
        replaceAt(idx: number, replacement: string): string;
    }
}

String.prototype.replaceAt = function (idx: number, replacement: string) {
    return (
        this.substring(0, idx) +
        replacement +
        this.substring(idx + replacement.length)
    );
};