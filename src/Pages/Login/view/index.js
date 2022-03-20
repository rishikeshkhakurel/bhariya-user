import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft, BsApple, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../../../common/Components/loading/LoadingComp";
import InputFeildComponent from "../../../common/Components/InputFeildComponent";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
import FormValidationMsg from "../../../common/Components/FormValidationMsg";
import { useLoginMutation } from "../../../Redux/Services/FetchApi";
import { changingId, changingRole } from "../../../Redux/Services/authSlice";
const UserLoginPage = (props) => {
  const [value, setValue] = useState();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [loginData, loginDataResponseInfo] = useLoginMutation();
  const sendLoginInfo = (e) => {
    e.preventDefault()
    let emailOrPhone = enteredEmail;
    if (emailOrPhone.includes("@")) {
      emailOrPhone = enteredEmail;
    } else {
      emailOrPhone = `977${enteredEmail}`;
    }
    loginData({
      userfield: emailOrPhone,
      password: enteredPassword,
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (loginDataResponseInfo.isSuccess) {
      localStorage.setItem("token", loginDataResponseInfo.data.token);
      localStorage.setItem("userid", loginDataResponseInfo.data.user_id);
      localStorage.setItem("userState", loginDataResponseInfo.data.userrole);
      if (enteredEmail.includes("@")) {
        localStorage.setItem(
          "hash",
          btoa(`${enteredEmail + ":" + enteredPassword}`)
        );
      } else {
        localStorage.setItem(
          "hash",
          btoa(`977${enteredEmail + ":" + enteredPassword}`)
        );
      }
      dispatch(
        changingRole(loginDataResponseInfo.data.userrole.toLowerCase()),
        changingId(loginDataResponseInfo.data.userid)
      );
    }
  }, [loginDataResponseInfo.isSuccess]);

  const validationFunction = () => {
    const emailValidation = enteredEmail.length >= 10;
    if (enteredPassword.length >= 8 && emailValidation) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      {loginDataResponseInfo.isLoading && <Loading />}
      <div className="UserLoginPage">
        <div className="UserLoginPage_backButton">
          <Link to="/">
            <span>
              <BsArrowLeft />
            </span>
            to Home Page
          </Link>
        </div>
        <div className="UserLoginPage_middle">
          <div className="UserLoginPage_middle-imgcontainer">
            <img src="/assets/logo.svg" alt="logo" />
          </div>
          <div className="UserLoginPage_middle-form">
            <div className="UserLoginPage_middle-form--1">
              <h2>Login In</h2>
              <span className="UserLoginPage_middle-form--1-link">
                <Link to="/signup">SignUp</Link>
              </span>
              <form onSubmit={sendLoginInfo}>
                <Row>
                  <Col>
                    <InputFeildComponent
                      placeholder="Email/Phone Number"
                      label="Email/phone number "
                      type="text"
                      value={enteredEmail}
                      onChange={(e) => setEnteredEmail(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <InputFeildComponent
                      placeholder="Password"
                      label="Password"
                      value={enteredPassword}
                      type="Password"
                      onChange={(e) => setEnteredPassword(e.target.value)}
                    />
                  </Col>
                  {loginDataResponseInfo.error?.data?.Message && (
                    <FormValidationMsg
                      msg={`${loginDataResponseInfo.error.data.Message}`}
                    />
                  )}
                </Row>

                <Row>
                  <Col className="d-flex justify-content-center">
                    or signin with
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="userSignUpPage_middle-form_socials">
                      <div className="userSignUpPage_middle-form_socials-1">
                        <BsFacebook />
                      </div>
                      <div className="userSignUpPage_middle-form_socials-1">
                        <BsApple />
                      </div>
                      <div className="userSignUpPage_middle-form_socials-1">
                        <FcGoogle />
                      </div>
                    </div>
                  </Col>
                </Row>
                <PrimaryButton
                  disabled={validationFunction()}
                  type="submit"
                >
                  Sign In
                </PrimaryButton>
              </form>
              <Row>
                <Col className="d-flex justify-content-center">
                  <Link style={{ color: "#E94235" }} to="/resetpassword">
                    Forget Password
                  </Link>
                </Col>
              </Row>
            </div>
            <div className="UserLoginPage_middle-form--2">
              <img src="/assets/cycle.svg" alt="img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLoginPage;
