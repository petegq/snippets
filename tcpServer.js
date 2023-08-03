import React, { useEffect } from 'react';
import { Button } from 'react-native';
import TcpSocket from 'react-native-tcp';

const ServerComponent = () => {
  let serverSocket;

  useEffect(() => {
    serverSocket = TcpSocket.createServer(socket => {
      socket.on('data', data => {
        console.log('Server received: ', data);
      });

      socket.on('error', error => {
        console.log('Server error: ', error);
      });

      socket.write('Hello from server!');
    });

    serverSocket.listen(12345, 'localhost');
    return () => serverSocket.close();
  }, []);

  const sendMessage = () => {
    if (serverSocket) {
      serverSocket.write('Hello from server!');
    }
  };

  return (
    <Button
      title="Send Message"
      onPress={sendMessage}
    />
  );
};

export default ServerComponent;