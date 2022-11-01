import logo from "./logo.svg";
import { useEffect, useRef, useState } from "react";
import calculateCorrelation from "calculate-correlation";
import "./App.css";

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let chirpSource;

// TODO at this point, I'm able to record my own chirp from speakers
// Try to correlate its channel with chirpBuffer content and display correlation on graph

function App() {
  const [chirpBuffer, setChirpBuffer] = useState(null);
  const correlationCanvas = useRef();

  // Load chirp file and put it into buffer
  useEffect(() => {
    const request = new XMLHttpRequest();
    request.open("GET", "chirp_0001.ogg", true);
    request.responseType = "arraybuffer";
    request.onload = () => {
      const audioData = request.response;
      audioCtx.decodeAudioData(
        audioData,
        (buffer) => {
          setChirpBuffer(buffer);
        },

        (err) => console.error(`Error with decoding audio data: ${err.err}`)
      );
    };

    request.send();
  }, []);

  const playChirp = () => {
    let done = false;

    const handleStream = function (stream) {
      console.log("handle stream");

      chirpSource = audioCtx.createBufferSource();
      chirpSource.buffer = chirpBuffer;
      chirpSource.connect(audioCtx.destination);
      chirpSource.loop = false;
      chirpSource.start(0);

      const streamSource = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(16384, 1, 1);

      streamSource.connect(processor);
      processor.connect(audioCtx.destination);

      processor.onaudioprocess = function (e) {
        if (done) return;
        done = true;
        console.log("process callback");
        // Do something with the data, e.g. convert it to WAV
        console.log(e.inputBuffer);
        const recordedData = e.inputBuffer.getChannelData(0);
        const sampleData = chirpBuffer.getChannelData(0);

        console.log("recordedData.length", recordedData.length);
        console.log("sampleData.length", sampleData.length);

        const correlations = [];
        recordedData.forEach((sample, index) => {
          const slidingWindow = recordedData.slice(
            index,
            index + sampleData.length
          );
          if (slidingWindow.length < sampleData.length) return; // we're out of bounds

          let results = [];
          sampleData.forEach((sample, index) => {
            results.push(sample * slidingWindow[index]);
          });
          let resultSum = results.reduce((partialSum, a) => partialSum + a, 0);
          correlations.push(resultSum);
        });
        console.log("correlations", correlations);

        const correlationCanvasCtx = correlationCanvas.current.getContext("2d");
        correlationCanvasCtx.fillStyle = "rgb(200, 200, 200)";
        correlationCanvasCtx.fillRect(
          0,
          0,
          correlationCanvas.current.width,
          correlationCanvas.current.height
        );

        correlationCanvasCtx.lineWidth = 2;
        correlationCanvasCtx.strokeStyle = "rgb(0, 0, 0)";

        correlationCanvasCtx.beginPath();

        const sliceWidth =
          (correlationCanvas.current.width * 1.0) / correlations.length;
        let x = 0;

        for (let i = 0; i < correlations.length; i++) {
          const v = correlations[i];
          const y =
            (v * correlationCanvas.current.height) / 6 +
            correlationCanvas.current.height / 2;

          if (i === 0) {
            correlationCanvasCtx.moveTo(x, y);
          } else {
            correlationCanvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        correlationCanvasCtx.lineTo(
          correlationCanvas.current.width,
          correlationCanvas.current.height / 2
        );
        correlationCanvasCtx.stroke();

        // const bufferSource = audioCtx.createBufferSource();
        // bufferSource.buffer = e.inputBuffer;
        // bufferSource.connect(audioCtx.destination);
        // bufferSource.start();
      };
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleStream);
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          playChirp();

          setTimeout(() => {
            chirpSource.stop(0);
          }, 100);
        }}
      >
        Play chirp
      </button>
      <canvas
        width={800}
        height={500}
        ref={correlationCanvas}
        id="correlationCanvas"
      ></canvas>
    </div>
  );
}

export default App;
