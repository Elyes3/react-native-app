import React from 'react';
import { Text,View, StyleSheet, FlatList } from 'react-native';
import ColorBox from '../components/ColorBox';
import { Color } from '../models/Color';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type ColorPaletteType = {
  paletteName: string;
  colors : Color[]
}
type RootStackParamList = {
  ColorPalette: {
    colors: Color[];
    paletteName: string;
  }
}
type Props = NativeStackScreenProps<RootStackParamList, 'ColorPalette'>;
const ColorPalette = ({ route } : Props) => {
  return (
    <View>
      <Text style={styles.heading}>{route.params.paletteName}</Text>
    <FlatList
      style={styles.container}
      data={route.params.colors}
      keyExtractor={item => item.hexCode}
      renderItem={({ item }) => (
        <ColorBox hexCode={item.hexCode}/>
      )}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',

    padding:10
  },
});

export default ColorPalette;