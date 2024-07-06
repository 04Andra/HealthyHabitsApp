import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LandingScreen from "../screens/LandingScreen";
import FilterScreen from "../screens/FilterScreen";
import {useEffect, useState} from "react";
import {auth} from "../../firebase/config";
import {onAuthStateChanged} from "firebase/auth";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="FilterScreen" component={FilterScreen}/>
        </Stack.Navigator>
    );
};

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LandingScreen" component={LandingScreen}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
        </Stack.Navigator>
    );
};

const Navigation = () => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {

            if (user) {
                setIsLogged(true)
            } else {
                setIsLogged(false)
            }
        })
    }, []);

    return (
        <NavigationContainer>
            {isLogged ? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
    );
};

export default Navigation;
