import Home from './screens/Home';
import ColorPalette from './screens/ColorPalette';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Color } from './models/Color';
import AddNewPaletteModal from './screens/ColorPaletteModal';
type ColorPaletteType = {
  paletteName: string;
  colors: Color[];
}
type MainStackParamList = {
  ColorPalette: ColorPaletteType,
  Home: ColorPaletteType,
};
type RootStackParamList = {
  Main: undefined,
  AddNewPalette: { handleNewPalette: (newColorPalette: ColorPaletteType) => void }
}
const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }} />
        <RootStack.Screen name="AddNewPalette" component={ AddNewPaletteModal } options={{ presentation: 'modal' }} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen
          name="ColorPalette"
          component={ColorPalette}
          options={({ route }) => ({ title: route.params.paletteName })}
        />
    </MainStack.Navigator>  
  )
}
export default App;