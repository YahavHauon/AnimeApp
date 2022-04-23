import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MyAppText from "./MyAppText ";
const DrawerShelf = ({ onPress, iconName, size, color, title }) => {
    return (
        <Pressable onPress={onPress} >
            <View style={styles.outterContainer} >
                <LinearGradient colors={['#3A5F7E', '#92B3CF', '#3A5F7E']} style={styles.container}>
                    <Ionicons name={iconName} size={size} color={color} />

                    <View style={styles.textContainer}>
                        <MyAppText style={styles.text}>{title}</MyAppText>
                    </View>
                </LinearGradient>
            </View>
        </Pressable>
    );
}

export default DrawerShelf;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        width: '100%',
    },
    outterContainer: {
        borderTopWidth: 0.5,
        borderBottomColor: 'white',
        borderTopColor: 'white',
    },
    text: {
        fontSize: 15,
        color: 'white',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 1,
    },
    textContainer: {
        marginLeft: 15,
        marginTop: 3,
    }
});