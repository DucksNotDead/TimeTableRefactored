import React, {useMemo} from 'react';
import {TouchableOpacity} from "react-native";
import {AppIconsType, ColorsType} from "../../constants/Types";
import Font from "../text/Font";
import AppIcon from "./AppIcon";
import {Colors} from "../../constants/Colors";
import {Space} from "../../constants/Spaces";

const AppCheckbox = (props: {
    color: ColorsType[]|ColorsType,
    type: 'icon'|'text'
    content: AppIconsType|string,
    active: boolean,
    onPress: (val: boolean) => void,
    round?: boolean,
    big?: boolean,
    width?: number,
}) => {

    const currentColor = useMemo(() => {
        const isDual = Array.isArray(props.color)
        return {
            back: isDual? props.active? props.color[0] : props.color[1] : 'transparent',
            content: isDual? 'white' : props.active? props.color : 'darkGrey'
        }
    }, [props.active])

    return (
        <TouchableOpacity onPress={() => props.onPress(!props.active)} style={{
            backgroundColor: Colors[currentColor.back as ColorsType],
            padding: Space.xs,
            width: props.width? props.width : "auto",
            alignItems: "center"
        }}>
            {props.type==='text'&& <Font
                color={currentColor.content as ColorsType}
                size={props.big? 44 : 18}
                weight={"500"}
            >{ props.content }</Font>}
            {props.type==='icon'&& <AppIcon
                color={currentColor.content as ColorsType}
                name={props.content as AppIconsType}
                size={props.big? 56 : 26}
            />}
        </TouchableOpacity>
    );
};

export default AppCheckbox;