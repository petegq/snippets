import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RTCPeerConnection, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';
import dgram from 'react-native-udp';

const connectionConfig = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
const peerConnection = new RTCPeerConnection(connectionConfig);

const App = () => {
  const socket = dgram.createSocket('udp4');

  useEffect(() => {
    // Listen for broadcast messages
    socket.bind(12345);
    socket.on('message', (msg) => {
      handleReceivedSignal(msg);
    });

    // Initialize WebRTC
    peerConnection.onicecandidate = handleIceCandidate;
    peerConnection.ondatachannel = handleDataChannel;

    return () => socket.close();
  }, []);

  const handleIceCandidate = (event) => {
    if (event.candidate) {
      // Broadcast the ICE candidate to other devices
      const candidate = JSON.stringify({ candidate: event.candidate });
      socket.send(candidate, 0, candidate.length, 12345, '255.255.255.255');
    }
  };

  const handleReceivedSignal = (msg) => {
    const signal = JSON.parse(msg);
    if (signal.candidate) {
      const iceCandidate = new RTCIceCandidate(signal.candidate);
      peerConnection.addIceCandidate(iceCandidate);
    }
  };

  const handleDataChannel = (event) => {
    // Set up the data channel to send/receive messages
    const dataChannel = event.channel;

    dataChannel.onmessage = (event) => {
      // Handle received messages and sync SQLite DB
    };
  };

  const connectDevices = () => {
    // Broadcast a signal to connect
    const message = JSON.stringify({ connect: true });
    socket.send(message, 0, message.length, 12345, '255.255.255.255');

    // Create a data channel to send/receive messages
    const dataChannel = peerConnection.createDataChannel('messages');
    // Handle data channel events
  };

  return (
    <View>
      <TouchableOpacity onPress={connectDevices}>
        <Text>Connect</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;