import styled from "styled-components";

const SearchInput = styled.input`
    height: 40px;
    border-radius: 0;
    background: transparent;
    padding: 0 20px;
    font-size: 14px;
    border: 2px solid #3d6164;
    color: #ffffff;
    opacity: .8;
    width: 100%;

    &:focus {
        outline: none;
        border: 2px solid #3d6164;
        background: linear-gradient(to right, rgba(27, 253, 156, 0.1) 1%, transparent 40%, transparent 60%, rgba(27, 253, 156, 0.1) 100%);
        color: #ffffff;
        box-shadow: inset 0 0 10px rgba(27, 253, 156, 0.4), 0 0 9px 3px rgba(27, 253, 156, 0.1);
        opacity: 1;
    }

    &::placeholder {
        color: #1bdd8c;
        opacity: .6;
    }
`

export default SearchInput;