interface String {
    replaceAt(idx: number, replacement: string): string;

    replaceFirst(oldString: string, newString: string): string;
}

interface CanvasRenderingContext2D {
    fillRoundRect(x: number, y: number, width: number, height: number, radius: number): void;
}