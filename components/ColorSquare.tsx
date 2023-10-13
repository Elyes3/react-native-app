import React from 'react';
import { View, StyleSheet } from 'react-native';

const ColorSquare = (props:any) => {
  const colorStyle = {
      backgroundColor: props.hexCode,
  };


  return (
    <View style={[colorStyle,styles.square]}>
        
    </View>
  );
};

const styles = StyleSheet.create({
  square: {
    width: 35,
    height:35,
    borderRadius: 0,
    marginRight: 10
  },
});

export default ColorSquare;