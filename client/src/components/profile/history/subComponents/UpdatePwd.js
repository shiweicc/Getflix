import { useRef, useState, useEffect } from "react";
import { Navigate, Link }  from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import './signup.css'
import axios from 'axios';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[A-z][A-z0-9-_@.]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const UPDATE_PWD_URL = 'http://localhost:3001/updatePwd';

const UpdatePwd = (userId) => {

  // const userReff = useRef();
  const errRef = useRef();
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);


  // useEffect(() => {
  //     userReff.current.focus();
  // }, [])

  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
      setErrMsg('');
  }, [ pwd, matchPwd])

  const handleSubmit = async (e) => {
      e.preventDefault();
      // const v1 = USER_REGEX.test(user);
      const v2 = PWD_REGEX.test(pwd);
      // const v3 = EMAIL_REGEX.test(useremail);
      if (!v2) {
          setErrMsg("invalid input");
          return;
      }
      try {
        const response = await axios.post(UPDATE_PWD_URL,
              JSON.stringify({ userId,  pwd }),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: false
              }
          );
          // console.log(response?.data);
          // console.log(response?.accessToken);
          // console.log(JSON.stringify(response))
          if (response.status === 200) {
            setSuccess(true);

          }
          setPwd('');
          setMatchPwd('');
      } catch (err) {
          if (!err?.response) {
              setErrMsg('No response from server');
          }
          // else if (err.response?.status === 409) {
          //     setErrMsg('There is an account linked to this email');
          // }
          else {
              setErrMsg('Signup failed')
          }
          errRef.current.focus();
      }
  }

  return (
      <>
          {success ? (
              <Navigate to='/login'/>
          ) : (
              <section>
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                  <h1>Update your password</h1>
                  <form onSubmit={handleSubmit}>
                      <label htmlFor="password">
                          Password:
                          <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="password"
                          id="password"
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          required
                          aria-invalid={validPwd ? "false" : "true"}
                          aria-describedby="pwdnote"
                          onFocus={() => setPwdFocus(true)}
                          onBlur={() => setPwdFocus(false)}
                      />
                      <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          8 to 24 characters.<br />
                          Your password must include uppercase and lowercase letters, at least one number and at least one special character.<br />
                          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                      </p>


                      <label htmlFor="confirm_pwd">
                          Confirm Password:
                          <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="password"
                          id="confirm_pwd"
                          onChange={(e) => setMatchPwd(e.target.value)}
                          value={matchPwd}
                          required
                          aria-invalid={validMatch ? "false" : "true"}
                          aria-describedby="confirmnote"
                          onFocus={() => setMatchFocus(true)}
                          onBlur={() => setMatchFocus(false)}
                      />
                      <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          It must match your password.
                      </p>

                      <button disabled={!validPwd || !validMatch ? true : false} className="sign-up-button">Update password</button>
                  </form>
              </section>
          )}
      </>
  )
}
export default UpdatePwd
