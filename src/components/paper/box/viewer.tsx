import styled from "styled-components";

const FileViewer = styled.div`
    font-weight: 500;
    line-height: 2;
    padding: 24px;
    width: 100%;
    * {
        font-family: "Poppins", sans-serif!important;
    }
    
    table {
        display: block!important;
        overflow-x: auto;
        max-width: 100%;
        width: 37vw!important;
    }
    
    headerdata {
        display: flex;
        gap:20px;
        margin-bottom: 12px;
        font-size: 20px;
    }
`

export default  FileViewer