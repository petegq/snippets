import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { RTCPeerConnection, RTCSessionDescription } from 'react-native-webrtc';
import io from 'socket.io-client';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    const socket = io('http://your-signaling-server.com');

    socket.on('connect', () => {
      console.log('Connected to signaling server');

      const peerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302',
          },
        ],
      });

      peerConnection.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit('ice-candidate', e.candidate);
        }
      };

      peerConnection.ondatachannel = (e) => {
        e.channel.onmessage = (e) => {
          setMessages((prevMessages) => [...prevMessages, e.data]);
        };
      };

      setPeerConnection(peerConnection);
    });

    socket.on('offer', async (offer) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      socket.emit('answer', answer);
    });

    socket.on('answer', async (answer) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('ice-candidate', async (candidate) => {
      await peerConnection.addIceCandidate(candidate);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
      peerConnection.close();
    };
  }, []);

  const sendMessage = async () => {
    const dataChannel = peerConnection.createDataChannel('chat');

    dataChannel.onopen = () => {
      dataChannel.send(message);
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit('offer', offer);

    setMessage('');
  };

  return (
    <View>
      <TextInput value={message} onChangeText={setMessage} />
      <Button title="Send" onPress={sendMessage} />
      {messages.map((msg, index) => (
        <Text key={index}>{msg}</Text>
      ))}
    </View>
  );
};

export default ChatComponent;