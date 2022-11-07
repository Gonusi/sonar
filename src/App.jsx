import Ping from "./modules/Ping";
import AudioRecorder from "./modules/AudioRecorder";
import AudioPlayer from "./modules/AudioPlayer";
import PingFacade from "./modules/PingFacade";
import { useEffect, useRef, useState } from "react";
import CanvasGraph from "./modules/CanvasGraph";
import DataManipulator from "./modules/DataManipulator";
import DistanceBySamples from "./modules/DistanceBySamples";

const ping = new Ping();
const audioRecorder = new AudioRecorder();
const audioPlayer = new AudioPlayer();
const pingFacade = new PingFacade();
const dataManipulator = new DataManipulator();
const distanceBySamples = new DistanceBySamples();

const App = () => {
  const [correlations, setCorrelations] = useState();
  const canvasRef = useRef();

  useEffect(() => {
    if (!correlations || !correlations.length) return;
    const startingAtPing = dataManipulator.splitAtMax(correlations)[1];
    const clippedTo10Meters = dataManipulator.splitAtMeters(
      startingAtPing,
      20
    )[0];
    console.log(
      "clippedTo20Meters",
      clippedTo10Meters,
      "sampleCount:",
      clippedTo10Meters.length,
      "meters:",
      distanceBySamples.getMeters(clippedTo10Meters.length)
    );
    const canvasGraph = new CanvasGraph(canvasRef.current);
    canvasGraph.draw(clippedTo10Meters);
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
        <canvas width={400} height={600} ref={canvasRef} />
      </div>
    </>
  );
};

export default App;
