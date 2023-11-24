import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {View} from 'react-native'
import Picker from "./Picker";
import {Months} from "../../constants/Time";
import {useCurrentDate} from "../../hooks/useCurrentDate";

const DatePickerWeb = ({ date, setDate }: {
    date:string[],
    setDate: Dispatch<string[]>,
}) => {

    const allDays = Array.from(new Array(31), (_, index) => String(index + 1))
    const [curDay, curMonth] = useCurrentDate()
    const [days, setDays] = useState<string[]>([])
    const [months, setMonths] = useState<string[]>([
        ...Months.slice(Months.findIndex(el => el === curMonth), Months.length),
        ...Months.slice(0, Months.findIndex(el => el === curMonth))
    ])


    const [day, setDay] = useState(date[0])
    const [month, setMonth] = useState(date[1])

    const checkMonth = (month: string) => {
        if (month === curMonth) {
            setDays(allDays.filter(day => Number(day) >= Number(curDay)))
            setDay(days[0])
        }
        else {
            const index = Months.findIndex(item => item === month)
            let daysCount = 31
            switch (index) {
                case 1: daysCount = 28
                    break
                case 3: case 5: case 8: case 10: daysCount = 30
                    break
            }
            setDays(Array.from(new Array(daysCount), (_, i) => String(i+1)))
        }

    }

    const changeDay = (newVal: string) => {
        setDay(newVal)
        update(0, newVal)
    }

    const changeMonth = (newVal: string) => {
        setMonth(newVal)
        checkMonth(newVal)
        update(1, newVal)
    }

    const update = (index:number, val:string) => {
        const newVal = [...date]
        newVal[index] = val
        setDate(newVal)
    }

    useEffect(() => {
        setDay(date[0])
        setMonth(date[1])
    }, [])

    useEffect(() => {
        update(0, day)
    }, [day])

    useEffect(() => {
        update(1, month)
    }, [month])

    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', columnGap: 20 }}>
            <Picker items={days} value={day} setValue={(val) => changeDay(val)}/>

            <Picker items={months} value={month} setValue={(val) => changeMonth(val)}/>
        </View>
    );
};

export default DatePickerWeb;