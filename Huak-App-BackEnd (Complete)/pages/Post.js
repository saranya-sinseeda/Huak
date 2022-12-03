import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
//หน้าpostตรงนี้เราใส่ไปเฉยๆ หากเพื่อนไม่ใช้ลบได้เลย

const Post = () => {
    const navigation = useNavigation();
    return(
        <View style = { styles.container}>
            <Text>Post</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ede9a3',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Post