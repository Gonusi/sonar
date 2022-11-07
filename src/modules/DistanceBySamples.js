const SPEED_OF_SOUND = 343;

// This operates in absolute meters
// Remember that an echo travels double the distance
class DistanceBySamples {
  constructor(sampleRate = 48000) {
    const meterPerSample = SPEED_OF_SOUND / sampleRate;
    this.sampleRate = sampleRate;
    this.meterPerSample = meterPerSample;
    this.samplesPerMeter = 1 / meterPerSample;
  }

  getMeters(sampleCount, pingSampleCount) {
    return this.meterPerSample * sampleCount;
  }

  getSampleCountByMeters(meters) {
    return this.samplesPerMeter * meters;
  }
}

export default DistanceBySamples;
