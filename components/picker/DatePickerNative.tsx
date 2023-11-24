import React, {Dispatch, useEffect, useState} from 'react';
import DynamicTabs from "../flex/DynamicTabs";
import PickerNative from "./PickerNative";
import {LabeledMonths, Months} from "../../constants/Time";
import {useCurrentDate} from "../../hooks/useCurrentDate";
import AppModal from "../UI/AppModal";
import {useLog} from "../../hooks/useLog";
import AppCheckbox from "../UI/AppCheckbox";
import AppButton from "../UI/AppButton";
import {useModal} from "../../context/ModalContext";

const DatePickerNative = ({ date, setDate }: {
    date: string[],
    setDate: Dispatch<string[]>
}) => {
    const currentDate = useCurrentDate()
    const [currentScreen, setCurrentScreen] = useState('Месяц')
    const [month, setMonth] = useState<string>('')
    const [day, setDay] = useState<string>('')

    const daysGenerate = (count:number = 31) => Array.from(Array(count), (_, i) => String(i+1))
    const [allDays, setAllDays] = useState( daysGenerate(31) )

    const daysInMonth = (monthName:string) => {
        const monthIndex = Months.findIndex(item => item===monthName)
        switch (monthIndex) {
            case 3: case 5: case 8: case 10:
                return  30
            case 1:
                return  28
            default:
                return 31
        }
    }

    const refreshDays = () => {
        const defaultDays = daysGenerate(daysInMonth(month))
        setAllDays(
            month !== currentDate[1]
                ? defaultDays
                : defaultDays.slice(Number(currentDate[0])-1, defaultDays.length)
        )
    }

    useEffect(() => {
        setMonth(currentDate[1])
        setDay(currentDate[0])
    }, [])

    const [test, setTest] = useState(false)

    return (
        <DynamicTabs form swipeEnabled={false} activeTab={currentScreen} setActiveTab={setCurrentScreen} items={[
            {title: 'Месяц',
                component: (
                    <PickerNative items={Months} value={month} setValue={(val) => {
                        setMonth(val)
                        setTimeout(() => {
                            setCurrentScreen('День')
                        }, 300)
                    }}/>
                ),
                onDone: refreshDays,
            },
            {title: 'День',
                component: (
                    <PickerNative cols={7} justify={"flex-start"} items={allDays} value={day} setValue={(val) => {
                        setDay(val)
                    }}/>
                )
            },
        ]} onSave={() => setDate([day, LabeledMonths[Months.findIndex(item => item === month)]])}/>
    );
};

export default DatePickerNative;