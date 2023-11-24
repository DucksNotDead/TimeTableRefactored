import {Months} from '../constants/Time'

export const useCurrentDate = ():string[] => {
    const today = new Date();
    const dayNum = String(today.getDate())
    const month = Months[today.getMonth()]
    return [dayNum, month]
}