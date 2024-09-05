import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LandingScreen from "../screens/LandingScreen";
import FilterScreen from "../screens/FilterScreen";
import {useEffect, useState} from "react";
import {auth} from "../../firebase/config";
import {onAuthStateChanged} from "firebase/auth";
import {NavigationContainer} from "@react-navigation/native";
import {MyContext} from "../../context/MyContext";
import DoExerciseScreen from "../screens/DoExerciseScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="FilterScreen" component={FilterScreen}/>
            <Stack.Screen name="DoExerciseScreen" component={DoExerciseScreen}/>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
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
    const [exerciseList, setExerciseList] = useState([]);
    const [selectedDropdownType, setSelectedDropdownType] = useState([]);
    const [selectedDropdownMuscle, setSelectedDropdownMuscle] = useState([]);
    const [selectedDropdownDifficulty, setSelectedDropdownDifficulty] = useState([]);

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
        <MyContext.Provider value={{
            exerciseList, setExerciseList,
            selectedDropdownType, setSelectedDropdownType,
            selectedDropdownMuscle, setSelectedDropdownMuscle,
            selectedDropdownDifficulty, setSelectedDropdownDifficulty
        }}>
            <NavigationContainer>
                {isLogged ? <AppStack/> : <AuthStack/>}
            </NavigationContainer>
        </MyContext.Provider>
    );
};

export default Navigation;
