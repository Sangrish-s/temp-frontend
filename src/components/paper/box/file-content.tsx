import styled from "styled-components";

const FileContentBox = styled.div`
    border: 2px solid #1BFD9C0f;
    overflow-y: auto;
    gap: 12px;
    flex-direction: column;
    display: grid;
    backdrop-filter: blur(4px);
    background: #ffffff;
    border-radius: 0;
    position: relative;
    height: calc(100vh - 240px);
    
    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`

export default FileContentBox