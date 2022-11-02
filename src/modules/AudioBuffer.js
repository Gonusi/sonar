class AudioBuffer {
  constructor() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.reader = new FileReader();
  }

  fromBlob(blob) {
    return new Promise(async (resolve) => {
      const arrayBuffer = await blob.arrayBuffer();
      const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);

      this.arrayBuffer = arrayBuffer;
      this.audioBuffer = audioBuffer;

      resolve(audioBuffer);
    });
  }
}

export default AudioBuffer;
