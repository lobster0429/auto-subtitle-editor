import styled  from "styled-components"

const Style = styled.footer`
  & {
    color: ${props => props.theme.colors.gray[2]};
    text-align: center;
    padding: 1em;
    flex: 0 0 100%;
  }
`

export default function Footer () {
  return (
    <Style>
      copyright &copy;
    </Style>
  )
}