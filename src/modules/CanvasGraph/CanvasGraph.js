import DrawGraph from "./DrawGraph";
import DrawCursorPosition from "./DrawCursorPosition";
import DrawTickMarks from "./DrawTickMarks";

class CanvasGraph {
  #drawGraph;
  #drawTickMarks;

  constructor(canvas, tickMarkCount, orientation = "portrait") {
    const ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.ctx = ctx;
    this.lastDrawnGraphImageData = null;
    this.mousePos = { x: null, y: null };
    this.#drawGraph = new DrawGraph(canvas, ctx, orientation);
    this.#drawTickMarks = new DrawTickMarks(
      canvas,
      ctx,
      orientation,
      tickMarkCount
    );

    const drawCursorPosition = new DrawCursorPosition(canvas, ctx, orientation);
    this.canvas.addEventListener("mousemove", (e) => {
      const { x, y } = this.#getMousePosition(e);
      drawCursorPosition.start(x, y, this.lastDrawnGraphImageData);
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
    const { canvas, ctx } = this;
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
}

export default CanvasGraph;
