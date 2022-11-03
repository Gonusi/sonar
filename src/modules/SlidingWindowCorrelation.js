class SlidingWindowCorrelation {
  constructor() {
    this.correlations = [];
  }

  // TODO try to move to webworker?
  calculate = (arr1, arr2) => {
    // ensure "a" is the longer array
    const a = arr1.length >= arr2.length ? arr1 : arr2;
    const b = arr1.length >= arr2.length ? arr2 : arr1;
    const correlations = [];

    a.forEach((sample, index) => {
      const slidingWindow = a.slice(index, index + b.length);
      if (slidingWindow.length < b.length) return;

      let results = [];
      b.forEach((sample, index) => {
        results.push(sample * slidingWindow[index]);
      });
      let resultSum = results.reduce((partialSum, a) => partialSum + a, 0);
      correlations.push(resultSum);
    });

    this.correlations = correlations;
    return correlations;
  };
}

export default SlidingWindowCorrelation;
