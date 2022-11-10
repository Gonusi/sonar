class MarkMouseClickPosition {
  constructor(canvas, ctx, orientation, setLastDrawnGraphImageData) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.orientation = orientation;
    this.setLastDrawnGraphImageData = setLastDrawnGraphImageData;
  }

  start(x, y, resetImageData) {
    console.log("marking pos:", x, y);
    const { ctx, canvas, orientation } = this;
    // ctx.putImageData(resetImageData, 0, 0);

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

    this.setLastDrawnGraphImageData(
      ctx.getImageData(0, 0, canvas.width, canvas.height)
    );
  }
}

export default MarkMouseClickPosition;
