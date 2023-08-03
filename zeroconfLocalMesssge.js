import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import Zeroconf from 'react-native-zeroconf';

const MessagingComponent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [peerId, setPeerId] = useState(null);
  const [zeroconf, setZeroconf] = useState(null);

  useEffect(() => {
    const zeroconfInstance = new Zeroconf();
    zeroconfInstance.scan('my-app._tcp.', 'local.');

    zeroconfInstance.on('start', () => {
      console.log('Zeroconf scan started.');
    });

    zeroconfInstance.on('found', (service) => {
      if (service.name === 'MyApp') {
        console.log('Found service:', service);
        setPeerId(service.txtRecord.peerId);
      }
    });

    zeroconfInstance.on('remove', (service) => {
      if (service.name === 'MyApp') {
        console.log('Removed service:', service);
        setPeerId(null);
      }
    });

    setZeroconf(zeroconfInstance);

    return () => {
      zeroconfInstance.stop();
    };
  }, []);

  const connectToPeer = () => {
    // Implement your connection logic here using the peerId.
  };

  const sendMessage = () => {
    // Implement your message sending logic here.
  };

  return (
    <View>
      {peerId ? (
        <>
          <Text>Connected to peer: {peerId}</Text>
          <TextInput
            value={message}
            onChangeText={(text) => setMessage(text)}
            placeholder="Type your message..."
          />
          <Button title="Send" onPress={sendMessage} />
        </>
      ) : (
        <Text>No peers found on the local network.</Text>
      )}

      <Text>Received Messages:</Text>
      {messages.map((msg, index) => (
        <Text key={index}>{msg}</Text>
      ))}
    </View>
  );
};

export default MessagingComponent;