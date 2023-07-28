import AVFoundation
import Speech

class AudioRecorder {

  let audioEngine = AVAudioEngine()
  let speechRecognizer = SFSpeechRecognizer()!
  
  var recognitionTask: SFSpeechRecognitionTask?
  
  func startRecordingAndTranscribing() {
    
    let audioSession = AVAudioSession.sharedInstance()
    try! audioSession.setCategory(.record, mode: .measurement, options: .duckOthers)
    
    let inputNode = audioEngine.inputNode
    
    let recordingFormat = inputNode.outputFormat(forBus: 0)
    inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { buffer, _ in
      self.recognitionTask?.append(buffer)
    }
    
    audioEngine.prepare()
    try! audioEngine.start()
    
    recognitionTask = speechRecognizer.recognitionTask(with: recognitionRequest, resultHandler: { result, error in
      if let result = result {
        let bestString = result.bestTranscription.formattedString
        print("Transcribed: \(bestString)") 
      } else if let error = error {
        print("Error transcibing audio: \(error)")
      }
    })

  }
  
  func stopRecordingAndTranscribing() {
    audioEngine.stop()
    recognitionTask?.finish()
  }

}