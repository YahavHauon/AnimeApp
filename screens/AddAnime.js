import GeneralContext from '../store/GeneralContext';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AddAnimeForm from '../components/AddAnimeForm';

const AddAnime = ({ navigation }) => {
    const { addAnime } = useContext(GeneralContext);


    const addAnimeHandler = (newAnime) => {
        const mal_id = new Date().toString() + Math.random().toString();
        addAnime({ mal_id, ...newAnime });
        navigation.navigate('MyAnimeList');
    }

    return <View style={styles.container}>
        <View>
            <AddAnimeForm onAdd={addAnimeHandler} />
        </View>
    </View>
}

export default AddAnime;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
});