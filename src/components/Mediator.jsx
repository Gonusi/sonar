import useChirp from "../hooks/useChirp";

const Mediator = () => {
  const { loading, play } = useChirp();

  return (
    <div>{loading ? "loading..." : <button onClick={play}>Play</button>}</div>
  );
};

export default Mediator;
