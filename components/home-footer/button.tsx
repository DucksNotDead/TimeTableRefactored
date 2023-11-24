import React from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";
import AppIcon from "../UI/AppIcon";
import {Colors} from "../../constants/Colors";
import {AppIconsType, ColorsType} from "../../constants/Types";


const TabButton = ({ icon,  color,  isActive,  onPress }: {
    icon: AppIconsType,
    color: ColorsType,
    isActive: boolean,
    onPress: () => void,
}) => {

    const transition = useDerivedValue(() => {
        return isActive? withSpring(1) : withTiming(0)
    }, [isActive])

    const aCircleStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: transition.value
                }
            ]
        }
    })
    const aMainStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(transition.value, [0, 1], [1, .75])
                }
            ]
        }
    })

    return (
        <View style={[ styles.container, { flex: 1 }]}>
            <Animated.View style={ styles.container }>
                <Pressable onPress={onPress} style={styles.container}>
                    <Animated.View style={[styles.container, aMainStyles]}>
                        <AppIcon name={icon} color={isActive? "white" : color} size={32}/>
                    </Animated.View>
                    <Animated.View style={[styles.circle, aCircleStyles, {backgroundColor: Colors[color]}]}></Animated.View>
                </Pressable>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: 65,
        height: 65,
    },
    circle: {
        position: "absolute",
        zIndex: -1,
        width: 65,
        height: 65,
        borderRadius: 99,
    }
})

export default TabButton;