import React, {Dispatch, useState} from 'react';
import Flex from "../flex/Flex";
import {Platform, TouchableOpacity, View} from "react-native";
import FlatCard from "../flex/FlatCard";
import AppButton from "../UI/AppButton";
import {Space} from "../../constants/Spaces";
import Font from "../text/Font";
import AppCheckbox from "../UI/AppCheckbox";

const PickerNative = (props: {
    items: string[]
    value: string
    setValue: Dispatch<string>
    label?: string
    cols?:number
    justify?: 'center'|'flex-start'|'flex-end'
}) => {

    const isWeb = Platform.OS==="web"

    const [itemWidth, setItemWidth] = useState<number>(0)
    const cols = props.cols? props.cols : 3
    const gap = isWeb? "sm" : "md"

    return (
        <FlatCard width={"100%"} title={props.label}>
            <View onLayout={e => {
                if (!isWeb) e.persist()
                setItemWidth(e.nativeEvent.layout.width/cols - Space[gap])
            }}
            >
                <Flex padding={0} gap={gap} justify={props.justify? props.justify : "center"} style={{ flexWrap: 'wrap' }}>
                    {props.items.map(item => (
                        /*isWeb
                            ? /!*<AppButton
                                key={item}
                                label={item}
                                onPress={() => props.setValue(item)}
                                width={itemWidth}
                                color={["transparent", "primary"]}
                                condition={props.value === item}
                            />*!/ <></>
                            : <TouchableOpacity key={item} style={{ width: itemWidth }} onPress={() => props.setValue(item)}>
                                <Font align={"center"} weight={"500"} color={props.value !== item? "darkGrey" : "primary"}>{item}</Font>
                            </TouchableOpacity>*/
                        <AppCheckbox
                            key={item}
                            color={'primary'}
                            type={"text"}
                            content={item}
                            active={props.value === item}
                            onPress={() => props.setValue(item)}
                            width={itemWidth}
                        />
                    ))}
                </Flex>
            </View>
        </FlatCard>
    );
};

export default PickerNative;