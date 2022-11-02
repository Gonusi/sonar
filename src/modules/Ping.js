const FILE = "chirps/chirp_0001.ogg";

class Ping {
  constructor() {
    this.audio = new Audio(FILE);
  }

  play = () => {
    this.audio.play();
  };
}

export default Ping;
