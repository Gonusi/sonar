import { createContext, useRef } from "react";

export const AudioCtx = createContext();

const AudioCtxProvider = ({ children }) => {
  const ctx = useRef(new (window.AudioContext || window.webkitAudioContext)());

  return <AudioCtx.Provider value={ctx.current}>{children}</AudioCtx.Provider>;
};

export default AudioCtxProvider;
