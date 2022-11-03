class CanvasGraph {
  constructor(canvasEl) {
    this.canvasEl = canvasEl;
    this.canvasCtx = canvasEl.getContext("2d");
  }

  draw = (normalizedData) => {
    const { canvasEl, canvasCtx } = this;
    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    canvasCtx.beginPath();

    const sliceWidth = (canvasEl.width * 1.0) / normalizedData.length;
    let x = 0;

    for (let i = 0; i < normalizedData.length; i++) {
      const v = normalizedData[i];
      const y = (v * canvasEl.height) / 6 + canvasEl.height / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvasEl.width, canvasEl.height / 2);
    canvasCtx.stroke();
  };
}

export default CanvasGraph;
