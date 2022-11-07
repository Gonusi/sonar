class CanvasGraph {
  constructor(canvasEl) {
    this.canvasEl = canvasEl;
    this.canvasCtx = canvasEl.getContext("2d");
    this.canvasEl.addEventListener("mousemove", (e) =>
      this.#handleMouseMove(e, this.canvasCtx)
    );
    this.lastDrawnGraphImageData = null;
  }

  #eraseMouseArtifacts() {}

  #handleMouseMove(e, canvasCtx) {
    const { x, y } = this.#getMousePosition(e);
    canvasCtx.putImageData(this.lastDrawnGraphImageData, 0, 0);

    canvasCtx.lineWidth = 1;
    canvasCtx.strokeStyle = "rgb(255, 0, 0)";

    canvasCtx.beginPath();
    canvasCtx.moveTo(x, 0);
    canvasCtx.lineTo(x, this.canvasEl.height);
    canvasCtx.stroke();
  }

  #getMousePosition(e) {
    const rect = this.canvasEl.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  draw(normalizedData) {
    const { canvasEl, canvasCtx } = this;
    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    canvasCtx.lineWidth = 1;
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

    canvasCtx.stroke();

    // if whole canvas is 10 meters (20m of distance travelled)...
    for (let i = 0; i < canvasEl.width; i += canvasEl.width / 10) {
      canvasCtx.moveTo(i, canvasEl.height);
      canvasCtx.lineTo(i, canvasEl.height - 20);
    }

    canvasCtx.stroke();
    this.lastDrawnGraphImageData = canvasCtx.getImageData(
      0,
      0,
      canvasEl.width,
      canvasEl.height
    );
  }
}

export default CanvasGraph;
