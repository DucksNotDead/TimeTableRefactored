import {LayoutChangeEvent, Platform} from "react-native";

export const useLayout = () => {
    return (e: LayoutChangeEvent) => {
        if (Platform.OS !== "web") e.persist()
        return e.nativeEvent.layout
    }
}