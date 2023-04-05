import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "context/AuthContext";
import { FcGoogle } from "react-icons/fc";

function GoogleAuthButton() {
  const navigate = useNavigate();
  const { signInWithGoogle } = UserAuth();
  const googleSignIn = async (e) => {
    try {
      await signInWithGoogle();
      navigate('/upload');      
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <button style={{marginTop: '1rem'}} className="button _fullwidth _dark" onClick={googleSignIn}><FcGoogle className="icon"/>Sign in with Google</button>
  )
}

export default function Login() {
  const { signIn } = UserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/upload');      
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="login-and-signup">
      <header className="header _middle">
        <h2 className="title">請登入您的帳號</h2>
        <p className="desc">
          還沒有帳號嗎？立即<Link to="/signup">免費註冊</Link>一個吧！
          立即享用 15 分鐘免費字幕生成服務
        </p>
      </header>
      <div className="card _white _shadow __login-and-signup">
        <form onSubmit={handleSubmit}>
          <dl>
            <dt>Email address</dt>
            <dd>
              <input className="_fullwidth" type="text" onChange={(e) => {setEmail(e.target.value)}}></input>
            </dd>
          </dl>
          <dl>
            <dt>Password</dt>
            <dd>
              <input className="_fullwidth" type="password" onChange={(e) => {setPassword(e.target.value)}}></input>
            </dd>
          </dl>
          <div className="action">
            <button className="button _primary _fullwidth" type="submit">Login to account</button>
          </div> 
        </form>
        <div className="thrid-party">
          <GoogleAuthButton/>
        </div>
      </div>
    </div>
  )
} 