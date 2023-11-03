import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import openpgp from 'openpgp';

const PGPKeyPairComponent = () => {
  const [keysGenerated, setKeysGenerated] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const generateKeyPair = async () => {
    try {
      const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
        userIds: [{ name: 'Your Name', email: 'your.email@example.com' }],
        curve: 'ed25519', // You can change this to 'rsa' or other supported curves
      });

      setPublicKey(publicKeyArmored);
      setPrivateKey(privateKeyArmored);
      setKeysGenerated(true);
    } catch (error) {
      console.error('Error generating key pair:', error);
    }
  };

  return (
    <View>
      {keysGenerated ? (
        <>
          <Text style={{ fontSize: 18 }}>Public Key:</Text>
          <Text style={{ fontSize: 16 }}>{publicKey}</Text>
          <Text style={{ fontSize: 18 }}>Private Key:</Text>
          <Text style={{ fontSize: 16 }}>{privateKey}</Text>
        </>
      ) : (
        <TouchableOpacity
          onPress={generateKeyPair}
          style={{ backgroundColor: 'lightblue', padding: 10, marginTop: 20 }}
        >
          <Text style={{ fontSize: 16 }}>Generate Key Pair</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PGPKeyPairComponent;
