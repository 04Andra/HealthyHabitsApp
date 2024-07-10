import {ImageBackground, StyleSheet} from "react-native";

export default function DoExerciseScreen() {

    const backgroundImage = require('../../assets/images/chooseExercice.png');

    return(
        <ImageBackground source={backgroundImage} resizeMode={'cover'} style={doExerciseStyle.imageView}>

        </ImageBackground>
        )
}

const doExerciseStyle = StyleSheet.create({
    imageView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
})