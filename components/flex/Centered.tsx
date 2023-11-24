import React, {ComponentProps} from 'react';
import Flex from "./Flex";

const Centered = (props: ComponentProps<any>) => {
    return (
        <Flex justify={"center"} padding={0} align={"center"} style={{ flex: 1 }}>
            { props.children }
        </Flex>
    );
};

export default Centered;