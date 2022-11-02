class AudioPlayer {
  play = (audioAsBlob) => {
    this.reader = new FileReader();
    this.audio = null;

    this.reader.onload = (e) => {
      const base64URL = e.target.result;
      this.audio = new Audio(base64URL);
      this.audio.play();
    };

    this.reader.readAsDataURL(audioAsBlob);
  };
}

export default AudioPlayer;
