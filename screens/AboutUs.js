import { Linking, StyleSheet, View, Image, ScrollView } from "react-native";
import LottieView from 'lottie-react-native';
import IconButton from "../components/IconButton";
import MyAppText from "../components/MyAppText ";
import { StringHelper } from "../util/strings";
const instagram = "https://www.instagram.com/instagram/";
const facebook = "http://facebook.com";

const OpenUrlIcon = ({ url, icon, color }) => {
    const handlePress = async () => {
        await Linking.openURL(url);
    }
    return <IconButton icon={icon} onPress={handlePress} color={color} size={50} />;
};


const AboutUs = () => {
    return (
        <ScrollView>
            <View style={styles.rootContainer}>
                <Image source={require('../assets/default-picture.jpg')} style={styles.image} />
                <View style={styles.descriptionContainer}>
                    <MyAppText>{StringHelper.descriptionAboutUs}</MyAppText>
                </View>
                <View style={styles.container}>
                    <LottieView source={require('../assets/81450-team.json')} autoPlay loop />
                </View>
                <View style={styles.logos}>
                    <OpenUrlIcon url={instagram} icon="logo-instagram" />
                    <OpenUrlIcon url={facebook} icon="logo-facebook" />
                </View>
            </View>
        </ScrollView>
    );
}

export default AboutUs;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center'
    },
    container: {
        marginTop: 0,
        width: 350,
        height: 350,
    },
    logos: {
        flexDirection: 'row',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
    },
    descriptionContainer: {
        width: '90%',
        borderWidth: 0.5,
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        backgroundColor: 'white'
    }
})