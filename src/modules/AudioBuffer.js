class AudioBuffer {
  constructor(blob) {
    console.log("AudioBuffer received blob:", blob);
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.reader = new FileReader();

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
