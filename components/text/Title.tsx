import React, {ComponentProps} from 'react';
import Font from "./Font";
import {FontType} from "../../constants/Types";
import Flex from "../flex/Flex";
import {Space} from "../../constants/Spaces";

const Title = (props: FontType) => {
    return (
        <Flex style={{
            paddingTop: Space.md,
            paddingBottom: Space.xs,
            paddingHorizontal: Space.md
        }}>
            <Font size={28} weight={"700"} align={props.align}>{ props.children }</Font>
        </Flex>
    );
};

export default Title;