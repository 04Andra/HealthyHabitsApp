import {createContext} from "react";

export const MyContext = createContext({
    isLogged: false,
    setIsLogged: () => {},
    exerciseList: [],
    setExerciseList: () => {},
    selectedDropdownType: {},
    setSelectedDropdownType: () => {},
    selectedDropdownMuscle: {},
    setSelectedDropdownMuscle: () => {},
    selectedDropdownDifficulty: {},
    setSelectedDropdownDifficulty: () => {},
})