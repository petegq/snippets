import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Clipboard } from 'react-native';

const ClipboardMonitor = () => {
  const [clipboardHistory, setClipboardHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const content = await Clipboard.getString();
      if (content && !clipboardHistory.includes(content)) {
        setClipboardHistory((prevHistory) => [content, ...prevHistory]);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [clipboardHistory]);

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={clipboardHistory}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ClipboardMonitor;