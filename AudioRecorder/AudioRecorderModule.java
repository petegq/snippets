public class AudioRecorderModule extends ReactContextBaseJavaModule {

  @ReactMethod
  public void startRecordingAndTranscribing(Callback callback) {
    // Java implementation 
    
    callback.invoke(null, "Transcription result");
  }
  
  @ReactMethod
  public void stopRecordingAndTranscribing() {
    // Java implementation
  }

}