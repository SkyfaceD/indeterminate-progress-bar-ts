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
};

CanvasRenderingContext2D.prototype.fillRoundRect = function(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
) {
    let rad = { tl: radius, tr: radius, br: radius, bl: radius }
    this.beginPath();
    this.moveTo(x + rad.tl, y);
    this.lineTo(x + width - rad.tr, y);
    this.quadraticCurveTo(x + width, y, x + width, y + rad.tr);
    this.lineTo(x + width, y + height - rad.br);
    this.quadraticCurveTo(x + width, y + height, x + width - rad.br, y + height);
    this.lineTo(x + rad.bl, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - rad.bl);
    this.lineTo(x, y + rad.tl);
    this.quadraticCurveTo(x, y, x + rad.tl, y);
    this.closePath();
    this.fill();
};
