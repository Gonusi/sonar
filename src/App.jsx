import Ping from "./modules/Ping";
import AudioRecorder from "./modules/AudioRecorder";
import AudioPlayer from "./modules/AudioPlayer";
import Mediator from "./modules/Mediator";

const ping = new Ping();
const audioRecorder = new AudioRecorder();
const audioPlayer = new AudioPlayer();
const mediator = new Mediator();

const App = () => {
  return (
    <>
      <div>
        <h3>Automatic controls</h3>
        <button onClick={() => mediator.recordPing()}>Ping and replay</button>
      </div>
      <div>
        <h3>Manual controls</h3>
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
      </div>
    </>
  );
};

export default App;
