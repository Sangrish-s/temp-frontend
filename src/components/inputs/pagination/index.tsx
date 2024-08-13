import styled from "styled-components";

const Pagination = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: center;
    margin-top: 24px;

    p {
        color: #ffffff;
        font-size: 14px;
        font-weight: 600;
    }

    button {
        border-radius: 0;
        text-transform: uppercase;
        font-weight: 600;
        cursor: pointer;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 2px 24px 0;
        border: 1px solid #3d6164;
        background: linear-gradient(to top, #254B4C, #0B1D24);
        color: #ffffff;

        &:disabled {
            background: #4e4e4e !important;
            cursor: not-allowed;
            opacity: .5;
        }
    }
`


export default Pagination