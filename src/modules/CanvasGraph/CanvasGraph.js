import DrawGraph from "./DrawGraph";
import DrawCursorPosition from "./DrawCursorPosition";
import DrawTickMarks from "./DrawTickMarks";
import MarkMouseClickPosition from "./MarkMouseClickPosition";

class CanvasGraph {
  #drawGraph;
  #drawTickMarks;
  #markMouseClickPosition;

  constructor(canvas, tickMarkCount, orientation = "portrait") {
    const ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.ctx = ctx;
    this.lastDrawnGraphImageData = null;
    this.lastMouseClickPosition = null;
    this.mousePos = { x: null, y: null };
    this.#drawTickMarks = new DrawTickMarks(
      canvas,
      ctx,
      orientation,
      tickMarkCount
    );
    this.#drawGraph = new DrawGraph(canvas, ctx, orientation);
    this.#markMouseClickPosition = new MarkMouseClickPosition(
      canvas,
      ctx,
      orientation,
      this.setLastDrawnGraphImageData
    );
    const drawCursorPosition = new DrawCursorPosition(
      canvas,
      ctx,
      orientation,
      tickMarkCount
    );
    this.canvas.addEventListener("mousemove", (e) => {
      const { x, y } = this.#getMousePosition(e);
      drawCursorPosition.start(x, y, this.lastDrawnGraphImageData);
    });
    this.canvas.addEventListener("click", (e) => {
      const { x, y } = this.#getMousePosition(e);
      this.lastMouseClickPosition = { x, y };
      this.#markMouseClickPosition.start(x, y);
    });
  }

  #getMousePosition(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  draw(normalizedData) {
    const { canvas, ctx, lastMouseClickPosition } = this;
    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.#drawGraph.start(normalizedData);
    this.#drawTickMarks.start();
    this.lastDrawnGraphImageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  setLastDrawnGraphImageData(data) {
    this.lastDrawnGraphImageData = data;
  }
}

export default CanvasGraph;
