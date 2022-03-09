import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = './register'

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log({ result });
    console.log({ user });
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log({ result });
    console.log({ pwd });
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    console.log(user, pwd);
    setSuccess(true);

    try{
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({user, pwd}),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }  )
    } catch (err) {
      
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>회원가입을 축하합니다!</h1>
          <p>
            <a href="#">로그인하기</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>회원가입</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              아이디
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} color="green" />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} color="red" />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => {
                setUserFocus(true);
              }}
              onBlur={() => {
                setUserFocus(false);
              }}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              글자수를 4~24로 맞춰주세요. <br />
              영어 알파벳으로 시작해야합니다. <br />
              가능한 문자 : 알파벳, 숫자, _ , -
            </p>

            <label htmlFor="password">
              비밀번호
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} color="green" />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} color="red" />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-descirbedby="pwdnote"
              onFocus={() => {
                setPwdFocus(true);
              }}
              onBlur={() => {
                setPwdFocus(false);
              }}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              글자수를 8~24로 맞춰주세요
              <br />
              영어 대문자, 소문자, 숫자, 특수문자를 반드시 포함시켜야 합니다.{" "}
              <br />
              가능한 특수문자 : {""}
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollor sign">$</span>
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              비밀번호 확인
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} color="green" />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} color="red" />
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => {
                setMatchPwd(e.target.value);
              }}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-descirbedby="confirmnote"
              onFocus={() => {
                setMatchFocus(true);
              }}
              onBlur={() => {
                setMatchFocus(false);
              }}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              비밀번호와 일치해야합니다.
            </p>

            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>

          <p>
            이미 회원가입 하셨나요?
            <br />
            <span className="line">
              {/* 라우터 링크 */}
              <a href="#">로그인하기</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
