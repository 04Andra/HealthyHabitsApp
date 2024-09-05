import {ref, set, get, remove} from "firebase/database";
import {Alert} from "react-native";
import {auth, database} from "./config";

export function fetchDataAddProfile(days, recipes) {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        const userRef = ref(database, `users/${userId}/profile`);
        set(userRef, {
            days: days,
            recipes: recipes
        })
            .then(() => {
                Alert.alert('Data added successfully');
            })
            .catch(error => {
                Alert.alert('Error', error.message);
            });
    } else {
        Alert.alert('No user is signed in');
    }
}

export function fetchDataGetProfile() {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        const usersRef = ref(database, `users/${userId}/profile`);
        return get(usersRef).then(snapshot => {
            const profileData = snapshot.val()
            if (profileData) {
                return profileData
            } else {
                return [];
            }
        }).catch(error => {
            console.error("Error fetching profile data:", error);
            return [];
        });
    }
}

export function fetchDataDeleteProfile({ id }) {
    const userRef = ref(database, `user/${id}`);
    remove(userRef)
        .then(() => {
            Alert.alert('Data removed successfully');
        })
        .catch(error => {
            Alert.alert('Error', error.message);
        });
}