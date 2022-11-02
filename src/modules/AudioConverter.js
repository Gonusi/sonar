class AudioConverter {
  constructor() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.reader = new FileReader();
    this.arrayBuffer = null;
    this.audioBuffer = null;
  }

  fromBlob(blob) {
    return new Promise(async (resolve) => {
      const arrayBuffer = await blob.arrayBuffer();
      const arrayBufferCopy = arrayBuffer.slice();
      const audioBuffer = await this.audioCtx.decodeAudioData(arrayBufferCopy);

      this.arrayBuffer = arrayBuffer;
      this.audioBuffer = audioBuffer;

      resolve({ audioBuffer, arrayBuffer });
    });
  }
}

export default AudioConverter;
