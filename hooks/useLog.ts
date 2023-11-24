import {useEffect} from "react";

export const useLog = (state: any) => {
    useEffect(() => {
        console.log(state)
    }, [state])
}