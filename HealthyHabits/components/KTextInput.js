import {Colors, Typographies} from "../constants/Theming";
import {StyleSheet, TextInput, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function KTextInput({iconName, textInput, setTextInput, placeholder, secureTextEntry = false}) {
    return (
        <View style={KTextInputStyles.container}>
            <FontAwesome name={iconName} size={24} style={KTextInputStyles.iconStyle}/>
            <TextInput onChangeText={setTextInput}
                       placeholder={placeholder}
                       value={textInput}
                       secureTextEntry={secureTextEntry}
                       style={[KTextInputStyles.textStyle, Typographies.normal_text]}
                       placeholderTextColor={Colors.middle_blue}/>
        </View>
    )
}

const KTextInputStyles = StyleSheet.create({
    container: {
        width: '70%',
        flexDirection: 'row',
        height: '20%',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark_blue
    },
    iconStyle: {
        color: Colors.dark_blue,
        paddingRight: 8,
        paddingBottom: 8
    },
    textStyle: {
        width: '100%',
        paddingBottom: 5,
        color: Colors.dark_blue
    }
})