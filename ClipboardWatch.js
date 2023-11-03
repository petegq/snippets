import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Clipboard from 'react-native-clipboard';

const ClipboardMonitor = () => {
  const [copiedText, setCopiedText] = useState('');

  useEffect(() => {
    // Subscribe to clipboard changes
    const clipboardListener = Clipboard.addListener((copiedText) => {
      setCopiedText(copiedText);
    });

    // Clean up the listener when component unmounts
    return () => clipboardListener.remove();
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 18 }}>Copied Text:</Text>
      <Text style={{ fontSize: 16, marginTop: 5 }}>{copiedText}</Text>
      <TouchableOpacity
        onPress={() => Clipboard.setString('Hello, Clipboard!')}
        style={{ backgroundColor: 'lightblue', padding: 10, marginTop: 20 }}
      >
        <Text style={{ fontSize: 16 }}>Copy 'Hello, Clipboard!'</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClipboardMonitor;
