import Wait from "./Wait";
import AudioFile from "./AudioFile";

const FILE = "chirps/chirp_0001.ogg";

class Ping {
  #audioFile;
  #wait;

  constructor() {
    this.#audioFile = null;
    this.#loadPingAudioFile();
    this.isFileLoading = true;
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.#wait = new Wait();
  }

  #loadPingAudioFile = async () => {
    this.#audioFile = new AudioFile();
    await this.#audioFile.fetch(FILE);
    this.isFileLoading = false;
  };

  start = async (delayMS) => {
    if (!this.#audioFile.audioBuffer) return;
    if (delayMS) await this.#wait.now(delayMS);
    const { audioCtx } = this;

    const source = audioCtx.createBufferSource();
    source.buffer = this.#audioFile.audioBuffer;
    source.connect(audioCtx.destination);
    source.start(audioCtx.currentTime);
  };
}

export default Ping;
