String.prototype.replaceAt = function (idx, replacement) {
    return (this.substring(0, idx) +
        replacement +
        this.substring(idx + replacement.length));
};
export {};
