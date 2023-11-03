import React, {useState, useEffect} from 'react';
import {Button, TextInput} from 'react-native';
import {saveClipboardItem} from '../utils/db';

const ClipboardSaver = () => {
  const [clipboardContent, setClipboardContent] = useState('');

  const handleSaveButtonPress = () => {
    saveClipboardItem(clipboardContent);
    setClipboardContent('');
  };

  return (
    <>
      <TextInput
        value={clipboardContent}
        onChangeText={setClipboardContent}
      />
      <Button title="Save" onPress={handleSaveButtonPress} />
    </>
  );
};

export default ClipboardSaver;
