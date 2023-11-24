import React from 'react';
import Picker from "./picker/Picker";
import Font from "./text/Font";
import Flex from "./flex/Flex";

const TimeSetter = (props: {
    hours: string,
    minutes: string,
    setTime: (val: string[]) => void
}) => {

    const hoursArr = [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
    ]
    const minutesArr = [
        '00', '15', '30', '45'
    ]

    const set = (value: string, index: number) => {
        const newValue = [props.hours, props.minutes]
        newValue[index] = value
        props.setTime(newValue)
    }

    return (
        <Flex align={"center"} gap={0}>
            <Picker
                value={props.hours}
                setValue={(val) => set(val, 0)}
                items={hoursArr}
            />
            <Font weight={"500"}>:</Font>
            <Picker
                value={props.minutes}
                setValue={(val) => set(val, 1)}
                items={minutesArr}
            />
        </Flex>
    );
};

export default TimeSetter;