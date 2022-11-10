import DrawGraph from "./DrawGraph";
import DrawCursorPosition from "./DrawCursorPosition";
import DrawTickMarks from "./DrawTickMarks";
import MarkMouseClickPosition from "./MarkMouseClickPosition";

class CanvasGraph {
  #drawGraph;
  #drawTickMarks;
  #markMouseClickPosition;
  #drawCursorPosition;

  constructor(canvas, tickMarkCount, orientation = "portrait") {
    const ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.ctx = ctx;
    this.lastDrawnData = null;
    this.lastMouseClickPos = null;
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
      orientation
    );
    this.#drawCursorPosition = new DrawCursorPosition(
      canvas,
      ctx,
      orientation,
      tickMarkCount
    );
    this.canvas.addEventListener("mousemove", (e) => {
      const { x, y } = this.#getMousePosition(e);
      this.mousePos = { x, y };
      this.draw(this.lastDrawnData);
    });
    this.canvas.addEventListener("click", (e) => {
      const { x, y } = this.#getMousePosition(e);
      this.lastMouseClickPos = { x, y };
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
    this.lastDrawnData = normalizedData;
    const { canvas, ctx, mousePos, lastMouseClickPos } = this;
    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.#drawGraph.start(normalizedData);
    this.#drawTickMarks.start();
    this.#drawCursorPosition.start(mousePos.x, mousePos.y);
    if (lastMouseClickPos) {
      this.#markMouseClickPosition.start(
        lastMouseClickPos.x,
        lastMouseClickPos.y
      );
    }
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
