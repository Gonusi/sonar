import Ping from "./modules/Ping";
import AudioRecorder from "./modules/AudioRecorder";
import AudioPlayer from "./modules/AudioPlayer";
import PingFacade from "./modules/PingFacade";
import { useEffect, useRef, useState } from "react";
import CanvasGraph from "./modules/CanvasGraph";

const ping = new Ping();
const audioRecorder = new AudioRecorder();
const audioPlayer = new AudioPlayer();
const pingFacade = new PingFacade();

const App = () => {
  const [correlations, setCorrelations] = useState();
  const canvasRef = useRef();

  useEffect(() => {
    if (!correlations || !correlations.length) return;
    const canvasGraph = new CanvasGraph(canvasRef.current);
    canvasGraph.draw(correlations);
  }, [correlations]);

  return (
    <>
      <div>
        <h3>Automatic controls</h3>
        <button
          onClick={async () => {
            const corrs = await pingFacade.recordPing();
            setCorrelations(corrs);
          }}
        >
          Ping and replay
        </button>
      </div>
      <div>
        <h3>Manual controls</h3>
        <button onClick={() => ping.start()}>Ping</button>
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
      <div>
        <h3>Correlation between recorded sample and ping in time:</h3>
        <canvas width={600} height={400} ref={canvasRef} />
      </div>
    </>
  );
};

export default App;
