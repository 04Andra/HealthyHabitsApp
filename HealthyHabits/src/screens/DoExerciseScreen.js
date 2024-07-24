import {
    ImageBackground,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Modal,
    Alert,
    TouchableOpacity
} from "react-native";
import {Colors, Typographies} from "../../constants/Theming";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {useContext, useEffect, useState} from "react";
import {MyContext} from "../../context/MyContext";
import KSpacer from "../../components/KSpacer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function DoExerciseScreen() {

    const backgroundImage = require('../../assets/images/doExercice.png');
    const {exerciseList, setExerciseList} = useContext(MyContext);
    const {selectedDropdownType, setSelectedDropdownType} = useContext(MyContext);
    const {selectedDropdownMuscle, setSelectedDropdownMuscle} = useContext(MyContext);
    const {selectedDropdownDifficulty, setSelectedDropdownDifficulty} = useContext(MyContext);
    const [nameList, setNameList] = useState([]);
    const [counter, setCounter] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [exerciseText, setExerciseText] = useState('');

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
        setIsChecked(prevState => ({ ...prevState, [item]: checked }));

        if (checked) {
            setSelectedItem(item);
            const exercise = exerciseList.find(exercise => exercise.name === item);
            if (exercise) {
                setExerciseText(exercise.instructions);
            }
            setModalVisible(true);
        } else {
            setSelectedItem('');
            setExerciseText('');
        }
    };

    return (
        <ImageBackground source={backgroundImage} resizeMode={'cover'} style={doExerciseStyle.imageView}>
            <View style={doExerciseStyle.titleContainer}>
                <Text style={[doExerciseStyle.titleStyle, Typographies.title_text]}>You can do it!</Text>
            </View>
            <View style={{flex: 1, width: '100%'}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={doExerciseStyle.centeredView}>
                        <View style={doExerciseStyle.modalView}>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(!modalVisible)
                            }}>
                                <MaterialIcons name={'keyboard-arrow-down'} size={50} color={Colors.dark_blue}/>
                            </TouchableOpacity>
                            <Text style={[doExerciseStyle.modalText, Typographies.normal_text]}>{exerciseText}</Text>
                        </View>
                    </View>
                </Modal>
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
                                            text={item}
                                            innerIconStyle={{borderWidth: 2, borderColor: 'transparent'}}
                                            textStyle={[{color: Colors.dark_blue}, Typographies.normal_text]}
                                            onPress={(checked) => handleCheckboxPress(checked, item)}
                                            iconStyle={{marginRight: 10}}
                                            style={{flexDirection: 'row-reverse'}}
                                        />
                                    </View>
                                    <KSpacer height={5}/>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={doExerciseStyle.buttonsContainer}></View>
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
        borderRadius: 5
    },
    buttonsContainer: {
        flex: 1
    },


    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        color: Colors.dark_blue,
        textAlign: 'center'
    },
})