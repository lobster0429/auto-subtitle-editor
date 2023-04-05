import Header from "components/Header";
import Uploader from "./components/Uploader";
import Tasks from "./components/Tasks";
import { useState } from "react";
import { UserAuth } from "context/AuthContext";
import styled from "styled-components";

const Styled = styled.div`
  & {
    display: flex;
    height: calc(100% - 53px);
    align-items: stretch;
  }
  #uploader {
    flex: 1 1 auto;
  }
  #tasks {
    flex: 0 0 300px;
  }
`;

export default function Upload() {
  const { user } = UserAuth();
  const [placeholder, setPlaceholder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(null);
  return (
    <>
      <Header/>
      <Styled className="main">
        <Uploader token={user.accessToken} onUploaded={setPlaceholder} isProcessing={isProcessing}/>
        <Tasks user={user} placeholder={placeholder} onProcessing={setIsProcessing}/>
      </Styled>
    </>
  )
}