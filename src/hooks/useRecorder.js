import { useState, useEffect, useContext } from "react";
import { AudioCtx } from "../components/AudioCtxProvider";

const BUFFER_SIZE = 16384; // at 48khz it's ±341ms of recording length

const useRecorder = () => {
  const [recordedBuffer, setRecordedBuffer] = useState(null);
  const audioCtx = useContext(AudioCtx);

  const recordStream = (stream) => {
    const streamSource = audioCtx.createMediaStreamSource(stream);
    const processor = audioCtx.createScriptProcessor(BUFFER_SIZE, 1, 1);

    streamSource.connect(processor);
    processor.connect(audioCtx.destination);

    processor.onaudioprocess = (e) => {
      console.log("onaudioprocess", recordedBuffer);
      if (recordedBuffer) return;
      setRecordedBuffer(e.inputBuffer);
    };
  };

  const record = () => {
    console.log("record called");
    setRecordedBuffer(null);
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(recordStream);
  };

  const replay = () => {
    if (!recordedBuffer) return;
    const source = audioCtx.createBufferSource();
    source.buffer = recordedBuffer;
    source.connect(audioCtx.destination);
    source.start(audioCtx.currentTime);
  };

  return {
    recordedBuffer,
    recordedSamples: recordedBuffer ? recordedBuffer.getChannelData(0) : null,
    record,
    replay,
  };
};

export default useRecorder;
