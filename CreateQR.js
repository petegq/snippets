import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import openpgp from 'openpgp';

const generateRandomID = () => {
  // Function to generate a random 20-digit ID
  const idLength = 20;
  const charset = '0123456789';
  let id = '';
  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    id += charset[randomIndex];
  }
  return id;
};

const PGPKeyPairComponent = () => {
  const [publicKey, setPublicKey] = useState('');
  const [randomID, setRandomID] = useState('');

  useEffect(() => {
    generateKeysAndRandomID();
  }, []);

  const generateKeysAndRandomID = async () => {
    try {
      const { publicKeyArmored } = await openpgp.generateKey({
        userIds: [{ name: 'Your Name', email: 'your.email@example.com' }],
        curve: 'ed25519',
      });

      setPublicKey(publicKeyArmored);
      setRandomID(generateRandomID());
    } catch (error) {
      console.error('Error generating key pair:', error);
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 18 }}>Random ID:</Text>
      <Text style={{ fontSize: 16 }}>{randomID}</Text>
      <Text style={{ fontSize: 18 }}>Public Key:</Text>
      <Text style={{ fontSize: 16 }}>{publicKey}</Text>
      <QRCode
        value={`ID: ${randomID}\nPublic Key:\n${publicKey}`}
        size={200}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
};

export default PGPKeyPairComponent;
