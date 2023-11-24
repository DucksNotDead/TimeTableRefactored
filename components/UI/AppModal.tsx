import React, {ReactNode, useEffect, useRef, useState} from 'react';
import AppButton, {AppButtonProps} from "./AppButton";
import {useModal} from "../../context/ModalContext";
import * as crypto from "crypto";

const AppModal = (props: {
    buttonProps: AppButtonProps,
    title: string,
    children: ReactNode,
    onSave?: () => void,
    visible?: {
        value: boolean,
        setter: (value: boolean) => void
    },
}) => {

    const modal = useModal()

    const modalId = useRef('modal_' + Date.now() + Math.random())

    const openModal = () => {
        modal.set({
            type: "add",
            data: {
                id: modalId.current,
                title: props.title,
                content: props.children,
                onSave: props.onSave? () => {
                    props.onSave&& props.onSave()
                } : undefined
            }
        })
    }

    const closeModal = () => modal.set({ type: "close", data: modalId.current })

    useEffect(() => {
        if (props.visible?.value === false) {
            closeModal()
            props.visible.setter(true)
        }
    }, [props.visible])

    return (
        <AppButton {...props.buttonProps} flat onPress={openModal}/>
    );
};

export default AppModal;