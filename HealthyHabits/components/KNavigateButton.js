import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Colors, Typographies} from "../constants/Theming";
import {useNavigation} from "@react-navigation/native";

export default function KNavigateButton({text, screenName = null, action = () => {}}) {
    const {navigate, goBack} = useNavigation()
    return (
        <TouchableOpacity style={KButtonStyles.container} onPress={() => {
            if (screenName !== null) {
                navigate(screenName)
            }
            action()
        }}>
            <Text style={[KButtonStyles.textStyle, Typographies.normal_text]}>{text}</Text>
        </TouchableOpacity>
    )
}

const KButtonStyles = StyleSheet.create({
    container: {
        width: 120,
        height: 45,
        backgroundColor: Colors.dark_blue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    textStyle: {
        color: Colors.white
    }
});