import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom" 
import { UserAuth } from "context/AuthContext";
import { MdOutlineSubtitles } from 'react-icons/md';

const Style = styled.header`
  & {
    background-color: ${props => props.theme.colors.gray[0]};
    color: ${props => props.theme.colors.white};
    padding: .5rem .75rem;
    flex: 0 0 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    & {
      font-size: 175%;
      line-height: 1;
      font-weight: 600;
      color: ${props => props.theme.colors.white};
      font-family: Georgia, 'Times New Roman', Times, serif;
    }
    span {
      color: ${props => props.theme.colors.cyan[1]};
      vertical-align: top;
    }
  }
  
  .user {
    & { 
      display: flex;
    }
    & > * {
      margin-left: .75rem;
    }
    .char {
      font-weight: 600;
      width: 37px;
      height: 37px;
      border-radius: 50% 50%;
      text-align: center; 
      line-height: 37px;
      background-color: ${props => props.theme.colors.cyan[1]};
    }
  }

`

const UserStatus = function () {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const signOut = async(evt) => {
    evt.preventDefault(); 
    await logOut();
    navigate('/login');
  }
  if (user && user.uid) {
    const initialLetter = user.email.slice(0, 1).toUpperCase()
    return (
      <>
        <div className="char">{ initialLetter }</div>
        <button onClick={signOut} className="button _dark">Sign out</button>
      </>
    )
  } else {
    return (
      <>
        <Link to="/signup" className="button _dark">Sign up</Link>
        <Link to="/login" className="button _primary">Log in</Link>
      </>
    )
  }
}


export default function Header(props) {
  return (
    <Style>
      <Link className="logo" to="/"><span><MdOutlineSubtitles/></span> Jimakun</Link>
      <div className="user">
        <UserStatus user="props.user"/>
      </div>      
    </Style>
  )
}
