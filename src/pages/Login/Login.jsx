import React, { useState, useEffect } from "react";
import sideblueimg from "../../assets/image/sideblueimg.png";
import githubimg from "../../assets/image/github.png";
import twitterimg from "../../assets/image/twitter.png";
import linkedinimg from "../../assets/image/linkedin.png";
import discordimg from "../../assets/image/discord.png";
import googleimg from "../../assets/image/google.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  loadingReducer,
  loadingSelector,
} from "../../utils/reducers/userSlice";
import Loader from "../../components/Loader/Loader";

const Login = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [active, setActive] = useState("signin");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [createUserName, setCreateUserName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createPhone, setCreatePhone] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const loading = useSelector(loadingSelector);

  // user login function
  const userLoginHandler = async (e) => {
    e.preventDefault();
    dispatch(loadingReducer(true));
    try {
      const res = await axios.post(
        "https://job-portal-api-m1ml.onrender.com/api/auth/login",
        {
          username: username,
          password: password,
        }
      );
      dispatch(getUserData(res.data));
      setSuccess(true);
      localStorage.setItem("loggedin", true);
      navigation("/", { replace: true });
    } catch (err) {
      setError(err);
      console.log(err.response);
      setSuccess(false);
    }
    dispatch(loadingReducer(false));
  };

  const userSignUpHandler = async (e) => {
    e.preventDefault();
    dispatch(loadingReducer(true));
    try {
      const res = await axios.post(
        "https://job-portal-api-m1ml.onrender.com/api/auth/register",
        {
          username: createUserName,
          email: createEmail,
          password: createPassword,
          phone: createPhone,
        }
      );
      dispatch(getUserData(res.data));
      localStorage.setItem("loggedin", true);
      navigation("/", { replace: true });
      setSuccess(true);
    } catch (err) {
      setError(err);
      setSuccess(false);
      console.log("User not created");
    }
    dispatch(loadingReducer(false));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="login-container">
      <div className="sideComponent">
        <div className="logoContainer">
          <img className="sideImage" src={sideblueimg} alt="sideimage" />
          <div className="boardText">Job-Nest</div>
          <div className="logotext">Job-Nest</div>
          <div className="icons">
            <img src={githubimg} alt="GitHub" className="icon" />
            <img src={discordimg} alt="discord" className="icon" />
            <img src={twitterimg} alt="twitter" className="icon" />
            <img src={linkedinimg} alt="linkedin" className="icon" />
          </div>
        </div>
      </div>
      <div className="userlogincomponents">
        {/* Sign in component */}
        {active === "signin" ? (
          <>
            <h1>Sign in</h1>
            <span>Sign in to your account</span>
            <br />
            <div className="googlebtncontainer">
              <img src={googleimg} width={15} height={15} alt="Google" />
              <button className="signinwithgoogle">Sign in with gooogle</button>
            </div>
            <br />
            <div className="textinputs">
              <form>
                <label>User Name</label>
                <input
                  type="text"
                  className="username"
                  placeholder="user-name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  className="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span>Forgot password?</span>
                <button className="signin" onClick={userLoginHandler}>
                  Sign in
                </button>
                <br />
              </form>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "5px",
                }}
              >
                Dont have an account ?
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setActive("signup")}
                >
                  register here
                </span>
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Register component */}
            <h1>Sign up</h1>
            <span>Create an account</span>
            <br />
            <div className="textinputs">
              <form>
                <label>User Name</label>
                <input
                  type="text"
                  className="username"
                  placeholder="user-name"
                  value={createUserName}
                  onChange={(e) => setCreateUserName(e.target.value)}
                />
                <label>Email</label>
                <input
                  placeholder="Email"
                  type="email"
                  className="email"
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                />
                <label>Phone</label>
                <input
                  placeholder="Enter phone number"
                  type="number"
                  className="phone"
                  value={createPhone}
                  onChange={(e) => setCreatePhone(e.target.value)}
                />
                <label>Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  className="password"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                />
                <br />
                <button className="signin" onClick={userSignUpHandler}>
                  Sign Up
                </button>
                <br />
              </form>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "5px",
                }}
              >
                Already have
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setActive("signin")}
                >
                  {" "}
                  an account?
                </span>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
