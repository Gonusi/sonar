import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let source;

function App() {
  const [chirpBuffer, setChirpBuffer] = useState(null);

  // Load chirp file and put it into buffer
  useEffect(() => {
    const request = new XMLHttpRequest();
    request.open("GET", "chirp_0050.ogg", true);
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
      const source = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(1024 * 4, 1, 1);

      source.connect(processor);
      processor.connect(audioCtx.destination);

      processor.onaudioprocess = function (e) {
        if (done) return;
        done = true;
        console.log("process callback");
        // Do something with the data, e.g. convert it to WAV
        console.log(e.inputBuffer);
        const data = e.inputBuffer.getChannelData(0);

        const bufferSource = audioCtx.createBufferSource();
        bufferSource.buffer = e.inputBuffer;
        bufferSource.connect(audioCtx.destination);
        bufferSource.start();
      };

      // stream.getTracks().forEach(function (track) {
      //   console.log("track stop", track);
      //   track.stop();
      // });
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleStream);

    source = audioCtx.createBufferSource();
    source.buffer = chirpBuffer;
    source.connect(audioCtx.destination);
    source.loop = false;
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          playChirp();
          source.start(0);
          setTimeout(() => {
            source.stop(0);
          }, 150);
        }}
      >
        Play chirp
      </button>
    </div>
  );
}

export default App;
