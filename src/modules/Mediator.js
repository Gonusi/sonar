import Ping from "./Ping";
import AudioPlayer from "./AudioPlayer";
import AudioRecorder from "./AudioRecorder";
import AudioBuffer from "./AudioBuffer";
import Wait from "./Wait";

class Mediator {
  constructor() {
    this.recorder = new AudioRecorder();
    this.player = new AudioPlayer();
    this.ping = new Ping();
    this.wait = new Wait();
  }

  recordPing = async () => {
    const { recorder, ping, player, wait } = this;

    await recorder.start();
    await ping.start(100);
    const recordingBlob = await recorder.stop(500);
    const audioBuffer = await new AudioBuffer(recordingBlob);

    player.play(recordingBlob);
  };
}

export default Mediator;
