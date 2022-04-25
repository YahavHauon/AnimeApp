import { View, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../util/Colors';
import MyAppText from './MyAppText ';

const Button = ({ children, onPress, style, disable }) => {
    return (
        <View style={style}>
            <Pressable style={({ pressed }) => pressed ? styles.pressed : null} onPress={onPress}>
                <View style={disable ? styles.disable : styles.button}>
                    <MyAppText style={styles.buttonText}>
                        {children}
                    </MyAppText>
                </View>
            </Pressable>
        </View>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        padding: 10,
        backgroundColor: Colors.customButtonColor,
        width: 160,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75,
    },
    disable: {
        borderRadius: 6,
        padding: 10,
        backgroundColor: 'gray',
        width: 160,
    }
})