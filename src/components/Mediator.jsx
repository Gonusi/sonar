import useChirp from "../hooks/useChirp";
import useRecorder from "../hooks/useRecorder";

const Mediator = () => {
  const { loading, play } = useChirp();
  const { record, replay } = useRecorder();

  return (
    <div>
      {loading ? "loading..." : <button onClick={play}>Play</button>}
      <button onClick={record}>Record</button>
      <button onClick={replay}>Replay record</button>
    </div>
  );
};

export default Mediator;
