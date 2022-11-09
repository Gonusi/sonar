class DrawCursorPosition {
  constructor(canvas, ctx, orientation) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.orientation = orientation;
  }

  start(x, y, resetImageData) {
    const { ctx, canvas } = this;
    ctx.putImageData(resetImageData, 0, 0);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(255, 0, 0)";

    ctx.beginPath();
    if (this.orientation === "portrait") {
      ctx.moveTo(0, y);
      ctx.lineTo(this.canvas.width, y);
    } else {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.canvas.height);
    }

    ctx.stroke();
  }
}

export default DrawCursorPosition;
