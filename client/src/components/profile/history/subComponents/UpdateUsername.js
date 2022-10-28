import { useRef, useState, useEffect } from "react";
import { Navigate, Link }  from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import './signup.css'
import axios from 'axios';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[A-z][A-z0-9-_@.]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const UPDATE_USERNAME_URL = 'http://localhost:3001/updateUserName';

const UpdateUsername = (userId) => {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const userID = userId.userId
  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setValidName(USER_REGEX.test(user));
  }, [user])
  useEffect(() => {
      setErrMsg('');
  }, [user])

  const handleSubmit = async (e) => {
      e.preventDefault();
      const v1 = USER_REGEX.test(user);
      if (!v1 ) {
          setErrMsg("invalid input");
          return;
      }
      try {
        const response = await axios.post(UPDATE_USERNAME_URL,
              JSON.stringify({ userID, user }),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: false
              }
          );
          if (response.status === 200) {
            localStorage.removeItem('logged in id');
            localStorage.removeItem('logged in name');
            localStorage.removeItem('useremail');
            setSuccess(true);
          }
          setUser('');
      } catch (err) {
          if (!err?.response) {
              setErrMsg('No response from server');
          }
          else {
              setErrMsg('Update failed')
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
                  <h1>Update your username</h1>
                  <form onSubmit={handleSubmit}>
                      <label htmlFor="username">
                          New username:
                          <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="text"
                          id="username"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          required
                          aria-invalid={validName ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setUserFocus(true)}
                          onBlur={() => setUserFocus(false)}
                      />
                      <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          4 to 24 characters.<br />
                          Your username must begin with a letter.<br />
                          Letters, numbers, underscores are allowed.
                      </p>

                      <button disabled={!validName ? true : false} className="sign-up-button">Update username</button>
                  </form>
              </section>
          )}
      </>
  )
}
export default UpdateUsername
