import React from 'react';
import {TouchableOpacity} from "react-native";
import Animated, {interpolateColor, useAnimatedStyle, useDerivedValue, withTiming} from "react-native-reanimated";
import {Styles} from "../../constants/Styles";
import {Colors} from "../../constants/Colors";
import Flex from "../flex/Flex";
import AppIcon from "../UI/AppIcon";
import {AppDataType} from "../../constants/Types";
import {useNavigation} from "@react-navigation/core";

const CreateButton = (props: {
    mode: AppDataType,
}) => {

    const navigation = useNavigation()

    const progress = useDerivedValue(() => {
        return props.mode === 'days'? withTiming(0) : withTiming(1)
    }, [props.mode])
    const aColor = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(progress.value, [0, 1], [Colors.days, Colors.timepoints])
        }
    })

    return (
        <Flex padding={0} width={"auto"}>
            <TouchableOpacity
                // @ts-ignore
                onPress={() => navigation.navigate('create', { mode: props.mode })}
            >
                <Animated.View style={[
                    aColor, Styles.round, {
                        backgroundColor: Colors["white"],
                    }
                ]}>
                    <Flex justify={"center"} align={"center"}>
                        <AppIcon
                            color={"white"}
                            size={26}
                            name={"plus"}
                        />
                    </Flex>
                </Animated.View>
            </TouchableOpacity>
        </Flex>
    );
};

export default CreateButton;