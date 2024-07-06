import {Button, Image, StyleSheet, View} from "react-native";
import {Colors} from "../../constants/Theming";
import KNavigateButton from "../../components/KNavigateButton";
import {auth} from "../../firebase/config"
import {signOut} from "@firebase/auth";

export default function LandingScreen({navigation}) {

    const logoImage = require('../../assets/images/logo.png');

    return (
        <View style={landingStyles.container}>
            <Image source={logoImage} resizeMode={"cover"}/>
            <View>
                <KNavigateButton text={'NEXT'} screenName={'LoginScreen'}/>
            </View>
        </View>
    )
}

const landingStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light_blue,
    }
});