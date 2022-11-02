class AudioBuffer {
  constructor(blob) {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.reader = new FileReader();

    return new Promise(async (resolve) => {
      const arrayBuffer = await blob.arrayBuffer();
      const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
      resolve(audioBuffer);
    });
  }
}

export default AudioBuffer;
