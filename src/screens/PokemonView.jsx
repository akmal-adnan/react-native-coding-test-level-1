import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import {getRequest} from '../services/PokeApi';

const TypeColor = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

function PokemonView({route}) {
  const {pokeId} = route.params;
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const {signal} = abortController;
    getApi(signal);

    return () => {
      abortController.abort();
    };
  }, []);

  const getApi = async signal => {
    const path = `pokemon/${pokeId}`;

    try {
      const res = await getRequest(path, signal);
      setDataList(res);
    } catch (error) {
      console.log('Cant request:', error);
    }
  };

  const renderContent = () => (
    <View style={{alignItems: 'center', marginTop: 30}}>
      <Image
        style={styles.image__style}
        source={{
          uri: dataList.sprites?.other['official-artwork'].front_default,
        }}
      />

      <View style={styles.container__desc}>
        <Text style={styles.title__name}>{dataList?.name}</Text>

        <View style={styles.desc__details}>
          <Text style={styles.text__desc}>Id: {dataList?.id}</Text>
          <Text style={styles.text__desc}>Name: {dataList?.name}</Text>
          <Text style={styles.text__desc}>Height: {dataList?.height}</Text>
          <Text style={styles.text__desc}>Weight: {dataList?.weight}</Text>

          <View style={styles.moves__container}>
            <Text style={{...styles.text__desc, paddingTop: 12}}>Moves:</Text>
            <View style={styles.moves__details}>
              {dataList.moves?.slice(0, 4).map(item => (
                <View key={item.move.url} style={styles.moves__list}>
                  <Text
                    style={{...styles.text__desc, textTransform: 'capitalize'}}>
                    {item.move.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.types__container}>
            <Text style={{...styles.text__desc, paddingRight: 10}}>Types:</Text>
            {dataList.types?.map(item => (
              <View key={item.slot} style={styles.types__list(item.type.name)}>
                <Text
                  style={{
                    ...styles.text__desc,
                    textTransform: 'capitalize',
                    color: 'white',
                  }}>
                  {item.type.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.main__container}>
      {renderContent()}
    </SafeAreaView>
  );
}

export default PokemonView;

const styles = StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  image__style: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },

  title__name: {
    paddingVertical: 10,
    alignSelf: 'center',
    textTransform: 'capitalize',
    fontSize: 20,
  },

  desc__details: {paddingHorizontal: 20, paddingTop: 5},

  text__desc: {padding: 2, fontSize: 16},

  container__desc: {
    backgroundColor: '#EDE9D0',
    width: '100%',
    height: '100%',
    marginTop: 60,
    borderRadius: 25,
  },

  moves__container: {flexDirection: 'row', marginTop: 4},

  moves__details: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingRight: 25,
  },

  moves__list: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginHorizontal: 2.5,
    marginVertical: 2.5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#B5B19A',
    backgroundColor: '#F8F2CB',
  },

  types__container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  types__list: type => ({
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: TypeColor[type],
  }),
});
