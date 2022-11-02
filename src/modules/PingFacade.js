import Ping from "./Ping";
import AudioPlayer from "./AudioPlayer";
import AudioRecorder from "./AudioRecorder";
import AudioConverter from "./AudioConverter";

class PingFacade {
  constructor() {
    this.recorder = new AudioRecorder();
    this.player = new AudioPlayer();
    this.ping = new Ping();
  }

  recordPing = async () => {
    const { recorder, ping, player } = this;

    await recorder.start();
    await ping.start(100);
    const recordingBlob = await recorder.stop(500);
    const audioBuffer = await new AudioConverter(recordingBlob);

    player.play(recordingBlob);
  };
}

export default PingFacade;
