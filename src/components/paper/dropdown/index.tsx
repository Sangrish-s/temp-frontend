import styled from "styled-components";

const Dropdown = styled.div`
    position: relative;
    
    .dropdown-trigger {
        
    }
    
    .dropdown-wrap {
        position: absolute;
        z-index: 1;
        height: auto;
        background: #101010;
        min-height: 100px;
        right: -50%;
        transform: rotateX(-90deg);
        transition: all .4s;
        padding: 8px;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 8px;
    }
    
    &:hover .dropdown-wrap {
        transform: rotateX(0deg);
        transition: all .4s;
    }

    .dropdown-wrap button {
        display: block;
        width: 100%;
        text-align: left;
    }
`

export default Dropdown