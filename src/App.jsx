import Ping from "./modules/Ping";
import AudioRecorder from "./modules/AudioRecorder";
import AudioPlayer from "./modules/AudioPlayer";
import PingPipeline from "./pipelines/PingPipeline";
import { useEffect, useRef, useState } from "react";
import CanvasGraph from "./modules/CanvasGraph";
import DataPipeline from "./pipelines/DataPipeline";

const pingPipeline = new PingPipeline();
const dataPipeline = new DataPipeline({ maxDistanceM: 10 });

const ping = new Ping();
const audioRecorder = new AudioRecorder();
const audioPlayer = new AudioPlayer();

const App = () => {
  const canvasRef = useRef();
  const [data, setData] = useState(null);
  const [canvasGraph, setCanvasGraph] = useState(null);
  const [threshold, setThreshold] = useState(10);
  const [canvasX, setCanvasX] = useState(null);

  useEffect(() => {
    setData(dataPipeline.setFilters({ threshold }));
  }, [threshold]);

  useEffect(() => {
    if (!data) return;
    const _canvasGraph = new CanvasGraph(canvasRef.current);
    _canvasGraph.draw(data);

    setCanvasGraph(_canvasGraph);
  }, [data]);

  const handleCanvasMouseMove = () => {
    // need to map canvas position to correlation data. 1px will have many datapoints, so only present the largest one
    const x = canvasGraph?.mousePos?.x;
    setCanvasX(x);
  };

  return (
    <>
      <div>
        <h3>Automatic controls</h3>
        <button
          onClick={async () => {
            const correlations = await pingPipeline.start();
            const result = dataPipeline.start(correlations);
            setData(result);
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
        <canvas
          width={600}
          height={400}
          ref={canvasRef}
          onMouseMove={handleCanvasMouseMove}
        />
        <input
          style={{ display: "block", width: "100%" }}
          type="range"
          min={0}
          max={1}
          step={0.01}
          onChange={(e) => {
            setThreshold(e.target.value);
          }}
        />
        <div>X:{canvasX}</div>
        <div>Threshold: {threshold}</div>
      </div>
    </>
  );
};

export default App;
