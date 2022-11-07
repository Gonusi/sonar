class CanvasGraph {
  constructor(canvasEl) {
    this.canvasEl = canvasEl;
    this.canvasCtx = canvasEl.getContext("2d");
    this.canvasEl.addEventListener("mousemove", (e) =>
      this.#handleMouseMove(e, this.canvasCtx)
    );
  }

  #handleMouseMove(e, canvasCtx) {
    console.log("e");

    const x = e.clientX - this.offsetLeft;
    const y = e.clientY - this.offsetTop;

    canvasCtx.lineWidth = 1;
    canvasCtx.strokeStyle = "rgb(255, 0, 0)";
    canvasCtx.beginPath();

    canvasCtx.moveTo(x, y);
    canvasCtx.lineTo(x, 0);
    canvasCtx.stroke();
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
  }
}

export default CanvasGraph;
