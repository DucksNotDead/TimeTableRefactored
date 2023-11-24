import {Colors} from "./Colors";
import {StyleSheet} from "react-native";
import {Space} from "./Spaces";

export const Styles = StyleSheet.create({
    contentBox: {
        width: '100%',
        maxWidth: 700,
    },
    boxShadow: {
        shadowColor: Colors.black,
        shadowOpacity: .15,
        shadowRadius: 15,
        elevation: 12,
    },
    absoluteFull: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    rounded: {
        borderRadius: 16,
    },
    round: {
        borderRadius: 999,
    }
})