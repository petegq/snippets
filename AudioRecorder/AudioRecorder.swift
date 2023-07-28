@objc(AudioRecorder)
class AudioRecorder: NSObject {

  @objc
  func startRecordingAndTranscribing(_ callback: @escaping RCTResponseSenderBlock) {
    // Swift implementation from previous example
    
    callback([NSNull(), "Transcription result"]) 
  }

  @objc
  func stopRecordingAndTranscribing() {
    // Swift implementation
  }

}