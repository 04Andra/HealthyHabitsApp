import SelectDropdown from 'react-native-select-dropdown'
import {StyleSheet, View, Text} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Typographies} from "../constants/Theming";
import {useContext} from "react";
import {MyContext} from "../context/MyContext";

export default function KSelectList({list, iconName, text}) {

    const {selectedDropdownType, setSelectedDropdownType} = useContext(MyContext);
    const {selectedDropdownMuscle, setSelectedDropdownMuscle} = useContext(MyContext);
    const {selectedDropdownDifficulty, setSelectedDropdownDifficulty} = useContext(MyContext);

    const onSelectItem = (selected) => {
        if (text === 'Choose a type') {
            setSelectedDropdownType(selected)
        } else if (text === 'Choose a muscle?') {
            setSelectedDropdownMuscle(selected)
        } else if (text === 'Choose a difficulty') {
            setSelectedDropdownDifficulty(selected)
        }
    }

    return (
        <SelectDropdown
            data={list}
            onSelect={(selectedItem, index) => {
                onSelectItem(selectedItem)
            }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={KSelectedStyles.dropdownButtonStyle}>
                        <Text style={[KSelectedStyles.dropdownTextStyleBig, Typographies.normal_text]}>


                            {<View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon name={iconName} style={KSelectedStyles.dropdownIconStyle}/><Text
                                style={[Typographies.normal_text, KSelectedStyles.dropdownTextStyle]}>{selectedItem || text}</Text>
                            </View>}
                        </Text>
                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'}
                              style={KSelectedStyles.dropdownIconStyle}/>
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View
                        style={{...KSelectedStyles.dropdownItemStyle, ...(isSelected && {backgroundColor: Colors.light_blue})}}>
                        <Text style={[KSelectedStyles.dropdownTextStyle, Typographies.normal_text]}>{item}</Text>
                    </View>
                );
            }}
            showsVerticalScrollIndicator={true}
            dropdownStyle={KSelectedStyles.dropdownMenuStyle}
        />
    )
}

const KSelectedStyles = StyleSheet.create({
    dropdownButtonStyle: {
        width: '70%',
        height: '15%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark_blue,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 5,
    },
    dropdownItemStyle: {
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingVertical: 10,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.middle_blue
    },
    dropdownTextStyleBig: {
        flex: 1,
        color: Colors.middle_blue,
    },
    dropdownTextStyle: {
        flex: 1,
        color: Colors.middle_blue,
        marginLeft: 10
    },
    dropdownIconStyle: {
        color: Colors.dark_blue,
        fontSize: 24,
    }
});