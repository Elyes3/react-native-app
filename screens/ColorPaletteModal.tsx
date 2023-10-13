import React,{useState} from 'react';
import { View, Text, TextInput,FlatList, Switch, StyleSheet, Alert } from 'react-native';
import COLORS from '../data/colors.json'
import { Color } from '../models/Color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
type ColorPaletteType = {
  paletteName: string;
  colors : Color[]
}
type RootStackParamList = {
  Home: ColorPaletteType,
  AddNewPalette: {
    handleNewPalette: (newColorPalette: ColorPaletteType) => void;
  }
}
type Props = NativeStackScreenProps<RootStackParamList, 'AddNewPalette'>;

const AddNewPaletteModal = ({ navigation,route } : Props) => {
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);
  const [paletteName, setPaletteName] = useState<string>('');
  const savePalette = () => {
    if (selectedColors.length < 3)
      Alert.alert('Error','Please, select more than 3 colors !')
    else if (paletteName.length === 0)
      Alert.alert('Error','Please, specify a color palette name !')
    else
    {
      navigation.navigate('Home',{ colors: selectedColors, paletteName });
    }
  }
  const pushColor = (color: Color) => {
    if (!!selectedColors.find((selectedColor: Color) => selectedColor.hexCode === color.hexCode))
      setSelectedColors(selectedColors.filter((selectedColor: Color) => selectedColor.hexCode !== color.hexCode))
    else
      setSelectedColors([...selectedColors, color])
  }
  const changePaletteName = (newPaletteName : string) => {
    setPaletteName(newPaletteName);
  }
  return (
    <View style={styles.container}>
        <View style={styles.heading}>
          <Text>Name of your color palette</Text>
          <TextInput
            style={styles.inputText}
            keyboardType='default'
            value={paletteName}
            onChangeText={(newText: string) => changePaletteName(newText)}>
          </TextInput>
      </View>
      <View style={styles.box}>
          <FlatList
              data={COLORS}
              keyExtractor={(item) => item.colorName}
              renderItem={({ item }) => 
              <View style={styles.colorSelector}>
                        <Text>{item.colorName}</Text>
                  <Switch
                    onValueChange={() => pushColor(item)}
                    value={!!selectedColors.find((selectedColor : Color) => selectedColor.hexCode === item.hexCode)}
                  ></Switch>
                  
        </View>
          }>
        
        </FlatList>
        <TouchableOpacity onPress={savePalette}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Submit !</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding : 10,
      backgroundColor: 'white'
    },
    box: {
      flex : 1
    },
    inputText: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'grey',
        padding:5

    },
    colorSelector: {
        backgroundColor: 'white',
        borderBottomColor: 'grey',
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderLeftColor:'white',
        borderWidth: 1,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
        
    },
    heading: {
      marginBottom : 15
    },
    button: {
      backgroundColor: '#66b2b2',
      padding: 10,
      borderRadius: 10,
      justifyContent : 'center',
      flexDirection: 'row',
      fontWeight: 'bold'
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold'
    }
})
export default AddNewPaletteModal;