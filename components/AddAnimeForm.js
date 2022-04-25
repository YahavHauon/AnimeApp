import { View, StyleSheet, Pressable, Keyboard, Alert } from 'react-native';
import Input from './Input';
import { AlertMsgs, StringHelper, ToastMsg } from '../util/strings';
import MyAppText from './MyAppText ';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Toast from 'react-native-root-toast';

const AddAnimeForm = ({ onAdd }) => {
    const [inputValues, setInputValues] = useState({
        title: '',
        rateing: '',
        description: '',
    });
    const [addButtonValid, setAddButtonValid] = useState(false);
    const animeData = {
        title: inputValues.title ? inputValues.title : '',
        rateing: +inputValues.rateing,
        description: inputValues.description,
    }
    useEffect(() => {
        const titleIsValid = animeData.title.trim().length > 0;
        if (animeData.title.trim().length === 0) {
            setAddButtonValid(false);
        }
        if (animeData.title.trim().length === 1) {
            setAddButtonValid(true);
        }

    }, [inputValues]);
    const inputChangeHandler = (inputIdentifier, enteredValue) => {
        setInputValues((currInputValues) => {
            return {
                ...currInputValues,
                [inputIdentifier]: enteredValue
            }
        })
    }

    const sumbitHandler = () => {
        onAdd(animeData);
        clearHandler();
        Toast.show(ToastMsg.animeAdded, {
            duration: 1000,
        })
    }

    const invalidAddButton = () => {
        Alert.alert(AlertMsgs.inputMissingTitle, AlertMsgs.inputMissingBody);
    }

    const clearHandler = () => {
        setInputValues({ value: '' })
    }

    return (
        <Pressable onPress={Keyboard.dismiss}>
            <View style={styles.title}>
                <MyAppText style={styles.titleText}>Add New Anime</MyAppText>
            </View>
            <View style={styles.upeerInput}>
                <Input label={StringHelper.title} style={styles.rowInput} textInputConfig={{
                    placeholder: 'enter the anime title',
                    onChangeText: inputChangeHandler.bind(this, 'title'),
                    value: inputValues.title,
                }} />
                <Input label={StringHelper.rateing + ':'} style={styles.rowInput} textInputConfig={{
                    placeholder: 'enter the anime rateing',
                    onChangeText: inputChangeHandler.bind(this, 'rateing'),
                    keyboardType: 'decimal-pad',
                    value: inputValues.rateing,
                }} />
            </View>
            <Input label={StringHelper.description} multiline='true' textInputConfig={{
                placeholder: 'enter the anime description',
                onChangeText: inputChangeHandler.bind(this, 'description'),
                maxLength: 100,
                multiline: true,
                value: inputValues.description,
            }} />
            <View style={styles.button}>
                <Button style={styles.add} onPress={clearHandler}>{StringHelper.clear}</Button>
                {addButtonValid ? <Button style={styles.add} onPress={sumbitHandler}>{StringHelper.add}</Button> :
                    <Button style={styles.add} onPress={invalidAddButton} disable>{StringHelper.add}</Button>}
            </View>
        </Pressable>
    );
}

export default AddAnimeForm;

const styles = StyleSheet.create({
    title: {
        marginVertical: 32,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    titleText: {
        textAlign: 'center',
        fontSize: 30,
    },
    upeerInput: {
        flexDirection: 'row',
    },
    rowInput: {
        flex: 1,
    },
    add: {
        marginVertical: 20,
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20,
    },
});