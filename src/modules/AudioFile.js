import AudioConverter from "./AudioConverter";

class AudioFile {
  #audioConverter;

  constructor() {
    this.audioBuffer = null;
    this.arrayBuffer = null;
    this.#audioConverter = new AudioConverter();
  }

  fetch = async (URL) => {
    const response = await fetch(URL);
    const blob = await response.blob();
    const { audioBuffer, arrayBuffer } = await this.#audioConverter.fromBlob(
      blob
    );
    this.audioBuffer = audioBuffer;
    this.arrayBuffer = arrayBuffer;
  };
}

export default AudioFile;
