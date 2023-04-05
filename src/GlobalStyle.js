import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    color: ${props => props.theme.colors.gray[0]}
  }

  body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    background-color: ${props => props.theme.colors.gray[4]};
    line-height: 1.5;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  #root {
    /*
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    */
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #999;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #ccc;
  }

  h1, h2, h3, h4, h5, h6, p, dl, dt, dd {
    margin: 0;
    padding: 0;
  } 

  a {
    color: ${props => props.theme.colors.cyan[0]};
    text-decoration: none;
    cursor: pointer;
  }

  form {
    dt {
      font-weight: 600;
      font-size: ${props => props.theme.text.sm};
    }
  }

  input[type="text"], 
  input[type="email"], 
  input[type="number"], 
  input[type="password"],
  textarea {
    & {
      appearance: none;
      color: ${props => props.theme.colors.gray[0]};
      outline: none;
      line-height: 1.5;
      padding: .5rem .75rem;
      font-size: ${props => props.theme.text.sm};
      border: 1px solid ${props => props.theme.colors.gray[3]};
      border-radius: ${props => props.theme.rounded.lg};
      background-color: rgb(232 240 254);
    }
    &:focus {
      border-color: ${props => props.theme.colors.cyan[1]};
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
    &._fullwidth {
      display: block;
      width: 100%;
    }
    
  }
  button {
    appearance: none;
    border: none;
    outline: none;
  }
  .button {
    & {
      font-weight: 600;
      background-color: ${props => props.theme.colors.white};
      color: ${props => props.theme.colors.gray[3]};
      font-size: ${props => props.theme.text.sm};
      border-radius: ${props => props.theme.rounded.lg};
      line-height: 1.5;
      padding: .5rem .75rem;
      outline: 2px solid transparent;
      outline-offset: 2px;
      cursor: pointer;
    }
    .icon {
      display: inline-block;
      vertical-align: middle;
      margin-right: .5em;
      font-size: 112%;
    }
    &._fullwidth {
      display: block;
      width: 100%;
    }
    &._primary {
      background-color: ${props => props.theme.colors.cyan[1]};
      color: ${props => props.theme.colors.white};
      &:hover {
        background-color: ${props => props.theme.colors.cyan[2]};
      }
      &[disabled],
      &:active {
        background-color: ${props => props.theme.colors.cyan[0]};
      }
    }
    &._dark {
      background-color: ${props => props.theme.colors.gray[1]};
      color: ${props => props.theme.colors.white};
    }
  }

  .card {
    border-radius: 2.5rem;
    &._white {
      background: ${props => props.theme.colors.white};
    }
    &._shadow {
      box-shadow: 0 0 #000, 0 0 #000, 0 25px 50px -12px hsla(0, 0%, 9%, .1);  
    }
  }

  .icon {
    &._spinner {
      animation: spin 2s infinite;  
    }

  }
  @keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(720deg);
  }
}
  
  .login-and-signup {
    & {
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
    }
    .header {
      & {
        margin-bottom: 2em;
        text-align: center;
      }
      .title {
        margin-bottom: .75em;
      }
      .desc {
        color: ${props => props.theme.colors.gray[2]};
        font-weight: 600;
      }
    }
    .card {
      & {
        width: 32rem;
        margin: 0 auto;
        padding: 6rem;
      }
      dl {
        margin-bottom: 1.5rem;
      }
    }
  }
`;
