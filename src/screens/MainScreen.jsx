import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

function MainScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('ContactScreen')}
        style={({pressed}) => styles.contact__button(pressed)}>
        <Text style={{fontSize: 16}}>Contact Us</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('PokemonCatalog')}
        style={({pressed}) => styles.catalog__button(pressed)}>
        <Text style={{fontSize: 16}}>View Catalog</Text>
      </Pressable>
    </View>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contact__button: pressed => ({
    backgroundColor: pressed ? 'gray' : 'lightgray',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 6,
  }),

  catalog__button: pressed => ({
    backgroundColor: pressed ? 'gray' : 'lightgray',
    paddingHorizontal: 9,
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 20,
  }),
});
