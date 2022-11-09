class DrawTickMarks {
  constructor(canvas, ctx, orientation, tickMarkCount) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.orientation = orientation;
    this.tickMarkCount = tickMarkCount;
  }

  start() {
    const { ctx, canvas, tickMarkCount } = this;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.beginPath();

    if (this.orientation === "portrait") {
      for (let i = 0; i < canvas.height; i += canvas.height / tickMarkCount) {
        ctx.moveTo(canvas.width - 20, i);
        ctx.lineTo(canvas.width, i);
      }
    } else {
      for (let i = 0; i < canvas.width; i += canvas.width / tickMarkCount) {
        ctx.moveTo(i, canvas.height);
        ctx.lineTo(i, canvas.height - 20);
      }
    }
    ctx.stroke();
  }
}

export default DrawTickMarks;
