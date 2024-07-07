import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Colors, Typographies} from "../constants/Theming";
import {useNavigation} from "@react-navigation/native";

export default function KTextButton({text, screenName = null}) {
    const {navigate} = useNavigation()
    return (
        <TouchableOpacity onPress={() => {
            navigate(screenName)
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