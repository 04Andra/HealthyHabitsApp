import {ImageBackground, StyleSheet, Text, View} from "react-native";
import backgroundImage from "../../assets/images/doExercice.png";

export default function ProfileScreen() {

    const backgroundImage = require('../../assets/images/downBg.png');

    return (
        <ImageBackground source={backgroundImage} resizeMode={'cover'} style={profileStyle.imageView}>
            <View style={profileStyle.titleContainer}></View>
            <View style={profileStyle.recipesContainer}></View>
            <View style={profileStyle.buttonStyle}></View>
        </ImageBackground>
        )
}

const profileStyle = StyleSheet.create({
    imageView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1
    },
    recipesContainer: {
        flex: 1
    },
    buttonStyle: {
        flex: 1
    }
})