import {useEffect, useState} from "react";
import {TimeIntervalType} from "../constants/Types";

export const useTimeInterval = (interval: TimeIntervalType|null) => {

    const defaults = interval? interval : [ ['00', '00'], ['00', '00'] ]

    const [hourFrom, setHoursFrom] = useState(defaults[0][0])
    const [minutesFrom, setMinutesFrom] = useState(defaults[0][1])
    const [hourTo, setHoursTo] = useState(defaults[1][0])
    const [minutesTo, setMinutesTo] = useState(defaults[1][1])

    useEffect(() => {
        if (interval) {
            setHoursFrom(interval[0][0])
            setMinutesFrom(interval[0][1])
            setHoursTo(interval[1][0])
            setMinutesTo(interval[1][1])
        }
    }, [interval])

    return {
        hourFrom,
        minutesFrom,
        hourTo,
        minutesTo,
    }
}