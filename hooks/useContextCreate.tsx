import {Context, createContext} from "react";

export const useContextCreate = () => {
    const context = createContext<Context<any>|null>(null)
    const contextDispatch = createContext<Context<any>|null>(null)
    return {
        context, contextDispatch
    }
}