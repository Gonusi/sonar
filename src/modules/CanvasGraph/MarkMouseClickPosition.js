class MarkMouseClickPosition {
  constructor(canvas, ctx, orientation) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.orientation = orientation;
  }

  start(x, y) {
    console.log("marking pos:", x, y);
    const { ctx, canvas, orientation } = this;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(0, 255, 0)";
    ctx.fillStyle = "rgb(0, 0, 0)";

    ctx.beginPath();
    if (orientation === "portrait") {
      ctx.moveTo(200, y);
      ctx.lineTo(canvas.width, y);
    } else {
      ctx.moveTo(x, 200);
      ctx.lineTo(x, canvas.height);
    }

    ctx.stroke();
  }
}

export default MarkMouseClickPosition;
