import { useEffect } from "react";
import { Image, ScrollView, Share, StyleSheet, Text, View } from "react-native";
import { Colors } from "../util/Colors";
import MyAppText from "../components/MyAppText ";
import StarsRateing from "../components/StarsRateing";
import { StringHelper } from "../util/strings";

const AnimeDetail = ({ route, navigation }) => {
  const animeItem = route.params.anime;
  const shouldShare = route.params?.share;

  const url = animeItem.trailer ? `${animeItem?.trailer.url}` : null;
  const title = "Anime shareing";
  const message = `anime title: ${animeItem?.title} watch the trailer too:`;
  useEffect(() => {
    if (shouldShare) {
      share();
      navigation.setParams({ share: false });
    }
  }, [shouldShare]);

  const checkImageUrl = () => {
    const large = animeItem.trailer ? animeItem.trailer.images.large_image_url : null;
    const medium = animeItem.trailer ? animeItem.trailer.images.medium_image_url : null;
    const small = animeItem.trailer ? animeItem.trailer.images.small_image_url : null;

    return large || medium || small || null;
  }

  const share = async () => {
    try {
      await Share.share({ message, title, url });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.container}>
        {checkImageUrl ? (
          <View style={styles.videoBlock}>
            <Image
              style={styles.image}
              source={{ uri: animeItem.trailer ? animeItem.trailer.images.medium_image_url : null }}
            />
          </View>
        ) : null}
        <View style={styles.description}>
          {animeItem.type ? <MyAppText style={styles.text}>{StringHelper.type}{animeItem.type}</MyAppText> : null}
          {animeItem.rank ? <MyAppText style={styles.text}>{StringHelper.rank}:{animeItem.rank}</MyAppText> : null}
        </View>
        {animeItem.status ? <MyAppText style={styles.status}>{StringHelper.status}:{animeItem.status}</MyAppText> : null}

        {animeItem.rateing || animeItem.score ? <MyAppText style={styles.rating}>{StringHelper.rateing}:</MyAppText> : null}
        {animeItem.rateing || animeItem.score ? <StarsRateing rateing={animeItem.score || animeItem.rateing} /> : null}
        <View style={styles.descriptionContainer}>
          <Text>{animeItem.synopsis || animeItem.description} </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AnimeDetail;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 20,
    backgroundColor: Colors.backgroundScreen,
  },
  videoBlock: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    overflow: "hidden",
    height: 300,
    width: "90%",
    borderRadius: 8,
  },
  container: {
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  description: {
    flexDirection: "row",
    marginTop: 8,
    width: "100%",
    paddingHorizontal: 24,
    justifyContent: "space-between",
    marginBottom: 24,
  },
  rating: { fontSize: 14, marginTop: 16, marginBottom: 8 },
  status: {
    fontSize: 18,
  },
  text: {
    fontSize: 18,
  },
  descriptionContainer: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "white",
  },
});
