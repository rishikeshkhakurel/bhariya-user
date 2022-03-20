import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import InputFeildComponent from "../../../common/Components/InputFeildComponent";
import LableCom from "../../../common/Components/LableCom";
import AutocompleteSetting from "../../../common/Components/AutoComplete";
import AccordionForSetting from "../../../common/Components/AccordionForSetting";
import { ImageUploadReact } from "../../../common/Components/ImageUploadReact";
import { Col, Row } from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const Settings = () => {
  const classes = useStyles();

  // const userState = useSelector((state) => state.authentiaction.role);
  const userState = localStorage.getItem("userState");
  const [securityOrProfile, setSecurityOrProfile] = useState(false);

  const changeSecurityOrProfile = () => {
    setSecurityOrProfile(!securityOrProfile);
  };

  return (
    <div className="userAdmin-Settings">
      <div className="userAdmin--header">
        <h2>
          {userState === "user"
            ? "User Settings"
            : userState === "rider"
            ? "Rider Settings"
            : null}
          <br />
          <p>
            Here, you can edit your profile, change your preferences and log in
            information
          </p>
        </h2>
      </div>
      <div className="userAdmin-Settings-avatar">
        <ImageUploadReact />
      </div>
      <div className="userAdmin-Settings-box">
        <div className="userAdmin-Settings-box-button">
          <button
            className={
              securityOrProfile && "userAdmin-Settings-box-button-isNotActive"
            }
            onClick={changeSecurityOrProfile}
          >
            My Profile
          </button>
          <button
            onClick={changeSecurityOrProfile}
            className={
              !securityOrProfile && "userAdmin-Settings-box-button-isNotActive"
            }
          >
            Security
          </button>
        </div>
        <div className="userAdmin-Settings--form">
          {!securityOrProfile ? (
            <div className="userAdmin-Settings--form-myprofile">
              <Row>
                <Col>
                  <AccordionForSetting />
                </Col>
              </Row>
            </div>
          ) : (
            <div className="userAdmin-Settings--form-myprofile">
              <Row>
                <Col>
                  <AccordionForSetting forSecurity />
                </Col>
              </Row>
            </div>
          )}
          {userState === "rider" && (
            <>
              <h2 className="riderPaymentheading">Enter your full details</h2>
              <Row>
                <Col>
                  <InputFeildComponent label="Alternative Number" />
                </Col>
                <Col>
                  <InputFeildComponent label="Permanent Address" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputFeildComponent label="Guardian's Name" />
                </Col>
                <Col>
                  <InputFeildComponent label="Guardian Contact" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputFeildComponent label="Guardian's Address" />
                </Col>
                <Col>
                  <AutocompleteSetting name="Vechile Type" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputFeildComponent
                    arrayOfOption={["Scoter", "Bike", "Van"]}
                    label="Vechilr Number"
                  />
                </Col>
                <Col>
                  <LableCom name="Submit License" />
                  <div className="userAdmin-Settings--form--citizen">
                    <div className="userAdmin-Settings--form--citizen-imgcontainer">
                      <img src="/assets/upload.png" alt="upload" />
                    </div>
                    <Link to="#">
                      <h5>Upload your file here</h5>
                    </Link>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <LableCom name="Submit Bill Book" />
                  <div className="userAdmin-Settings--form--citizen">
                    <div className="userAdmin-Settings--form--citizen-imgcontainer">
                      <img src="/assets/upload.png" alt="upload" />
                    </div>
                    <Link to="#">
                      <h5>Upload your file here</h5>
                    </Link>
                  </div>
                </Col>
                <Col>
                  <LableCom name="Submit Citizenship" />
                  <div className="userAdmin-Settings--form--citizen">
                    <div className="userAdmin-Settings--form--citizen-imgcontainer">
                      <img src="/assets/upload.png" alt="upload" />
                    </div>
                    <Link to="#">
                      <h5>Upload your file here</h5>
                    </Link>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
