import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import ClipboardItem from './ClipboardItem';
import {getClipboardItems} from '../utils/db';

const ClipboardList = () => {
  const [clipboardItems, setClipboardItems] = useState([]);

  useEffect(() => {
    getClipboardItems().then(setClipboardItems);
  }, []);

  return (
    <FlatList
      data={clipboardItems}
      renderItem={({item}) => <ClipboardItem item={item} />}
    />
  );
};

export default ClipboardList;
