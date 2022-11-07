class DataFilter {
  threshold(data, value) {
    if (!data) return data;
    return data.map((dataPoint) => (dataPoint < value ? 0 : dataPoint));
  }
}

export default DataFilter;
