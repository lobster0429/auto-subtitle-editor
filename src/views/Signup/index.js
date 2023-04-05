import { useState } from "react";
import { UserAuth } from "context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        navigate = useNavigate(),
        { createUser } = UserAuth();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="login-and-signup">
      <header className="header _middle">
        <h2 className="title">免費註冊帳號</h2>
        <p className="desc">
          免費註冊，立即享用 15 分鐘免費字幕生成服務，或<Link to="/login">直接登入</Link>  
        </p>
      </header>
      <div className="card _white _shadow">
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
            <button className="button _primary _fullwidth" type="submit">Signup for free</button>
          </div> 
        </form>
      </div>
    </div>
  )
}