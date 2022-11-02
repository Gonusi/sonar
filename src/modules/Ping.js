import Wait from "./Wait";

const FILE = "chirps/chirp_0001.ogg";

class Ping {
  constructor() {
    this.audio = new Audio(FILE);
    this.duration = this.audio.duration;
    this.wait = new Wait();
  }

  start = async (delayMS, onEnded) => {
    await this.wait.now();
    const startTime = Date.now();
    return new Promise((resolve) => {
      this.audio.play();
      this.audio.addEventListener("ended", () => {
        const actualDurationMS = Date.now() - startTime;
        if (typeof onEnded === "function") onEnded(actualDurationMS);
        resolve({ actualDurationMS });
      });
    });
  };
}

export default Ping;
