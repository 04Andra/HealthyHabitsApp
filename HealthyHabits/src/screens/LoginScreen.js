import {Button, ImageBackground, StyleSheet, Text, View} from "react-native";
import {Colors, Typographies} from "../../constants/Theming";
import {useCallback, useState} from "react";
import KTextInput from "../../components/KTextInput";
import KSpacer from "../../components/KSpacer";
import KNavigateButton from "../../components/KNavigateButton";
import KTextButton from "../../components/KTextButton";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from '../../firebase/config'

export default function LoginScreen({navigation}) {

    const backgroundImage = require('../../assets/images/upBg.png');
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const onPressSubmit = useCallback(({email, password}) => {
        if (email.length > 0 && password.length > 0) {
            signInWithEmailAndPassword(auth, email, password).catch(err => alert("Username or password incorrect!"));
        } else {
            alert('Empty fields!');
        }
    }, []);

    return (
        <ImageBackground source={backgroundImage} resizeMode={'cover'} style={loginStyles.imageView}>
            <View style={loginStyles.titleContainerStyle}>
                <Text style={[loginStyles.titleStyle, Typographies.title_text]}>Welcome back!</Text>
            </View>
            <View style={loginStyles.inputContainerStyle}>
                <KTextInput iconName={'user'}
                            textInput={usernameInput}
                            setTextInput={setUsernameInput}
                            placeholder={'Enter your username...'}/>
                <KTextInput iconName={'lock'}
                            textInput={passwordInput}
                            setTextInput={setPasswordInput}
                            secureTextEntry={true}
                            placeholder={'Enter your password...'}/>
            </View>
            <View style={loginStyles.buttonContainerStyle}>
                <KSpacer height={10}/>
                <KNavigateButton text={'LOGIN'} action={() => {
                    try {
                        onPressSubmit({email: usernameInput, password: passwordInput})
                    } catch (error) {
                        console.log(error.toString())
                    }
                }}/>
                <Text style={[Typographies.normal_text, loginStyles.accountText]}>Don't have an account?</Text>
                <KTextButton navigation={navigation}
                             text={'Register'}
                             screenName={'RegisterScreen'}/>
            </View>
        </ImageBackground>
    )
}

const loginStyles = StyleSheet.create({
    imageView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainerStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    inputContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    buttonContainerStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titleStyle: {
        color: Colors.dark_blue,
        paddingBottom: 50
    },
    accountText: {
        color: Colors.dark_blue,
        paddingTop: 20
    }
})