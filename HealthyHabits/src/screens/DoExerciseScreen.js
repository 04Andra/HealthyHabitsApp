import {
    ImageBackground,
    StyleSheet,
    View,
    Text,
    ScrollView
} from "react-native";
import {Colors, Typographies} from "../../constants/Theming";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {useContext, useEffect, useState} from "react";
import {MyContext} from "../../context/MyContext";
import KSpacer from "../../components/KSpacer";
import KModal from "../../components/KModal";
import KGoBackButton from "../../components/KGoBackButton";
import KNavigateButton from "../../components/KNavigateButton";
import navigation from "../navigation/Navigation";

export default function DoExerciseScreen({navigation}) {

    const backgroundImage = require('../../assets/images/doExercice.png');

    const {exerciseList, setExerciseList} = useContext(MyContext);
    const {selectedDropdownType, setSelectedDropdownType} = useContext(MyContext);
    const {selectedDropdownMuscle, setSelectedDropdownMuscle} = useContext(MyContext);
    const {selectedDropdownDifficulty, setSelectedDropdownDifficulty} = useContext(MyContext);
    const [nameList, setNameList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [isChecked, setIsChecked] = useState({});
    const [exerciseText, setExerciseText] = useState('');
    const [onComplete, setOnComplete] = useState(false);
    const [countdownIcon, setCountdownIcon] = useState('pause');
    const [countdownState, setCountdownState] = useState(true);
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        const filteredList = exerciseList.filter(item => (
            item.type === selectedDropdownType ||
            item.muscle === selectedDropdownMuscle ||
            item.difficulty === selectedDropdownDifficulty
        ));

        const uniqueNames = Array.from(new Set(filteredList.map(item => item.name)));
        setNameList(uniqueNames.slice(0, 5));

    }, [selectedDropdownType, selectedDropdownMuscle, selectedDropdownDifficulty]);

    const handleCheckboxPress = (checked, item) => {
        if (checked) {
            setSelectedItem(item);
            const exercise = exerciseList.find(exercise => exercise.name === item);
            if (exercise) {
                setExerciseText(exercise.instructions);
            }
            setModalVisible(true);
            setCounter(counter + 1)
            console.log(counter)
        } else {
            setSelectedItem('');
            setExerciseText('');
        }
    };

    const verifyExercises = () => {
        // if (counter === 5) {
        //     navigation.navigate('ProfileScreen')
        // } else {
        //     alert('You need to complete all the exercises')
        // }
    }

    return (
        <ImageBackground source={backgroundImage} resizeMode={'cover'} style={doExerciseStyle.imageView}>
            <View style={doExerciseStyle.titleContainer}>
                <Text style={[doExerciseStyle.titleStyle, Typographies.title_text]}>You can do it!</Text>
            </View>
            <View style={{width: '100%'}}>
                <KModal setModalVisible={setModalVisible} exerciseText={exerciseText} modalVisible={modalVisible}
                        setCountdownIcon={setCountdownIcon} setOnComplete={setOnComplete}
                        setCountdownState={setCountdownState} countdownState={countdownState}
                        countdownIcon={countdownIcon} setIsChecked={setIsChecked} onComplete={onComplete}
                        selectedItem={selectedItem}
                        isChecked={isChecked}/>
                <ScrollView>
                    {
                        nameList.map((item, index) => {
                            return (
                                <View style={{width: '100%', alignItems: 'center'}} key={index}>
                                    <View style={doExerciseStyle.exercisesStyle}>
                                        <BouncyCheckbox
                                            size={25}
                                            fillColor={Colors.dark_blue}
                                            unFillColor="#FFFFFF"
                                            isChecked={isChecked[item.name] || false}
                                            text={item}
                                            innerIconStyle={{borderWidth: 2, borderColor: 'transparent'}}
                                            textStyle={[{color: Colors.dark_blue}, Typographies.normal_text]}
                                            onPress={(checked) => {
                                                handleCheckboxPress(checked, item)
                                            }}
                                            iconStyle={{marginRight: 10}}
                                            style={{
                                                flexDirection: 'row-reverse'
                                            }}
                                        />
                                    </View>
                                    <KSpacer height={8}/>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={doExerciseStyle.buttonsContainer}>
                <View style={doExerciseStyle.buttonBackStyle}>
                    <KGoBackButton text={'BACK'}/>
                </View>
                <View style={doExerciseStyle.buttonNextStyle}>
                    <KNavigateButton text={'PROFILE'} action={verifyExercises} screenName={'ProfileScreen'}/>
                </View>
            </View>
        </ImageBackground>
    )
}

const doExerciseStyle = StyleSheet.create({
    imageView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 50
    },
    titleStyle: {
        color: Colors.dark_blue
    },
    exercisesStyle: {
        width: '80%',
        height: 50,
        backgroundColor: Colors.middle_blue,
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    buttonBackStyle: {
        alignItems: 'flex-start',
        width: '50%',
        padding: 30
    },
    buttonNextStyle: {
        alignItems: 'flex-end',
        width: '50%',
        padding: 30
    }
})