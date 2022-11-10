import Ping from "../modules/Ping";
import AudioPlayer from "../modules/AudioPlayer";
import AudioRecorder from "../modules/AudioRecorder";
import AudioConverter from "../modules/AudioConverter";
import SlidingWindowCorrelation from "../modules/SlidingWindowCorrelation";
import DistanceBySamples from "../modules/DistanceBySamples";

class PingPipeline {
  constructor() {
    this.audioConverter = new AudioConverter();
    this.ping = new Ping();
    this.player = new AudioPlayer();
    this.recorder = new AudioRecorder();
    this.slidingWindowCorrelation = new SlidingWindowCorrelation();

    this.correlations = [];
  }

  start = async () => {
    const { recorder, ping, player, audioConverter, slidingWindowCorrelation } =
      this;

    await recorder.start();
    await ping.start(200);
    const recordedBlob = await recorder.stop(250);
    await audioConverter.fromBlob(recordedBlob);
    const recordedAudioBuffer = audioConverter.audioBuffer;
    const pingSignalAudioBuffer = ping.audioFile.audioBuffer;
    const distanceBySamples = new DistanceBySamples();

    if (recordedAudioBuffer.sampleRate !== pingSignalAudioBuffer.sampleRate) {
      alert(
        `Sample rate mismatch between ping (${pingSignalAudioBuffer.sampleRate}) and recording (${recordedAudioBuffer.sampleRate}. Results will not be accurate until I fix this.)`
      );
    }
    const correlations = slidingWindowCorrelation.calculate(
      recordedAudioBuffer.getChannelData(0),
      pingSignalAudioBuffer.getChannelData(0)
    );
    this.correlations = correlations;
    // player.play(recordedBlob);
    return correlations;
  };
}

export default PingPipeline;
