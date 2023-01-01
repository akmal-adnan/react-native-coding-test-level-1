import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
} from 'react-native';
import {getRequest} from '../services/PokeApi';

function PokemonView({setScreen, pokeId}) {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const {signal} = abortController;
    getApi(signal);

    return () => {
      abortController.abort();
    };
  }, []);

  const getApi = async signal => {
    setLoading(true);
    const path = `pokemon/${pokeId}`;

    try {
      const res = await getRequest(path, signal);
      setDataList(res);
      setLoading(false);
    } catch (error) {
      console.log('Cant request:', error);
    }
  };

  const renderHeader = () => (
    <View style={{alignItems: 'center'}}>
      <Text style={{paddingBottom: 10}}>Pokemon Details</Text>
      <Button title="Go Back" onPress={() => setScreen('catalog')} />
    </View>
  );

  const renderContent = () => (
    <View style={{alignItems: 'center', marginTop: 50}}>
      <Image
        style={styles.image__style}
        source={{
          uri: dataList.sprites?.other['official-artwork'].front_default,
        }}
      />

      <View style={{paddingTop: 20}}>
        <Text style={styles.text__desc}>
          Id: {loading ? 'loading...' : dataList.id}
        </Text>
        <Text style={styles.text__desc}>
          Name: {loading ? 'loading...' : dataList.name}
        </Text>
        <Text style={styles.text__desc}>
          Height: {loading ? 'loading...' : dataList.height}
        </Text>
        <Text style={styles.text__desc}>
          Weight: {loading ? 'loading...' : dataList.weight}
        </Text>

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text__desc}>
            Types: {loading && 'loading...'}
          </Text>
          {dataList.types?.map(item => (
            <View key={item.slot}>
              <Text style={styles.text__desc}>{item.type.name},</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.main__container}>
      {renderHeader()}
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
  text__desc: {padding: 2, fontSize: 16},

  image__style: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
