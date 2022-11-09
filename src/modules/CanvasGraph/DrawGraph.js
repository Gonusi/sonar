class DrawGraph {
  constructor(canvas, ctx, orientation) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.orientation = orientation;
  }

  start(data) {
    const { ctx, canvas } = this;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.beginPath();

    if (this.orientation === "portrait") {
      const sliceLength = (canvas.height * 1.0) / data.length;
      let y = 0;

      for (let i = data.length; i > 0; i--) {
        const v = data[i];
        const x = (v * canvas.width) / 6; // TODO this could be better drawn as original value of v, and the modification done in dataPipeline

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        y += sliceLength;
      }
    } else {
      const sliceLength = (canvas.width * 1.0) / data.length;
      let x = 0;

      for (let i = 0; i < data.length; i++) {
        const v = data[i];
        const y = (v * canvas.height) / 6;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceLength;
      }
    }

    ctx.stroke();
  }
}

export default DrawGraph;
