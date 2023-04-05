import Header from "components/Header";
import styled from "styled-components";

const Styled = styled.div`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #notfound {
    font-size: 20rem;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bolder;
  }
`

export default function PageNotFound() {
  return (
    <>
      <Header/>
      <Styled>
        <div id="notfound">404</div>
      </Styled>
    </>
  )
}