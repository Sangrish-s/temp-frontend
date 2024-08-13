import styled from "styled-components";

const FormButton = styled.button`
    cursor: pointer;
    font-size: 14px;
    padding: 0.5em 2em;
    position: relative;
    font-family: inherit;
    border-radius: 0;
    overflow: hidden;
    transition: all 0.3s;
    border: 1px solid #3d6164;
    background: linear-gradient(to top, #254B4C, #0B1D24);
    color: #ffffff;
    opacity: .8;
    white-space: nowrap;
    
    
    &:hover {
        color: #ffffff;
        opacity: 1;
    }

    &:before {
        content: "";
        position: absolute;
        left: -4em;
        width: 4em;
        height: 100%;
        top: 0;
        transition: transform .4s ease-in-out;
        background: linear-gradient(to right, transparent 1%, rgba(27, 253, 156, 0.1) 40%,rgba(27, 253, 156, 0.1) 60% , transparent 100%);
    }

    &:hover:before {
        transform: translateX(15em);
    }
    
    &:disabled {
        background: #393939!important;
        cursor: not-allowed;
    }
`


export default FormButton