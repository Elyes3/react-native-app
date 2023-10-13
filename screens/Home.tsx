import { useEffect,useState,useCallback } from 'react';
import { View, Text, FlatList,StyleSheet, TouchableOpacity } from 'react-native'
import ColorSquare from '../components/ColorSquare';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Color } from '../models/Color';
type ColorPaletteType = {
  paletteName: string;
  colors : Color[]
}
type MainStackParamList = {
  Home: ColorPaletteType,
  ColorPalette: ColorPaletteType,
  AddNewPalette: undefined;
}
type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;
const API_URL: string = "https://color-palette-api.kadikraman.now.sh/palettes";
const Home = ({navigation,route} : Props) => {

  const [colorPalettes, setColorPalettes] = useState<ColorPaletteType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const handleRefresh = useCallback(async(api_url: string) => {
    setIsRefreshing(true);
    handleAPIColorPalettesFill(api_url).then(() => { setIsRefreshing(false) });

  }, [])
  const handleNewPalette = (newColorPalette : ColorPaletteType) => {
    setColorPalettes(current => [newColorPalette, ...current]);

  }
  const handleAPIColorPalettesFill = useCallback(async(api_url: string) =>
  {
      return fetch(api_url)
        .then((res: Response) => (res.json()))
        .then((apiColorPalettes: ColorPaletteType[]) => {
          setColorPalettes(apiColorPalettes)
        })
  }, [])

  useEffect(() => {
    let newPalette = route.params ? { colors: route.params.colors, paletteName: route.params.paletteName } : null;
    if (!newPalette)
      handleAPIColorPalettesFill(API_URL);
    else
      handleNewPalette(newPalette);
  }, [route.params])

  return (
    <View>
      
      <FlatList data={colorPalettes}
        ListHeaderComponent={<Text style={styles.heading} onPress={() => { navigation.navigate('AddNewPalette')}}>Add a color scheme</Text>}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => { navigation.push('ColorPalette', item) }}>
            <View style={[styles.box]}>
              <Text style={styles.text}>{item.paletteName}</Text>
              <FlatList
                data={item.colors.slice(0, 5)}
                horizontal={true}
                renderItem={({ item }) => <ColorSquare
                  hexCode={item.hexCode} />}
              keyExtractor={item => item.hexCode}
              />
            </View>
          </TouchableOpacity>
        }
        keyExtractor={(item) => item.paletteName}
        refreshing={isRefreshing}
        onRefresh={() => handleRefresh(API_URL)}
      >
        </FlatList>
      </View>
  );
};
const styles = StyleSheet.create({
  box: {
    marginLeft: 5,
    padding: 10,
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom:15
  },
  heading: {
    marginLeft: 15,
    fontSize: 23,
    fontWeight: 'bold',
    color : '#00A0B0'
  },
});
export default Home;