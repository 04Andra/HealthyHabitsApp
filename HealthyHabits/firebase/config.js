import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {getDatabase} from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyDMhkGE-0bZCA3e1OVDwerg9wIrC2kEMc0",
    authDomain: "healthyhabitsfinal.firebaseapp.com",
    projectId: "healthyhabitsfinal",
    storageBucket: "healthyhabitsfinal.appspot.com",
    messagingSenderId: "410426838899",
    appId: "1:410426838899:web:410ce6df4433c4c7e27f06"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const database = getDatabase(app);

export {auth, database}