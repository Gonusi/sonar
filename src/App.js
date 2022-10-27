import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let source;

function App() {
  const [chirpBuffer, setChirpBuffer] = useState(null);

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

  const loadChirp = () => {
    source = audioCtx.createBufferSource();
    source.buffer = chirpBuffer;
    source.connect(audioCtx.destination);
    source.loop = false;
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          loadChirp();
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
