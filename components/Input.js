import { Text, View, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../util/Colors';

const Input = ({ style, label, multiline, textInputConfig }) => {
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={[styles.input, multiline === 'true' ? styles.inputMultiline : null]} {...textInputConfig} />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        marginBottom: 4
    },
    input: {
        backgroundColor: Colors.input,
        minHeight: 35,
        padding: 6,
        borderRadius: 6,
        borderWidth: 0.3,
    },
    inputMultiline: {
        minHeight: 100,
    }
});