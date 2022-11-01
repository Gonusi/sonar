import { useState, useEffect, useContext } from "react";
import { AudioCtx } from "../components/AudioCtxProvider";

const FILE = "chirps/chirp_0001.ogg";

const useChirp = () => {
  const audioCtx = useContext(AudioCtx);
  const [loading, setLoading] = useState(true);
  const [buffer, setBuffer] = useState(null);

  useEffect(() => {
    const request = new XMLHttpRequest();
    request.open("GET", FILE, true);
    request.responseType = "arraybuffer";
    request.onload = () => {
      const audioData = request.response;
      audioCtx.decodeAudioData(
        audioData,
        (buffer) => {
          setBuffer(buffer);
          setLoading(false);
        },

        (err) => console.error(`Error with decoding audio data: ${err.err}`)
      );
    };

    setLoading(true);
    request.send();
  }, []);

  const play = () => {
    if (loading) {
      throw new Error(
        "Chirp is still loading, wait until loading flag is false"
      );
    }
    const chirpSource = audioCtx.createBufferSource();
    chirpSource.buffer = buffer;
    chirpSource.connect(audioCtx.destination);
    chirpSource.loop = false;
    chirpSource.start(audioCtx.currentTime);
  };

  return {
    loading,
    play,
  };
};

export default useChirp;
