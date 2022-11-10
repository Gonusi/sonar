import PingPipeline from "./pipelines/PingPipeline";
import { useEffect, useRef, useState } from "react";
import CanvasGraph from "./modules/CanvasGraph/CanvasGraph";
import DataPipeline from "./pipelines/DataPipeline";
import "./App.css";

const pingPipeline = new PingPipeline();
const dataPipeline = new DataPipeline({ maxDistanceM: 10 });

const App = () => {
  const canvasRef = useRef();
  const [data, setData] = useState(null);
  const [canvasGraph, setCanvasGraph] = useState(null);
  const [threshold, setThreshold] = useState(0);
  const [enhance, setEnhance] = useState(100);
  const container = useRef();

  useEffect(() => {
    setData(dataPipeline.setFilters({ threshold, enhance }));
  }, [threshold, enhance]);

  useEffect(() => {
    if (!data) return;

    let _canvasGraph = canvasGraph;

    if (!_canvasGraph) {
      _canvasGraph = new CanvasGraph(canvasRef.current, 10);
      setCanvasGraph(_canvasGraph);
    }

    _canvasGraph.draw(data);
  }, [data]);

  return (
    <div ref={container} className="container">
      <canvas
        width={container?.current?.width || 480}
        height={window.screen.height - 300}
        ref={canvasRef}
      />
      <div className="controls">
        <div className="sliders">
          <div className="slider">
            <label className="slider__label" htmlFor="threshold_slider">
              Threshold:
            </label>
            <span className="slider__value">{threshold}</span>
            <input
              id="threshold_slider"
              className="slider__input"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={threshold}
              onChange={(e) => {
                setThreshold(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="slider">
          <label className="slider__label" htmlFor="enhance_slider">
            Enhance:
          </label>
          <span className="slider__value">{enhance}</span>
          <input
            id="enhance_slider"
            className="slider__input"
            type="range"
            min={1}
            max={400}
            step={0.01}
            value={enhance}
            onChange={(e) => {
              setEnhance(e.target.value);
            }}
          />
        </div>
        <div className="buttons">
          <button
            onClick={async () => {
              const correlations = await pingPipeline.start();
              const result = dataPipeline.start(correlations);
              setData(result);
            }}
          >
            MEASURE
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
