import React, {Dispatch, useEffect, useRef, useState} from 'react';
import FlatCard from "../flex/FlatCard";
import AppButton from "./AppButton";
import {Colors} from "../../constants/Colors";
import {useModal} from "../../context/ModalContext";
import DatePickerWeb from "../picker/DatePickerWeb";
import {useCurrentDate} from "../../hooks/useCurrentDate";
import SubTitle from "../text/SubTitle";
import Title from "../text/Title";

const AppDatePicker = (props: {
    value: string[],
    setValue: Dispatch<string[]>
}) => {

    useEffect(() => {
        setDate(props.value)
    }, [props.value])

    const modal = useModal()
    const isOpen = useRef(false)

    const [date, setDate] = useState<string[]>(useCurrentDate())

    const openForm = () => modal.set({
        type: "open",
        data: {
            title: 'Изменить дату',
            content: <DatePickerWeb date={date} setDate={(val) => setDate(val)}/>,
            onSave: () => {
                props.setValue(date)
                modal.set({ type: "close" })
                isOpen.current = false
            }
        }
    })

    useEffect(() => {
        isOpen.current && openForm()
    }, [date])


    return (
        <FlatCard title={'Дата'} width={'100%'}>
            <AppButton
                label={date.join().length>4? date.join(' ') : 'добавить дату'}
                color={Colors.days}
                fullWidth
                onPress={() => {
                    isOpen.current = true
                    openForm()
                }}
            />
        </FlatCard>
    );
};

export default AppDatePicker;