import DistanceBySamples from "./DistanceBySamples";

class DataManipulator {
  #distanceBySamples;
  constructor() {
    this.#distanceBySamples = new DistanceBySamples();
  }

  splitAtMax(data) {
    const max = Math.max(...data);
    const maxIndex = data.findLastIndex((item) => item >= max);
    return [data.slice(0, maxIndex), data.slice(maxIndex)];
  }

  splitAtMeters(data, meters) {
    const splitIndex = this.#distanceBySamples.getSampleCountByMeters(meters);
    return [data.slice(0, splitIndex), data.slice(splitIndex)];
  }
}

export default DataManipulator;
