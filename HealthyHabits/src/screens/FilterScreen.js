import {ImageBackground, StyleSheet, Text, View} from "react-native";
import backgroundImage from "../../assets/images/upBg.png";
import {Colors, Typographies} from "../../constants/Theming";

export default function FilterScreen({navigation}) {

    const backgroundImage = require('../../assets/images/chooseExercice.png');

    return(
        <ImageBackground source={backgroundImage} resizeMode={'cover'} style={filterStyles.imageView}>
            <View style={filterStyles.titleContainer}>
                <Text style={[Typographies.title_text]}>Let's start!</Text>
            </View>
            <View style={filterStyles.filterContainer}></View>
            <View style={filterStyles.buttonsContainer}></View>
        </ImageBackground>
        )
}

const filterStyles = StyleSheet.create({
    imageView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        color: Colors.dark_blue
    },
    filterContainer: {
        flex: 1
    },
    buttonsContainer: {
        flex: 1
    }
})