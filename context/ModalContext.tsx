import React, {ReactNode, useContext} from 'react';
import {useContextCreate} from "../hooks/useContextCreate";
import {useContextTemplate} from "../hooks/useContextTemplate";
import {AppModalType} from "../constants/Types";
import AppButton from "../components/UI/AppButton";
import Flex from "../components/flex/Flex";

const ctx = useContextCreate()

export const ModalContextProvider = ({ children }: {
    children: ReactNode
}) => useContextTemplate({ctx, children, reducer: modalReducer, initializer: []})



type ActionType = 'add'|'close'|'remove'
type ActionData = AppModalType|string

export const useModal = () => {
    const modalApi: {
        views:AppModalType[],
        set: (val: {
            type: ActionType,
            data: string| {
                title?: string,
                id?:string,
                content: ReactNode,
                onSave?: () => void
            },
        }) => void
    } = {
        // @ts-ignore
        views: useContext(ctx.context),
        // @ts-ignore
        set: useContext(ctx.contextDispatch)
    }
    return modalApi
}

const modalReducer = (
    state:AppModalType[],
    action: {
        type: ActionType,
        data: ActionData,
    }
) => {

    // @ts-ignore
    const close = (id:string) => state.find(modal => modal.id === id).visible = false

    const remove = (id: string) => state.filter(modal => modal.id !== id)

    const newKey = () => Date.now() + Math.random() + '_' + state.length+1

    switch (action.type) {
        case "add":

            const data = action.data as AppModalType
            const addedId = data.id? data.id : 'modal_' + newKey()

            return [...state, {
                id: addedId,
                title: data.title,
                visible: true,
                content: (<>
                    <Flex column padding={0} style={{width: '100%'}}>
                        {data.content}
                    </Flex>
                    {data.onSave && <AppButton icon={"check"} big round onPress={() => {
                        close(addedId)
                        data.onSave&& data?.onSave()
                    }}/>}
                </>)
            }]
        case "close":
            close(action.data as string)
        case "remove":
            return remove(action.data as string)
    }
}

