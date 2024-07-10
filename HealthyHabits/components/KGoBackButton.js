import {useNavigation} from "@react-navigation/native";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Colors, Typographies} from "../constants/Theming";

export default function KGoBackButton({text}) {
    const {goBack} = useNavigation()
    return (
        <TouchableOpacity style={KGoBackStyles.container} onPress={() => {
            goBack()
        }}>
            <Text style={[KGoBackStyles.textStyle, Typographies.normal_text]}>{text}</Text>
        </TouchableOpacity>
    )
}

const KGoBackStyles = StyleSheet.create({
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