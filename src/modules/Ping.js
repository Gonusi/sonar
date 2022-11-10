import Wait from "./Wait";
import AudioFile from "./AudioFile";

const FILE = "chirps/chirp_48000_80samples_square.ogg";

class Ping {
  #wait;
  #audioCtx;

  constructor() {
    this.audioFile = null;
    this.#loadPingAudioFile();
    this.isFileLoading = true;
    this.#audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.#wait = new Wait();
  }

  #loadPingAudioFile = async () => {
    this.audioFile = new AudioFile();
    await this.audioFile.fetch(FILE);
    this.isFileLoading = false;
  };

  start = async (delayMS) => {
    if (!this.audioFile.audioBuffer) return;
    if (delayMS) await this.#wait.now(delayMS);

    const source = this.#audioCtx.createBufferSource();
    source.buffer = this.audioFile.audioBuffer;
    source.connect(this.#audioCtx.destination);
    source.start(this.#audioCtx.currentTime);
  };
}

export default Ping;
