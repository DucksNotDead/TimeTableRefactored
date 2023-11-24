import React from 'react';
import {Colors} from "../../constants/Colors";
import FeatherIcon from '@expo/vector-icons/Feather'
import {IconProps} from "@expo/vector-icons/build/createIconSet";
import {AppIconsType, ColorsType} from "../../constants/Types";

const AppIcon = ({ name = 'image', color = "primary", size = 'small' }:Omit<IconProps<AppIconsType>, 'size'> & {
    size?: 'big'|'small'|number
}) => {

    const defaultSize = {
        big: 50,
        small: 24,
    }

    return (
        <FeatherIcon
            name={name}
            color={Colors[color as ColorsType]}
            size={typeof size === "string"
                ? defaultSize[size]
                : size
            }
        />
    );
};

export default AppIcon;