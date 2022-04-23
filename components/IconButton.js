import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet } from 'react-native';

const IconButton = ({ icon, size, color, onPress }) => {
    return (
        <Pressable style={({ pressed }) => pressed ? styles.pressed : null} onPress={onPress}>
            <Ionicons name={icon} size={size} color={color} />
        </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    }
});