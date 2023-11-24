import React, {Dispatch, useState} from 'react';
import {Timepoint} from "../constants/Types";
import Flex from "./flex/Flex";
import AppButton from "./UI/AppButton";
import Font from "./text/Font";
import TimeSetter from "./TimeSetter";
import {useTimeInterval} from "../hooks/useTimeInterval";
import {useModal} from "../context/ModalContext";

const TimepointForm = (props: {
    value: Timepoint|null,
    setValue: Dispatch<Timepoint>,
    hasDay?: boolean,
}) => {


    const [timeInterval, setTimeInterval] = useState<[string[], string[]]|null>(
        props.value && props.value.timeInterval?.join().length > 2? props.value.timeInterval : null
    )
    const timeParts = useTimeInterval(timeInterval)

    const timeIntervalUpdate = (value: string[], index: number) => {
        const newValue = timeInterval
        newValue&& (newValue[index] = value)
        setTimeInterval(newValue)
    }

    const modal = useModal()

    const setModal = () => modal.set({type: "add", data: {
        title: 'test title',
        content: (
            <AppButton label={'test'}/>
        ),
        onSave: () => console.log('click')
    }})

    return (
        <Flex column align={"center"}>

            <Flex justify={"center"} align={"center"}>
                <TimeSetter
                    hours={timeParts.hourFrom}
                    minutes={timeParts.minutesFrom}
                    setTime={(val) => timeIntervalUpdate(val, 0)}
                />

                <Font weight={"500"} size={30}>-</Font>

                <TimeSetter
                    hours={timeParts.hourTo}
                    minutes={timeParts.minutesTo}
                    setTime={(val) => timeIntervalUpdate(val, 1)}
                />
            </Flex>

            <AppButton label={'занятие'} icon={'plus-circle'} round onPress={setModal}/>

        </Flex>
    );
};

export default TimepointForm;