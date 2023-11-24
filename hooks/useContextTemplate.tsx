import {ReactNode, useReducer} from "react";

export const useContextTemplate = ({ ctx, children, reducer, initializer}: {
    ctx:{context: React.Context<React.Context<any> | null>, contextDispatch: React.Context<React.Context<any> | null>},
    children:ReactNode,
    reducer: Function,
    initializer: any
}) => {
    const [data, setData] = useReducer<any|null>(reducer, initializer)
    return (
        <ctx.context.Provider
            //@ts-ignore
            value={data}
        >
            <ctx.contextDispatch.Provider
                //@ts-ignore
                value={setData}>
                { children }
            </ctx.contextDispatch.Provider>
        </ctx.context.Provider>
    )
}