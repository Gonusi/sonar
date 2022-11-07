import AudioConverter from "./AudioConverter";

class AudioFile {
  #audioConverter;

  constructor() {
    this.audioBuffer = null;
    this.arrayBuffer = null;
    this.#audioConverter = new AudioConverter();
  }

  fetch = async (URL) => {
    let blob = null;
    try {
      const response = await fetch(URL);
      blob = await response.blob();
    } catch (e) {
      alert("Error while loading audio file for ping");
    }
    const { audioBuffer, arrayBuffer } = await this.#audioConverter.fromBlob(
      blob
    );
    this.audioBuffer = audioBuffer;
    this.arrayBuffer = arrayBuffer;
  };
}

export default AudioFile;
