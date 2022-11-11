import DataManipulator from "../modules/DataManipulator";
import DataFilter from "../modules/DataFilter";

const dataManipulator = new DataManipulator();
const dataFilter = new DataFilter();

class DataPipeline {
  constructor({ maxDistanceM = 5 }) {
    this.data = null;
    this.clipDistance = maxDistanceM;
    this.filters = {
      threshold: 0,
      enhance: 0,
    };
    this.manipulationResult = null;
    this.filterResult = null;
  }

  start(data) {
    this.data = data;
    this.#manipulate();
    this.#filter();
    return this.filterResult;
  }

  #manipulate() {
    const afterPing = dataManipulator.splitAtMax(this.data)[1];
    const beforeMaxDistance = dataManipulator.splitAtMeters(
      afterPing,
      this.clipDistance * 2
    )[0];
    this.manipulationResult = beforeMaxDistance;
  }

  #filter() {
    const thresholdResult = dataFilter.threshold(
      this.manipulationResult,
      this.filters.threshold
    );
    const enhanceResult = dataFilter.enhance(
      thresholdResult,
      this.filters.enhance
    );
    this.filterResult = enhanceResult;
    this.result = this.filterResult;
  }

  setFilters(filters) {
    this.filters = filters;
    if (this.data) {
      return this.start(this.data);
    }
  }
}

export default DataPipeline;
