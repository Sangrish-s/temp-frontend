import React, {FC} from 'react';
import styled from "styled-components";
import {Icon} from "@iconify/react";
import IconButton from "@/components/button/icon";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    children?: any;
}

const Modal: FC<Props> = (props) => {
    const {children, open, setOpen} = props;

    return (
        <ModalWrap
            style={{
                display: open ? "flex" : "none",
            }}>
            <ModalBoxWrap>
                <IconButton onClick={()=>{setOpen(false)}}>
                    <Icon icon="ic:twotone-close" />
                </IconButton>
                {children}
            </ModalBoxWrap>

        </ModalWrap>
    );
};


const ModalWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background: #0f0f0f9f;
    backdrop-filter: blur(4px);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
`

const ModalBoxWrap = styled.div`
    background: #1f1f1f;
    position: relative;
    width: 100%;
    min-height: 200px;
    max-width: 1000px;
    border-radius: 0;
    box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    display: flex;
    align-items: center;
`

export default Modal;