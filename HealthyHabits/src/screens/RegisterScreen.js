import {Alert, Button, ImageBackground, StyleSheet, Text, View} from "react-native";
import {useCallback, useState} from "react";
import {Colors, Typographies} from "../../constants/Theming";
import KTextInput from "../../components/KTextInput";
import KSpacer from "../../components/KSpacer";
import KNavigateButton from "../../components/KNavigateButton";
import KTextButton from "../../components/KTextButton";
import {auth, database} from "../../firebase/config"
import {createUserWithEmailAndPassword} from '@firebase/auth';
import {ref, set} from 'firebase/database';

export default function RegisterScreen({navigation}) {

    const backgroundImage = require('../../assets/images/upBg.png');
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [rePasswordInput, setRePasswordInput] = useState('');

    const onPressSubmit = useCallback(({email, password, rePassword}) => {
        if (email.length > 0 && password.length > 0 && rePassword.length > 0) {
            if (passwordInput.toString() === rePasswordInput.toString()) {
                createUserWithEmailAndPassword(auth, email, password).then(() => {
                    alert('Account created successfully!');
                }).then(currentUser => {
                    const userId = currentUser.user.uid;
                    const userRef = ref(database, 'userData/' + userId);
                    set(userRef, {
                        email: email,
                    })
                        .catch(error => {
                            console.log('Error', error.message);
                        });
                })
                    .catch(err => console.log(err));
            } else {
                alert('Passwords don\'t match!')
            }
        } else {
            alert('Empty fields!');
        }
    }, []);

    return (
        <ImageBackground source={backgroundImage} resizeMode={'cover'} style={registerStyles.imageView}>
            <View style={registerStyles.titleContainerStyle}>
                <Text style={[registerStyles.titleStyle, Typographies.title_text]}>Welcome to your fit journey!</Text>
            </View>
            <View style={registerStyles.inputContainerStyle}>
                <KTextInput iconName={'user'}
                            textInput={usernameInput}
                            setTextInput={setUsernameInput}
                            placeholder={'Enter your username...'}/>
                <KTextInput iconName={'lock'}
                            textInput={passwordInput}
                            setTextInput={setPasswordInput}
                            secureTextEntry={true}
                            placeholder={'Enter your password...'}/>
                <KTextInput iconName={'lock'}
                            textInput={rePasswordInput}
                            setTextInput={setRePasswordInput}
                            secureTextEntry={true}
                            placeholder={'Retype your password...'}/>
            </View>
            <View style={registerStyles.buttonContainerStyle}>
                <KSpacer height={10}/>
                <KNavigateButton text={'REGISTER'} action={() => {
                    try {
                        onPressSubmit({email: usernameInput, password: passwordInput, rePassword: rePasswordInput})
                    } catch (error) {
                        console.log(error.toString())
                    }
                }}/>
                <Text style={[Typographies.normal_text, registerStyles.accountText]}>Already have an account?</Text>
                <KTextButton navigation={navigation} text={'Login'} screenName={'LoginScreen'} action={() => {
                    onPressSubmit({email: usernameInput, password: passwordInput, rePassword: rePasswordInput})
                }}/>
            </View>
        </ImageBackground>
    )
}

const registerStyles = StyleSheet.create({
    imageView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainerStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '70%'
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
        paddingBottom: 20,
        textAlign: 'center'
    },
    accountText: {
        color: Colors.dark_blue,
        paddingTop: 20
    }
})