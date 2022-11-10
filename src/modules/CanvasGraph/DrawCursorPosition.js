class DrawCursorPosition {
  constructor(canvas, ctx, orientation, tickMarkCount, unit = "meter") {
    this.canvas = canvas;
    this.ctx = ctx;
    this.orientation = orientation;
    this.tickMarkCount = tickMarkCount;
    this.unit = unit;
  }

  start(x, y, resetImageData) {
    const { ctx, canvas, tickMarkCount, orientation, unit } = this;
    // ctx.putImageData(resetImageData, 0, 0);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.font = "16px sans-serif";

    const pixelsPerTick = tickMarkCount / canvas.height;
    const hoveredTick = (
      pixelsPerTick *
      (orientation === "portrait" ? canvas.height - y : canvas.width - x)
    ).toFixed(2);

    ctx.beginPath();
    if (orientation === "portrait") {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.fillText(`${hoveredTick} ${unit}`, canvas.width / 2, y - 20); // TODO font size non responsive ?
    } else {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.fillText(`${hoveredTick} ${unit}`, canvas.width / 2, y - 20); // TODO font size non responsive ?
    }

    ctx.stroke();
  }
}

export default DrawCursorPosition;
