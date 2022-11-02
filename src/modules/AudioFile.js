import AudioBuffer from "./AudioBuffer";

class AudioFile {
  #audioBuffer;

  constructor() {
    this.audioBuffer = null;
    this.arrayBuffer = null;
    this.#audioBuffer = new AudioBuffer();
  }

  fetch = async (URL) => {
    const blob = await fetch(URL);
    console.log("blob", blob);
    const { audioBuffer, arrayBuffer } = await this.audioBuffer.fromBlob(blob);
    console.log("audioBuffer", audioBuffer);
  };
}
