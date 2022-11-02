import Ping from "./modules/Ping";
import AudioRecorder from "./modules/AudioRecorder";
import AudioPlayer from "./modules/AudioPlayer";
import AudioData from "./modules/AudioBuffer";

const ping = new Ping();
const audioRecorder = new AudioRecorder();
const audioPlayer = new AudioPlayer();

const App = () => {
  return (
    <>
      <button onClick={() => ping.play()}>Ping</button>
      <button onClick={() => audioRecorder.start()}>Record</button>
      <button onClick={() => audioRecorder.stop()}>Stop</button>
      <button
        onClick={() => {
          audioPlayer.play(audioRecorder.lastRecordingBlob);
        }}
      >
        Play recording
      </button>
    </>
  );
};

export default App;
