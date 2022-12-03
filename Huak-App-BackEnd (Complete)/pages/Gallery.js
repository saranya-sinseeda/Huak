import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Gallery = () => {
    const navigation = useNavigation();
    return (
        <View style = { styles.container }>
            <Text style = { styles.galleryText }>Your Gallery</Text>

            <TouchableOpacity style = { styles.viewTask }
            onPress = {() => navigation.navigate('Prepost', {} )}>
            <Image source = { require('../assets/plus.png')}
            style = {
                {
                    height: 25,
                    width: 25,
                }
            }/>
            </TouchableOpacity>
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ede9a3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewTask: {
        position: 'absolute',
        right: 10,
        height: 55,
        width: 55,
        backgroundColor: '#1b8057',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
          width: 0,
          height: 5
        },
        bottom: 10
    },
    galleryText: {
        alignItems: 'center',
        color: '#1b8057',
        justifyContent: 'center'
    }

});

export default Gallery