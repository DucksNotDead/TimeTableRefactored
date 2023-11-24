import React, {useEffect, useState} from 'react';
import {useModal} from "../context/ModalContext";
import ModalView from "../components/popups/ModalView";
import {AppModalType} from "../constants/Types";

const Modals = () => {

    const duration = 300
    const modalApi = useModal()
    const [views, setViews] = useState<AppModalType[]>([])

    useEffect(() => {
        
    }, )

    return views.map((modal, index) => (
        <ModalView
            key={modal.id + '_' + index+1}
            id={modal.id}
            content={modal.content}
            title={modal.title}
            animationDuration={duration}
            close={close}
            index={index}
        />
    ));
};

export default Modals;