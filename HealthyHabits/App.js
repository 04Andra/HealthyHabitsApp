import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Navigation from './src/navigation/Navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts} from 'expo-font';
import {Colors} from "./constants/Theming";
import LandingScreen from "./src/screens/LandingScreen";
import {useState} from "react";

const Stack = createNativeStackNavigator();

export default function App() {
    let [fontsLoaded] = useFonts({
        'my_font': require('./assets/fonts/my_font.ttf'),
    });

    if (!fontsLoaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.dark_blue}/>
            </View>
        );
    }

    return (
        <Navigation/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
