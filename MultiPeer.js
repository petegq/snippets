import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Multipeer from 'react-native-multipeer';

const MultipeerComponent = () => {
  const [peerId, setPeerId] = useState(null);
  const [connectedPeers, setConnectedPeers] = useState([]);

  useEffect(() => {
    // Initialize Multipeer Connectivity with your service type
    Multipeer.init('your-service-type');

    // Subscribe to events for connection changes
    Multipeer.on('peerFound', (peerID) => {
      setPeerId(peerID);
    });

    Multipeer.on('peerLost', (peerID) => {
      setPeerId(null);
    });

    Multipeer.on('receivedData', (data) => {
      // Handle data received from other devices
      console.log('Received data:', data);
    });

    // Clean up listeners when the component unmounts
    return () => {
      Multipeer.destroy();
      Multipeer.removeAllListeners();
    };
  }, []);

  const sendTextToPeers = () => {
    if (peerId) {
      const dataToSend = { text: 'Hello from React Native!' };
      Multipeer.sendData(dataToSend, [peerId]);
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 18 }}>Connected Peer ID:</Text>
      <Text style={{ fontSize: 16, marginTop: 5 }}>{peerId || 'Not connected'}</Text>
      <TouchableOpacity
        onPress={sendTextToPeers}
        style={{ backgroundColor: 'lightblue', padding: 10, marginTop: 20 }}
      >
        <Text style={{ fontSize: 16 }}>Send Text to Peer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MultipeerComponent;
