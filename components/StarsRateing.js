import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const StarsRateing = ({ rateing }) => {

    const [stars, setStars] = useState([]);
    const rateingRounded = Math.round(rateing);
    useEffect(() => {
        const array = [];
        for (let i = 1; i <= 10; i++) {
            if (i <= rateingRounded)
                array.push("star");
            else
                array.push("star-outline");
        }

        setStars(array);
    }, [])
    return (
        <View style={styles.container}>
            {stars.map((star) => <Ionicons name={star} size={32} color="yellow" />)}
        </View>
    );
};

export default StarsRateing;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 20,
    }
});