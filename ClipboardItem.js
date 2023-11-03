import React from 'react';
import {Text} from 'react-native';

const ClipboardItem = ({item}) => {
  return <Text>{item.content}</Text>;
};

export default ClipboardItem;
