import { View, Alert, StyleSheet, Pressable, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { ToastMsg } from '../util/strings';
import { Colors } from "../util/Colors";

const ImagePickerProfile = () => {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPremission, requestPremission] = useCameraPermissions();
    const [pickerResponse, setPickerResponse] = useState(null);
    useEffect(() => {
        const fetchImage = async () => {
            const profileImage = await AsyncStorage.getItem('profilePicture');
            if (profileImage) {
                setPickedImage(`data:image/jpeg;base64,${profileImage}`)
            }
        }
        fetchImage();
    }, []);

    const verifyPremission = async () => {
        if (cameraPremission.status === PermissionStatus.UNDETERMINED) {
            const premissionResponse = await requestPremission();

            return premissionResponse.granted;
        }

        if (cameraPremission.status === PermissionStatus.DENIED) {
            Alert.alert('Premission to camera failed', 'You need to grant camera premissions');
            return false;
        }

        return true;
    }

    const takeImageHandler = async () => {
        const hasPremission = await verifyPremission();

        if (!hasPremission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
        });
        if (image.cancelled)
            return;
        Toast.show(ToastMsg.imageAdded, {
            duration: 1000,
        })
        const base64 = await FileSystem.readAsStringAsync(image.uri, { encoding: 'base64' });
        AsyncStorage.setItem('profilePicture', base64)
        setPickedImage(`data:image/jpeg;base64,${base64}`);
    }
    let imagePreview = <Image source={require('../assets/plus.png')} style={styles.imagePlus} tintColor='red' />
    if (pickedImage) {
        imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
    }

    return (
        <View style={styles.circle}>
            <Pressable onPress={takeImageHandler}>
                <View style={styles.contrainerLayer3}>
                    <View style={styles.contrainerLayer2}>
                        <View style={styles.container}>
                            <View style={styles.icon}>
                                {imagePreview}
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}
export default ImagePickerProfile;

const styles = StyleSheet.create({
    circle: {
        alignItems: 'center',
        marginTop: 70
    },
    container: {
        borderRadius: 100,
        width: 150,
        height: 150,
        backgroundColor: 'darkgrey',
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    contrainerLayer2: {
        borderRadius: 100,
        borderWidth: 5,
        borderColor: Colors.darkBlue,
    },
    contrainerLayer3: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.75,
        shadowRadius: 10,
    },
    image: {
        borderRadius: 100,
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    imagePlus: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    }
});