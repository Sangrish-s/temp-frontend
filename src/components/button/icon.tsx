import styled from "styled-components";

const IconButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50px;
    position: absolute;
    border: 1px solid #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    top: 10px;
    right: 10px;
    background: transparent;
    color: #ffffff;
    cursor: pointer;

    svg {
        width: 30px;
        height: 30px;
    }
`

export default IconButton