import AudioCtxProvider from "./components/AudioCtxProvider";
import Mediator from "./components/Mediator";

const App = () => {
  return (
    <AudioCtxProvider>
      <Mediator />
    </AudioCtxProvider>
  );
};

export default App;
