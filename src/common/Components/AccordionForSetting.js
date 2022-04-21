import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ImageUploading from "react-images-uploading";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useEffect } from "react";
import AlertBox from "./AlertBox";
import PrimaryButton from "./Button/PrimaryButton";
import SecondaryButton from "./Button/SecondaryButton";
import InputFeildComponent from "./InputFeildComponent";
import { useChangePasswordUserMutation, useGetuserSettingQuery, useSetUserSettingsMutation } from "../../Redux/Services/FetchApi";
import { Col, Row } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export default function AccordionForSetting(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [name, setName] = useState();
  const [email, setemail] = useState();
  const [userId, setUserId] = useState();
  const [phoneNumber, setPhoneNUmber] = useState();
  const [address, setAddress] = useState();
  const [citizenShip, setCitizenShip] = useState([]);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendgetuserSettingResponseInfo = useGetuserSettingQuery();

  const maxNumber = 2;
  const onChange = (imageList, addUpdateIndex) => {
    setCitizenShip(imageList);
  };

  const addFetchDataToState = () => {
    if(sendgetuserSettingResponseInfo?.data){
      setName(sendgetuserSettingResponseInfo?.data[0]?.fullname);
      setemail(sendgetuserSettingResponseInfo?.data[0]?.email);
      setPhoneNUmber(sendgetuserSettingResponseInfo?.data[0]?.phonenumber);
      setUserId(sendgetuserSettingResponseInfo?.data[0]?.id);
      setAddress(sendgetuserSettingResponseInfo?.data[0]?.address);
      const userCitizen = sendgetuserSettingResponseInfo?.data[0]?.usercitizen.map(
        (value) => {
          return {
            data_url: value?.citizen,
          };
        }
      );
      setCitizenShip(userCitizen);
    }
  };

  useEffect(() => {
    if (sendgetuserSettingResponseInfo.isSuccess) {
      addFetchDataToState();
    }
  }, [sendgetuserSettingResponseInfo]);

  const [setUserSettings, setUserSettingsResponseInfo] =
    useSetUserSettingsMutation();

  const onSaveChangeHandeller = (sendValue) => {
    switch (sendValue) {
      case "name":
        const fulldata = {
          id: 1,
          data: {
            fullname: name,
          },
        };
        setUserSettings(fulldata);
        break;
      case "email":
        setUserSettings({
          id: userId,
          data: {
            email: email,
          },
        });
        break;
      case "phone":
        setUserSettings({
          id: userId,
          data: {
            phonenumber: phoneNumber,
          },
        });
        break;
      case "address":
        setUserSettings({
          id: userId,
          data: {
            address: address,
          },
        });
        break;
      case "citizen":
        const imageList = citizenShip.map((value) => value?.data_url);
        setUserSettings({
          id: userId,
          data: {
            citizen: imageList,
          },
        });
        break;
      default:
        break;
    }
  };
  const changeCancelHandeller = (sendValue) => {
    switch (sendValue) {
      case "name":
        setName(sendgetuserSettingResponseInfo?.data[0]?.fullname);
        break;
      case "email":
        setemail(sendgetuserSettingResponseInfo?.data[0]?.email);

        break;
      case "phone":
        setPhoneNUmber(sendgetuserSettingResponseInfo?.data[0]?.phonenumber);

        break;
      case "address":
        setAddress(sendgetuserSettingResponseInfo?.data[0]?.address);
        break;
      case "citizen":
        const userCitizen =
          sendgetuserSettingResponseInfo?.data[0]?.usercitizen?.map((value) => {
            return {
              data_url: value?.citizen,
            };
          });
        setCitizenShip(userCitizen);
        break;
      default:
        break;
    }
  };

  const [changePasswordUser, changePasswordUserResponseInfo] =
    useChangePasswordUserMutation();
  const sendToChangePassword = () => {
    changePasswordUser({
      old_password: password,
      new_password1: newPassword,
      new_password2: newPassword,
    });
  };
  const clearPasswordFeilds = () => {
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  useEffect(() => {
    if (changePasswordUserResponseInfo.isSuccess) {
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [changePasswordUserResponseInfo.isSuccess]);
  return (
    <>
    {setUserSettingsResponseInfo.isSuccess && (
      <AlertBox AlertMessage={"Your Changes Are Sucessfully Done"} />
    )}
    {changePasswordUserResponseInfo.isSuccess && (
      <AlertBox AlertMessage={"Password Changed Suessfully"} />
    )}
    {changePasswordUserResponseInfo.isError && (
      <AlertBox isError AlertMessage={"something is Wrong"} />
    )}
    <div className={`${classes.root} accordionSetting`}>
      {props.forSecurity ? (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={
                expanded === "panel1" ? (
                  <p className="accordionedit">Close</p>
                ) : (
                  <p className="accordionedit">Edit</p>
                )
              }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Col xs={2}>
                <h3 className="accordionTitle">Password</h3>
              </Col>
              <Col></Col>
            </AccordionSummary>
            <AccordionDetails>
              <div className="accordion__details">
                <Row>
                  <Col>
                    <InputFeildComponent
                      type="password"
                      label="Current Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <InputFeildComponent
                      type="password"
                      label="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <InputFeildComponent
                      type="password"
                      label="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <div className="accordion__details-button">
                    <PrimaryButton onClick={sendToChangePassword}>
                      Save Change{" "}
                    </PrimaryButton>
                    <SecondaryButton onClick={clearPasswordFeilds}>
                      Cancel
                    </SecondaryButton>
                  </div>
                </Row>
              </div>
            </AccordionDetails>
          </Accordion>
          {/* <h3 className="accordingheader">Active Log</h3>
          <div className="accordingdetails">
            <Row>
              <Col xs={2}>Dec 16</Col>
              <Col xs={8}>192.168.1.2</Col>
              <Col style={{ paddingRight: "0px" }}>
                <p className="accordionedit">Delete</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>Dec 15</Col>
              <Col xs={8}>192.168.1.2</Col>
              <Col style={{ paddingRight: "0px" }}>
                <p className="accordionedit">Delete</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>Dec 14</Col>
              <Col xs={8}>192.168.1.2</Col>
              <Col style={{ paddingRight: "0px" }}>
                <p className="accordionedit">Delete</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>Dec 13</Col>
              <Col xs={8}>192.168.1.254</Col>
              <Col style={{ paddingRight: "0px" }}>
                <p className="accordionedit">Delete</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>Dec 12</Col>
              <Col xs={8}>192.168.1.254</Col>
              <Col style={{ paddingRight: "0px" }}>
                <p className="accordionedit">Delete</p>
              </Col>
            </Row>
          </div> */}
        </>
      ) : (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<p className="accordionedit">Edit</p>}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Col xs={2}>
                <h3 className="accordionTitle">Name</h3>
              </Col>
              <Col>
                <h4 className="accordionDiscription">{name}</h4>
              </Col>
            </AccordionSummary>
            <AccordionDetails>
              <div className="accordion__details__name">
                <div className="accordion__details__name__feild">
                  <Row>
                    <Col>
                      <InputFeildComponent
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="Name"
                        label="Name"
                        required={false}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="accordion__details__name__buttons">
                  <Row>
                    <div className="accordion__details-button">
                      <PrimaryButton
                        onClick={() => onSaveChangeHandeller("name")}
                      >
                        Save Change{" "}
                      </PrimaryButton>
                      <SecondaryButton
                        onClick={() => changeCancelHandeller("name")}
                      >
                        Cancel
                      </SecondaryButton>
                    </div>
                  </Row>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={null}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Col xs={2}>
                <h3 className="accordionTitle">User ID</h3>
              </Col>
              <Col>
                <h4 className="accordionDiscription">#{userId}</h4>
              </Col>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>This cannot be changed</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<p className="accordionedit">Edit</p>}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Col xs={2}>
                <h3 className="accordionTitle">Email</h3>
              </Col>
              <Col>
                <h4 className="accordionDiscription">{email}</h4>
              </Col>
            </AccordionSummary>
            <AccordionDetails>
              <div className="accordion__details__name">
                <div className="accordion__details__name__feild">
                  <Row>
                    <Col>
                      <InputFeildComponent
                        onChange={(e) => setemail(e.target.value)}
                        value={email}
                        type="email"
                        required={false}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="accordion__details__name__buttons">
                  <Row>
                    <div className="accordion__details-button">
                      <PrimaryButton
                        onClick={() => onSaveChangeHandeller("email")}
                      >
                        Save Change{" "}
                      </PrimaryButton>
                      <SecondaryButton
                        onClick={() => changeCancelHandeller("email")}
                      >
                        Cancel
                      </SecondaryButton>
                    </div>
                  </Row>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<p className="accordionedit">Edit</p>}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Col xs={2}>
                <h3 className="accordionTitle">Phone number</h3>
              </Col>
              <Col>
                <h4 className="accordionDiscription">{phoneNumber}</h4>
              </Col>
            </AccordionSummary>
            <AccordionDetails>
              <div className="accordion__details__name ">
                <div className="accordion__details__name__feild">
                  <Row>
                    <Col>
                      <InputFeildComponent
                        onChange={(e) => setPhoneNUmber(e.target.value)}
                        value={phoneNumber}
                        type="text"
                        required={false}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="accordion__details__name__buttons">
                  <Row>
                    <div className="accordion__details-button">
                      <PrimaryButton
                        onClick={() => onSaveChangeHandeller("phone")}
                      >
                        Save Change{" "}
                      </PrimaryButton>
                      <SecondaryButton
                        onClick={() => changeCancelHandeller("phone")}
                      >
                        Cancel
                      </SecondaryButton>
                    </div>
                  </Row>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary
              expandIcon={<p className="accordionedit">Edit</p>}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Col xs={2}>
                <h3 className="accordionTitle">Address</h3>
              </Col>
              <Col>
                <h4 className="accordionDiscription">{address}</h4>
              </Col>
            </AccordionSummary>
            <AccordionDetails>
              <div className="accordion__details__name">
                <div className="accordion__details__name__feild">
                  <Row>
                    <Col>
                      <InputFeildComponent
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        type="text"
                        required={false}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="accordion__details__name__buttons">
                  <Row>
                    <div className="accordion__details-button">
                      <PrimaryButton
                        onClick={() => onSaveChangeHandeller("address")}
                      >
                        Save Change{" "}
                      </PrimaryButton>
                      <SecondaryButton
                        onClick={() => changeCancelHandeller("address")}
                      >
                        Cancel
                      </SecondaryButton>
                    </div>
                  </Row>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            <AccordionSummary
              expandIcon={<p className="accordionedit">Edit</p>}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Col xs={2}>
                <h3 className="accordionTitle">Citizenship</h3>
              </Col>
              <Col>
                <h4 className="accordionDiscription">CitizenShip Images</h4>
              </Col>
            </AccordionSummary>
            <AccordionDetails>
              <div className="accordion__details__name accordion__details__name__citizen">
                <div className="accordion__details__name__feild">
                  <Row>
                    <Col>
                      <div>
                        <ImageUploading
                          multiple
                          value={citizenShip}
                          onChange={onChange}
                          maxNumber={maxNumber}
                          dataURLKey="data_url"
                        >
                          {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                          }) => (
                            <>
                              <div className="businessformAddDocuments__imgsection">
                                <div className="businessformAddDocuments__imgupload">
                                  <button onClick={onImageUpload}>
                                    <IoMdAdd />
                                  </button>
                                </div>
                                <div className="businessformAddDocuments__images">
                                  {citizenShip?.map((value, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className="businessformAddDocuments__images__imgcontainer"
                                      >
                                        <span>
                                          <MdOutlineCancel
                                            onClick={() =>
                                              onImageRemove(index)
                                            }
                                          />
                                        </span>
                                        <img
                                          src={value?.data_url}
                                          alt="img"
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </>
                          )}
                        </ImageUploading>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="accordion__details__name__buttons">
                  <Row>
                    <div className="accordion__details-button">
                      <PrimaryButton
                        onClick={() => onSaveChangeHandeller("citizen")}
                      >
                        Save Change{" "}
                      </PrimaryButton>
                      <SecondaryButton
                        onClick={() => changeCancelHandeller("citizen")}
                      >
                        Cancel
                      </SecondaryButton>
                    </div>
                  </Row>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </div>
  </>
  );
}
