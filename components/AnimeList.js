import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, StyleSheet } from "react-native";
import GeneralContext from "../store/GeneralContext";
import AnimeItem from "./AnimeItem";
import { Colors } from "../util/Colors";

const AnimeList = () => {
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  const { animeList, fetchAnime, isLoading } = useContext(GeneralContext);

  useEffect(() => {
    fetchAnime(page);
  }, [page]);

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  const animeDetailHandler = (anime) => {
    navigation.navigate("AnimeDetail", { anime });
  };

  const listRenderItem = ({ item }) => {
    return (
      <AnimeItem
        imageUrl={item.images?.jpg.image_url}
        title={item.title}
        onPress={() => animeDetailHandler(item)}
        modePressed="true"
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => {
          return item.mal_id;
        }}
        data={animeList}
        renderItem={listRenderItem}
        onEndReachedThreshold={0.2}
        onEndReached={() => fetchMoreData()}
      />

      {isLoading ? (
        <ActivityIndicator
          color={Colors.skyblue}
          style={styles.loader}
          size={"large"}
        />
      ) : null}
    </View>
  );
};

export default AnimeList;

const styles = StyleSheet.create({
  container: { flex: 1 },
  loading: {
    alignItems: "center",
  },
  loader: { position: "absolute", top: 0, bottom: 0, right: 0, left: 0 },
});
