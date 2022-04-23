import { View, StyleSheet, Pressable, Alert } from "react-native";
import { useContext, useEffect } from "react";
import GeneralContext from "../store/GeneralContext";
import AnimeItem from '../components/AnimeItem';
import { SwipeListView } from "react-native-swipe-list-view";
import { Colors } from "../util/Colors";
import { Ionicons } from '@expo/vector-icons';
import MyAppText from "../components/MyAppText ";
import { StringHelper } from "../util/strings";
import Button from '../components/Button';

const MyAnimeList = ({ navigation }) => {
    const { myAnimeListState, deleteAnime, deleteAllAnime, myAnimeListProvider } = useContext(GeneralContext);

    useEffect(() => {
        myAnimeListProvider();
    }, []);

    const listRenderItem = ({ item }) => {
        return (
            <AnimeItem
                imageUrl={null}
                title={item.title}
                onPress={() => animeDetailHandler(item)}
            />
        );
    };

    const listHiddenRenberItem = (data) => {
        return <Pressable onPress={() => deleteAnime(data.item.mal_id)}>
            <View style={styles.trashSwipe}>
                <Ionicons name="trash" size={40} color="white" />
            </View>
        </Pressable>;
    };
    const animeDetailHandler = (anime) => {
        navigation.navigate("AnimeDetail", { anime });
    };
    const deletAll = () => {
        Alert.alert(
            'Are you sure ?',
            'pressing yes will delete all your list forever',
            [
                { text: 'Im gay' },
                { text: 'Sure', onPress: () => deleteAllAnime() }
            ]);
    }
    return (
        <View style={[styles.container, myAnimeListState.length === 0 ? styles.justifyCenter : null]}>
            {myAnimeListState.length > 0 ? <Button style={styles.button} onPress={deletAll}>Delete all</Button> : null}
            {myAnimeListState.length > 0 ? <SwipeListView
                data={myAnimeListState}
                renderItem={listRenderItem}
                renderHiddenItem={listHiddenRenberItem}
                keyExtractor={(item) => item.mal_id}
                leftOpenValue={100}
                disableLeftSwipe
                directionalDistanceChangeThreshold={1}
            /> : <View style={styles.noAddedYet}>
                <MyAppText>{StringHelper.emptyList}</MyAppText>
            </View>
            }
        </View>
    );
};

export default MyAnimeList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    trashSwipe: {
        alignItems: 'center',
        paddingLeft: 30,
        flexDirection: 'row',
        width: 350,
        height: 90,
        backgroundColor: Colors.headerAppColor,
        marginLeft: 8,
        borderRadius: 8
    },
    noAddedYet: {
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        marginBottom: 16,
    }
});