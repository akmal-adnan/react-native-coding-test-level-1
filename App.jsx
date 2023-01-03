import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {
  MainScreen,
  PokemonCatalog,
  PokemonView,
  ContactScreen,
} from './src/screens';

const transitionOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{title: 'Home', ...transitionOptions}}
        />
        <Stack.Screen
          name="ContactScreen"
          component={ContactScreen}
          options={{title: 'Contact', ...transitionOptions}}
        />
        <Stack.Screen
          name="PokemonCatalog"
          component={PokemonCatalog}
          options={{title: 'Pokemon List', ...transitionOptions}}
        />
        <Stack.Screen
          name="PokemonView"
          component={PokemonView}
          options={{title: 'Pokemon Details', ...transitionOptions}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
