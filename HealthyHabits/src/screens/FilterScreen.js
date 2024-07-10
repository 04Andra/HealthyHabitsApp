import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {Colors, Typographies} from "../../constants/Theming";
import {fetchDataGetExercise} from "../../fetchData/FetchDataExercises";
import {MyContext} from "../../context/MyContext";
import {useContext, useEffect, useState} from "react";
import KSelectList from "../../components/KSelectList";
import KNavigateButton from "../../components/KNavigateButton";
import KGoBackButton from "../../components/KGoBackButton";

export default function FilterScreen({navigation}) {

    const backgroundImage = require('../../assets/images/chooseExercice.png');
    const {exerciseList, setExerciseList} = useContext(MyContext);
    const [typeList, setTypeList] = useState([]);
    const [muscleList, setMuscleList] = useState([]);
    const [difficultyList, setDifficultyList] = useState([]);
    const {selectedDropdownType, setSelectedDropdownType} = useContext(MyContext);
    const {selectedDropdownMuscle, setSelectedDropdownMuscle} = useContext(MyContext);
    const {selectedDropdownDifficulty, setSelectedDropdownDifficulty} = useContext(MyContext);

    useEffect(() => {
        const loadExercises = async () => {
            const exercises = await fetchDataGetExercise();
            setExerciseList(exercises);
            const uniqueTypes = [...new Set(exercises.map((item) => item.type))];
            setTypeList(uniqueTypes);
            const uniqueMuscle = [...new Set(exercises.map((item) => item.muscle))];
            setMuscleList(uniqueMuscle);
            const uniqueDifficulty = [...new Set(exercises.map((item) => item.difficulty))];
            setDifficultyList(uniqueDifficulty);
        };
        loadExercises().then();

        setSelectedDropdownType(null);
        setSelectedDropdownMuscle(null);
        setSelectedDropdownDifficulty(null);
    }, []);

    const verifyExercise = () => {
        if (selectedDropdownType !== null || selectedDropdownMuscle !== null || selectedDropdownDifficulty !== null) {
            navigation.navigate('DoExerciseScreen');
        } else {
            alert('You need to choose at least one filter!')
        }
    }

    return (
        <ImageBackground source={backgroundImage} resizeMode={'cover'} style={filterStyles.imageView}>
            <View style={filterStyles.titleContainer}>
                <Text style={[Typographies.title_text, filterStyles.titleText]}>Let's start!</Text>
            </View>
            <View style={filterStyles.filterContainer}>
                <KSelectList list={typeList} iconName={'dumbbell'} text={'Choose a type'}/>
                <KSelectList list={muscleList} iconName={'arm-flex'} text={'Choose a muscle'}/>
                <KSelectList list={difficultyList} iconName={'stairs-up'} text={'Choose difficulty'}/>
            </View>
            <View style={filterStyles.buttonsContainer}>
                <View style={{flex: 1, alignItems: 'flex-start', paddingLeft: 30}}>
                    <KGoBackButton text={'BACK'}/>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 30}}>
                    <KNavigateButton text={'NEXT'} action={verifyExercise}/>
                </View>
            </View>
        </ImageBackground>
    )
}

const filterStyles = StyleSheet.create({
    imageView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        color: Colors.dark_blue
    },
    filterContainer: {
        flex: 1
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 30
    },
})