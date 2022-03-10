import { useState, useEffect, useRef } from "react";

const Login = ({setIsLogin}) => {
  const loginUserRef = useRef();
  const loginErrRef = useRef();

  const [loginUser, setLoginUser] = useState('');
  const [loginPwd, setLoginPwd] = useState('');
  const [loginErrMsg, setLoginErrMsg] = useState('');
  const [loginSuccess, setLoginSuccess] = useState();

  const handleLoginSubmit = async () => {

    console.log(loginUser);
    console.log(loginPwd)

    try{
      // const response = await 
      setIsLogin(true);
    } catch (err) {
      setLoginErrMsg('일치하는 ID/PW가 없습니다.')
      return;
    }

    
  }

  return (
    <section>
      <p ref={loginErrRef} className={!loginSuccess && loginErrMsg ? "errmsg" : "offscreen"}>
        {loginErrMsg}
      </p>
      <h1>로그인</h1>
      <form onSubmit={handleLoginSubmit()}>
        <label htmlFor="login-user">아이디</label>
        <input type="text" id="login-user" required onChange={(e) => {setLoginUser(e.target.value)}}/>

        <label htmlFor="login-pwd">비밀번호</label>
        <input type="password" id='login-pwd' required onChange={(e) => {setLoginPwd(e.target.value)}}/>

        <button>LOGIN</button>
      </form>
    </section>
  );
};

export default Login;