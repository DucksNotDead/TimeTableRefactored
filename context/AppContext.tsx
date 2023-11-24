import React, {ReactNode} from 'react';
import {ModalContextProvider} from "./ModalContext";

const AppContext = ({ children }:{
    children: ReactNode
}) => {
    return (
        <ModalContextProvider>
            {children}
        </ModalContextProvider>
    );
};

export default AppContext;