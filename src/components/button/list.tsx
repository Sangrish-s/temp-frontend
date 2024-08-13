import styled from "styled-components";

const ButtonList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    button {
        width: 100%;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        border-radius: 0;
        height: 50px;
        align-items: center;
        padding: 0 20px;
        background: none;
        border: 2px solid #3d6164;
        color: #ffffff;
        font-size:16px;
        opacity: .6;
        transition: all .3s;
        
        &:hover {
            opacity: 1;
            box-shadow: inset 0 0 10px rgba(27, 253, 156, 0.6), 0 0 9px 3px rgba(27, 253, 156, 0.2);
            transition: all .3s;
            color: #1BFD9C;
        }
    }
`

export default ButtonList