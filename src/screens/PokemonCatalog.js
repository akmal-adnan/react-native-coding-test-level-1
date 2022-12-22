import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { getRequest } from "../services/PokeApi";

const PokemonCatalog = ({ setScreen, setPokeId }) => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    getApi(signal);

    return () => {
      abortController.abort();
    };
  }, [page]);

  const getApi = async (signal) => {
    setLoading(true);
    let path = `pokemon?limit=10&offset=${page}`;

    try {
      let res = await getRequest(path, signal);
      setDataList(res);
      setLoading(false);
    } catch (error) {
      console.log("Cant request:", error);
    }
  };

  const renderHeader = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ paddingBottom: 10 }}>Pokemon Catalog</Text>
        <Button title="Go to Main Screen" onPress={() => setScreen("main")} />
      </View>
    );
  };

  const renderCard = ({ item }) => {
    return (
      <View style={styles.card__container}>
        <Text style={styles.pokemon__name}>{item.name}</Text>

        <TouchableOpacity
          style={styles.view__button}
          onPress={() => {
            setScreen("ViewPokemon"), setPokeId(item.name);
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>View</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.paging__container}>
        <TouchableOpacity
          disabled={page < 1 && true}
          onPress={() => setPage(page - 10)}
          style={styles.paging__btn}
        >
          <Text style={{ fontSize: 16 }}>Previous</Text>
        </TouchableOpacity>

        {loading && (
          <View style={{ justifyContent: "center" }}>
            <Text>Loading...</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => setPage(page + 10)}
          style={styles.paging__btn}
        >
          <Text style={{ fontSize: 16 }}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.main__container}>
      {renderHeader()}
      {renderPagination()}

      <FlatList
        data={dataList?.results}
        style={{ paddingHorizontal: 10 }}
        contentContainerStyle={{ paddingTop: 15, paddingBottom: 100 }}
        keyExtractor={(item) => `${item.url}`}
        renderItem={renderCard}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default PokemonCatalog;

const styles = StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  card__container: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    height: 150,
    borderColor: "#8EA0AA",
    backgroundColor: "#E8EBF2",
    justifyContent: "center",
    alignItems: "center",
  },

  pokemon__name: {
    textTransform: "capitalize",
    fontSize: 16,
    marginBottom: 10,
  },

  view__button: { backgroundColor: "#9D3675", padding: 8, borderRadius: 6 },

  paging__container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 19,
    paddingBottom: 8,
  },

  paging__btn: {
    alignItems: "center",
    backgroundColor: "#E8EBF2",
    padding: 10,
    borderRadius: 6,
    width: 85,
  },
});
