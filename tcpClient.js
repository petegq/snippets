import React, { useEffect } from 'react';
import TcpSocket from 'react-native-tcp';

const ClientComponent = () => {
  let clientSocket;

  useEffect(() => {
    clientSocket = TcpSocket.createConnection({ port: 12345, host: 'localhost' }, () => {
      clientSocket.on('data', data => {
        console.log('Client received: ', data);
      });

      clientSocket.on('error', error => {
        console.log('Client error: ', error);
      });
    });

    return () => clientSocket.destroy();
  }, []);

  return null;
};

export default ClientComponent;