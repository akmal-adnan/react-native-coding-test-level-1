import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ContactScreen from './src/screens/ContactScreen';
import MainScreen from './src/screens/MainScreen';
import PokemonCatalog from './src/screens/PokemonCatalog';
import PokemonView from './src/screens/PokemonView';

function App() {
  const [screen, setScreen] = useState('main');
  const [pokeId, setPokeId] = useState('');

  const a = 'asss';

  return (
    <View style={styles.container}>
      {screen === 'main' ? (
        <MainScreen setScreen={setScreen} />
      ) : screen === 'contact' ? (
        <ContactScreen setScreen={setScreen} />
      ) : screen === 'catalog' ? (
        <PokemonCatalog setScreen={setScreen} setPokeId={setPokeId} />
      ) : (
        <PokemonView
          setScreen={setScreen}
          setPokeId={setPokeId}
          pokeId={pokeId}
        />
      )}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
