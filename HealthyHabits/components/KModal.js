import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Colors, Typographies} from "../constants/Theming";
import {CountdownCircleTimer} from "react-native-countdown-circle-timer";

export default function KModal({
                                   modalVisible,
                                   setModalVisible,
                                   exerciseText,
                                   countdownState,
                                   setOnComplete,
                                   setCountdownState,
                                   setCountdownIcon,
                                   countdownIcon,
                                   onComplete
                               }) {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={KModalStyle.centeredView}>
                <View style={KModalStyle.modalView}>
                    {
                        onComplete ? (
                            <TouchableOpacity onPress={() => {
                                setModalVisible(!modalVisible)
                            }} style={{paddingBottom: 9}}>
                                <MaterialIcons name={'keyboard-arrow-down'} size={50} color={Colors.dark_blue}/>
                            </TouchableOpacity>
                        ) : (
                            <View style={{paddingBottom: 60, }}></View>
                        )
                    }
                    <CountdownCircleTimer
                        isPlaying={countdownState}
                        duration={5}
                        colors={[Colors.dark_blue, Colors.middle_blue, Colors.light_blue]}
                        colorsTime={[200, 100, 10]}
                        style={KModalStyle.timerStyle}
                        onUpdate={() => {
                            setOnComplete(false)
                        }}
                        onComplete={(complete) => {
                            setOnComplete(true)
                        }}
                    >
                        {({remainingTime}) => <Text
                            style={[KModalStyle.countdownStyle, Typographies.countdown_text]}>{remainingTime}</Text>}
                    </CountdownCircleTimer>
                    <View style={{padding: 20}}>
                        <TouchableOpacity onPress={() => {
                            setCountdownState(!countdownState)
                            if (countdownState === false) {
                                setCountdownIcon('pause')
                            } else {
                                setCountdownIcon('play-arrow')
                            }
                        }}>
                            <MaterialIcons name={countdownIcon} size={50} color={Colors.dark_blue}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <Text
                            style={[KModalStyle.countdownStyle, Typographies.normal_text]}>{exerciseText}</Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

const KModalStyle = StyleSheet.create({
    centeredView: {
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 30,
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
    modalText: {
        color: Colors.dark_blue,
        textAlign: 'center'
    },
    countdownStyle: {
        color: Colors.dark_blue,
        textAlign: 'center'
    },
})