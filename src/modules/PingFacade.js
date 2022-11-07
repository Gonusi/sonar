import Ping from "./Ping";
import AudioPlayer from "./AudioPlayer";
import AudioRecorder from "./AudioRecorder";
import AudioConverter from "./AudioConverter";
import SlidingWindowCorrelation from "./SlidingWindowCorrelation";
import DistanceBySamples from "./DistanceBySamples";

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
    console.log("recording ping...");
    const { recorder, ping, player, audioConverter, slidingWindowCorrelation } =
      this;

    await recorder.start();
    await ping.start(100);
    const recordedBlob = await recorder.stop(250);
    await audioConverter.fromBlob(recordedBlob);
    const recordedAudioBuffer = audioConverter.audioBuffer;
    const pingSignalAudioBuffer = ping.audioFile.audioBuffer;

    const distanceBySamples = new DistanceBySamples();

    // console.log(
    //   "recording:",
    //   recordedAudioBuffer,
    //   recordedAudioBuffer.length,
    //   distanceBySamples.getMeters(recordedAudioBuffer.length)
    // );
    // console.log(
    //   "ping",
    //   pingSignalAudioBuffer,
    //   pingSignalAudioBuffer.length,
    //   distanceBySamples.getMeters(pingSignalAudioBuffer.length)
    // );

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
