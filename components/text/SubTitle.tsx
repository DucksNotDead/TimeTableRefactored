import React, {ComponentProps} from 'react';
import Font from "./Font";
import {Colors} from "../../constants/Colors";

const SubTitle = (props: ComponentProps<any>) => {
    return (
        <Font size={22} weight={"700"} color={Colors.darkGrey}>{ props.children }</Font>
    );
};

export default SubTitle;