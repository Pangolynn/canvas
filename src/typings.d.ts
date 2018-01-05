/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// Added due to TypeScript missing these for Path2D
interface CanvasRenderingContext2D {
	clip(path: Path2D, fillRule?: CanvasFillRule): void;
  fill(path: Path2D, fillRule?: CanvasFillRule): void;
  isPointInPath(path: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;
  isPointInStroke(path: Path2D, x: number, y: number): boolean;
}


