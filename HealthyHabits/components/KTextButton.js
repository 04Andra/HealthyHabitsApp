import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Colors, Typographies} from "../constants/Theming";

export default function KTextButton({text, action, navigation, screenName}) {
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate(screenName)
        }}>
            <Text style={[KTextButtonStyles.textStyle, Typographies.normal_text]}>{text}</Text>
        </TouchableOpacity>
    )
}

const KTextButtonStyles = StyleSheet.create({
    textStyle: {
        color: Colors.dark_blue,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark_blue
    }
})