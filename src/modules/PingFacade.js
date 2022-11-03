import Ping from "./Ping";
import AudioPlayer from "./AudioPlayer";
import AudioRecorder from "./AudioRecorder";
import AudioConverter from "./AudioConverter";
import SlidingWindowCorrelation from "./SlidingWindowCorrelation";

class PingFacade {
  constructor() {
    this.audioConverter = new AudioConverter();
    this.ping = new Ping();
    this.player = new AudioPlayer();
    this.recorder = new AudioRecorder();
    this.slidingWindowCorrelation = new SlidingWindowCorrelation();

    this.correlations = [];
  }

  recordPing = async () => {
    const { recorder, ping, player, audioConverter, slidingWindowCorrelation } =
      this;

    await recorder.start();
    await ping.start(100);
    const recordedBlob = await recorder.stop(500);
    await audioConverter.fromBlob(recordedBlob);
    const recordedAudioBuffer = audioConverter.audioBuffer;
    const pingSignalAudioBuffer = ping.audioFile.audioBuffer;

    if (recordedAudioBuffer.sampleRate !== pingSignalAudioBuffer.sampleRate) {
      alert(
        `Sample rate mismatch between ping (${pingSignalAudioBuffer.sampleRate}) and recording (${recordedAudioBuffer.sampleRate}. Results will not be accurate until I fix this by resampling.)`
      );
    }

    const correlations = slidingWindowCorrelation.calculate(
      recordedAudioBuffer.getChannelData(0),
      pingSignalAudioBuffer.getChannelData(0)
    );
    this.correlations = correlations;

    console.log("correlations:", correlations);

    player.play(recordedBlob);
    return correlations;
  };
}

export default PingFacade;
