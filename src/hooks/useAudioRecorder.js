//In the audio recording API
const useAudioRecorder = () => {
  const [audioBlobs, setAudioBlobs] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [streamBeingCaptured, setStreamBeingCaptured] = useState(null);

  const start = () => {};

  const stop = () => {
    //return a promise that would return the blob or URL of the recording
    return new Promise((resolve) => {
      //save audio type to pass to set the Blob type
      let mimeType = mediaRecorder.mimeType;

      //listen to the stop event in order to create & return a single Blob object
      audioRecorder.mediaRecorder.addEventListener("stop", () => {
        //create a single blob object, as we might have gathered a few Blob objects that needs to be joined as one
        let audioBlob = new Blob(audioRecorder.audioBlobs, { type: mimeType });

        //resolve promise with the single audio blob representing the recorded audio
        resolve(audioBlob);
      });
      audioRecorder.cancel();
    });
  };
  /** Cancel audio recording*/
  const cancel = () => {
    //stop the recording feature
    audioRecorder.mediaRecorder.stop();

    //stop all the tracks on the active stream in order to stop the stream
    audioRecorder.stopStream();

    //reset API properties for next recording
    audioRecorder.resetRecordingProperties();
  };
  /** Stop all the tracks on the active stream in order to stop the stream and remove
   * the red flashing dot showing in the tab
   */
  const stopStream = () => {
    //stopping the capturing request by stopping all the tracks on the active stream
    audioRecorder.streamBeingCaptured
      .getTracks() //get all tracks from the stream
      .forEach((track) /*of type MediaStreamTrack*/ => track.stop()); //stop each one
  };
  /** Reset all the recording properties including the media recorder and stream being captured*/
  const resetRecordingProperties = () => {
    audioRecorder.mediaRecorder = null;
    audioRecorder.streamBeingCaptured = null;

    /*No need to remove event listeners attached to mediaRecorder as
    If a DOM element which is removed is reference-free (no references pointing to it), the element itself is picked
    up by the garbage collector as well as any event handlers/listeners associated with it.
    getEventListeners(audioRecorder.mediaRecorder) will return an empty array of events.*/
  };
};
