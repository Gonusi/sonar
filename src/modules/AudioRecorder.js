// Thank you:
// - ralzohairi @ https://github.com/ralzohairi/js-audio-recording/blob/master/js/audio-recording.js

import Wait from "./Wait";

class AudioRecorder {
  #wait;

  constructor() {
    this.audioBlobs = [];
    this.mediaRecorder = null;
    this.streamBeingCaptured = null;
    this.lastRecordingBlob = null;
    this.#wait = new Wait();
  }

  start = () => {
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      return Promise.reject(
        new Error(
          "MediaDevices API or getUserMedia method is not supported in this browser."
        )
      );
    } else {
      return navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.streamBeingCaptured = stream;
          this.mediaRecorder = new MediaRecorder(stream);
          this.audioBlobs = [];
          this.mediaRecorder.addEventListener("dataavailable", (event) => {
            this.audioBlobs.push(event.data);
          });

          this.mediaRecorder.start();
        });
    }
  };

  stop = (delayMS) => {
    return new Promise(async (resolve) => {
      await this.wait.now(delayMS);
      let mimeType = this.mediaRecorder.mimeType;
      this.mediaRecorder.addEventListener("stop", () => {
        let audioBlob = new Blob(this.audioBlobs, { type: mimeType });
        this.lastRecordingBlob = audioBlob;
        resolve(audioBlob);
      });
      this.cancel();
    });
  };

  cancel = () => {
    this.mediaRecorder.stop();
    this.stopStream();
    this.resetRecordingProperties();
  };

  stopStream = () => {
    this.streamBeingCaptured.getTracks().forEach((track) => track.stop());
  };

  resetRecordingProperties = () => {
    this.mediaRecorder = null;
    this.streamBeingCaptured = null;
  };
}

export default AudioRecorder;
