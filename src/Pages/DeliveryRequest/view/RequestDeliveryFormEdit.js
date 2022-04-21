import React, { useEffect, useState } from "react";
import { RiShareBoxFill } from "react-icons/ri";
import { Row, Col, Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Button, MenuItem, Select } from "@material-ui/core";
import { BiPencil } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FacebookShareButton } from "react-share";
import { useParams } from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  useGetBranchDetailsQuery,
  useGetBusinessFormQuery,
  useGetDeliveryHistoryDataByidQuery,
  useUpdateDeliveryHistoryDataByidMutation,
} from "../../../Redux/Services/FetchApi";
import SecondaryButton from "../../../common/Components/Button/SecondaryButton";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
import LableCom from "../../../common/Components/LableCom";
import InputFeildComponent from "../../../common/Components/InputFeildComponent";
import AutocompleteSetting from "../../../common/Components/AutoComplete";
import DailogComp from "../../../common/Components/Dailog/DailogComp";
import { arrayOfLocation } from "../../../common/utils/LocationObject";
import AlertBox from "../../../common/Components/AlertBox";
import Loading from "../../../common/Components/loading/LoadingComp";
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "#28bb46",
  },
  tooltip: {
    backgroundColor: "#28bb46",
    fontSize: 14,
  },
}));
function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
const buttonRef = React.createRef();

const RequestDeliveryFormEdit = () => {
  const getAllBranchResponseInfo = useGetBranchDetailsQuery();
  const listOfBranches = getAllBranchResponseInfo?.data?.map(
    (value) => value.branchname
  );
  const { id: deliveryId } = useParams();

  const getDeliveryHistoryDataByidResponseInfo =
    useGetDeliveryHistoryDataByidQuery(deliveryId);

  const [getPosition, setGetPosition] = useState({
    showDailog: true,
    gotLocation: false,
    longitute: null,
    latitude: null,
  });
  // form data
  const [business, setBusiness] = useState("none");
  const [productname, setProductname] = useState("");
  const [packagedetail, setPackagedetail] = useState("");
  const [packagevalue, setPackageValue] = useState("");
  const [cod, setCod] = useState("");
  const [deliveryTo, setDeliveryto] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryBranch, setDeliveryBranch] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [livelocation, setLiveLocation] = useState("");
  const [address, setAddress] = useState("");
  const [requestPickUp, setRequestPickUp] = useState(true);
  const [pickupName, setPickUpName] = useState("");
  const [pickupContact, setPickUpContact] = useState("");
  const [pickupEmail, setPickUpEmail] = useState("");
  const [pickupLocation, setPickUpLocation] = useState("");
  const [pickupBranch, setPickUpBranch] = useState("");
  const [pickupLiveLocation, setPickUpLiveLocation] = useState("");
  const [LandMark, setLandMark] = useState("");
  const [weight, setWeight] = useState();

  const setAllDataToDefault = () => {
    setBusiness(getDeliveryHistoryDataByidResponseInfo.data.business);
    setProductname(getDeliveryHistoryDataByidResponseInfo.data.productname);
    setPackagedetail(getDeliveryHistoryDataByidResponseInfo.data.packagedetail);
    setPackageValue(getDeliveryHistoryDataByidResponseInfo.data.packagevalue);
    setWeight(getDeliveryHistoryDataByidResponseInfo.data.weight);
    setCod(getDeliveryHistoryDataByidResponseInfo.data.cod);
    setDeliveryto(getDeliveryHistoryDataByidResponseInfo.data.deliveryto);
    setPhoneNumber(getDeliveryHistoryDataByidResponseInfo.data.phone);
    setEmail(getDeliveryHistoryDataByidResponseInfo.data.email);
    setLandMark(getDeliveryHistoryDataByidResponseInfo.data.nearestlandmark);
    setDeliveryBranch(
      getDeliveryHistoryDataByidResponseInfo.data.deliverybranch
    );
    setLiveLocation(getDeliveryHistoryDataByidResponseInfo.data.livelocation);
    setAddress(getDeliveryHistoryDataByidResponseInfo.data.deliverylocation);
    setRequestPickUp(getDeliveryHistoryDataByidResponseInfo.data.requestpickup);
    setPickUpName(getDeliveryHistoryDataByidResponseInfo.data.order[0].name);
    setPickUpEmail(
      getDeliveryHistoryDataByidResponseInfo.data.order[0].senderemail
    );
    setPickUpContact(
      getDeliveryHistoryDataByidResponseInfo.data.order[0].sendercontact
    );
    setPickUpLocation(
      getDeliveryHistoryDataByidResponseInfo.data.order[0].senderlocation
    );
    setPickUpBranch(
      getDeliveryHistoryDataByidResponseInfo.data.order[0].recievingbranch
    );
    setPickUpLiveLocation(
      getDeliveryHistoryDataByidResponseInfo.data.order[0].senderlivelocation
    );
  };
  useEffect(() => {
    if (getDeliveryHistoryDataByidResponseInfo.isSuccess) {
      setAllDataToDefault();
    }
  }, [getDeliveryHistoryDataByidResponseInfo]);

  useEffect(() => {
    fetchUserLiveLocation();
  }, []);

  const fetchUserLiveLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPickUpLiveLocation(
        `${position.coords.longitude},${position.coords.latitude}`
      );
    });
  };

  const getLocationOfuserAgain = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLiveLocation(
        `${position.coords.longitude},${position.coords.latitude}`
      );
    });
  };
  const [fetchOrAdd, setFetchOrAdd] = useState(true);
  const [value, setValueTime] = React.useState("time");

  const handleChange = (event) => {
    setValueTime(event.target.value);
  };

  const shareUrl = window.location.href;

  const [ShareDailogOpen, setShareDailogOpen] = useState(false);
  const ShareDailogOpenHandeller = () => {
    setShareDailogOpen(!ShareDailogOpen);
  };

  const [pickUpInformationDailog, setPickUpInformationDailog] = useState(false);
  const pickUpinformationDailogHandeller = () => {
    setPickUpInformationDailog(!pickUpInformationDailog);
  };

  const [requestSucess, setRequestSucess] = useState(false);
  const requestSucessHandeller = () => {
    setRequestSucess(!requestSucess);
  };

  const LocationMessage = () => {
    if (getPosition.longitute === null) {
      return "Please Click get Location to Add Live Location";
    } else {
      return `${getPosition.longitute} , ${getPosition.latitude}`;
    }
  };

  const [shareLink, setShareLink] = useState(false);
  const shareCopyLinkHandeller = () => {
    setShareLink(true);
    const urlValue = window.location.href;
    navigator.clipboard.writeText(urlValue);
  };

  const [writingState, setWritingState] = useState(1);
  const changeWritingStateHandeller = (state) => {
    setWritingState(state);
  };

  const [sendRequestDeliveryUpdate, sendRequestDeliveryResponseInfo] =
    useUpdateDeliveryHistoryDataByidMutation();

  // const branchOption = ["pokhara", "kathmandu", "janakpur"];

  const getBranchListResponseInfo = useGetBranchDetailsQuery();
  const fetchOrAddHandeller = () => {
    setFetchOrAdd(!fetchOrAdd);
  };
  const [branchOption, setBranchOption] = useState([]);
  useEffect(() => {
    if (getBranchListResponseInfo.isSuccess) {
      const newArray = getBranchListResponseInfo.data.map((value) => {
        return value.branchname;
      });
      setBranchOption(newArray);
    }
  }, [getBranchListResponseInfo.isSuccess]);

  const onSubmitForm = () => {
    sendRequestDeliveryUpdate({
      id: deliveryId,
      data: {
        business: business,
        cod: cod,
        packagedetail: packagedetail,
        deliverybranch: deliveryBranch,
        deliveryto: deliveryTo,
        deliverylocation: address,
        email: email,
        livelocation: fetchOrAdd ? livelocation : customLocation.label,
        packagevalue: packagevalue,
        phone: phoneNumber,
        productname: productname,
        requestpickup: requestPickUp,
        name: pickupName,
        sendercontact: pickupContact,
        senderemail: pickupEmail,
        senderlocation: pickupLocation,
        senderlivelocation: pickupLiveLocation,
        recievingbranch: pickupBranch,
        weight: weight,
        nearestlandmark:LandMark,
      },
    });
  };

  useEffect(() => {
    if (sendRequestDeliveryResponseInfo.isSuccess) {
      setAllDataToDefault();
    }
  }, [sendRequestDeliveryResponseInfo.isSuccess]);

  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [customAddress, setCustomAddress] = useState("");

  const getBusinessForm = useGetBusinessFormQuery();
  const [openAddCustomDailog, setopenAddCustomDailog] = useState(false);
  const openAddCustomDailogHandeller = () => {
    setopenAddCustomDailog(!openAddCustomDailog);
  };
  return (
    <>
      {sendRequestDeliveryResponseInfo.isLoading && <Loading />}
      {sendRequestDeliveryResponseInfo.isSuccess && (
        <AlertBox AlertMessage={"your Order is Edited"} />
      )}
      <div className="userhomepage">
        <DailogComp
          dailogHandeller={requestSucessHandeller}
          open={requestSucess}
        >
          <div className="userhomepage__request">
            <div className="userhomepage__request-imgcontainer">
              <img
                src={process.env.PUBLIC_URL + "/assets/clapping.png"}
                alt="clapping"
              />
            </div>
            <h2>Thank you for your order</h2>
            <h4>
              Thank you for placing your order{" "}
              <span> #{sendRequestDeliveryResponseInfo?.data?.id}</span>
            </h4>
            <p>
              We will send you a notification in your email or can call you for
              your conformation.
            </p>
          </div>
        </DailogComp>
        <DailogComp
          dailogHandeller={openAddCustomDailogHandeller}
          open={openAddCustomDailog}
        >
          <div className="userhomepage_pickuplocation">
            <h2>Add Custom Location</h2>
            <AutocompleteSetting
              name="Region"
              arrayOfOption={arrayOfLocation.region}
              placeholder="Please Chose your region"
              onChange={(e, v) => setRegion(v)}
              value={region}
            />
            <AutocompleteSetting
              name="City"
              arrayOfOption={arrayOfLocation.region}
              placeholder="Please Chose your city"
              onChange={(e, v) => setCity(v)}
              value={city}
            />
            <AutocompleteSetting
              name="Area"
              arrayOfOption={arrayOfLocation.region}
              placeholder="Please Chose your area"
              onChange={(e, v) => setArea(v)}
              value={area}
            />
            <InputFeildComponent
              placeholder="Address"
              value={customAddress}
              label="Address"
              onChang={(e) => setCustomAddress(e.target.value)}
              type="text"
            />
            <PrimaryButton>Save Change</PrimaryButton>
          </div>
        </DailogComp>
        <DailogComp
          dailogHandeller={pickUpinformationDailogHandeller}
          open={pickUpInformationDailog}
        >
          <div className="userhomepage_pickuplocation">
            <h2>Change your pickup Information</h2>
            <InputFeildComponent
              value={pickupName}
              onChange={(e) => setPickUpName(e.target.value)}
              placeholder="Name"
              label="Name"
              type="text"
            />
            <InputFeildComponent
              placeholder="Contact"
              label="Contact"
              value={pickupContact}
              onChange={(e) => setPickUpContact(e.target.value)}
              type="text"
            />
            <InputFeildComponent
              placeholder="Email"
              label="Email"
              type="Email"
              value={pickupEmail}
              onChange={(e) => setPickUpEmail(e.target.value)}
            />

            <AutocompleteSetting
              name="Delivery Branch"
              arrayOfOption={branchOption}
              placeholder="Eg: Kathmandu"
              onChange={(e, v) => setDeliveryBranch(v)}
              value={deliveryBranch}
            />
            <InputFeildComponent
              placeholder="Location"
              label="Location"
              type="Text"
              value={pickupLocation}
              onChange={(e) => setPickUpLocation(e.target.value)}
            />
            <InputFeildComponent
              placeholder="Live Location"
              label="Live Location"
              type="Text"
              value={pickupLiveLocation}
            />
            <div className="fetchlocation">
              <span onClick={fetchUserLiveLocation}>Fetch</span>
            </div>
            <PrimaryButton onClick={pickUpinformationDailogHandeller}>
              Save Change
            </PrimaryButton>
          </div>
        </DailogComp>
        <div className="userhomepage_banner">
          <div className="userhomepage_banner-imgcontainer">
            <img src="/assets/happydeliveryMan.png" alt="img" />
          </div>
          <div className="userhomepage_banner-caption">
            <h2>Delivery service that is always next to you</h2>
            <h3>You are one way ahead </h3>
          </div>
        </div>
        <div className="userhomepage_form">
          <div className="userhomepage_form-navigation">
            <div
              className={`${
                business &&
                productname &&
                packagedetail &&
                packagevalue &&
                cod &&
                "userhomepage_form-navigation--1 isActive"
              }`}
            >
              <span className="userhomepage_form-navigation-number">1</span>
              Package Details
            </div>
            <div
              className={`${
                deliveryTo &&
                phoneNumber &&
                email &&
                address &&
                deliveryBranch &&
                (livelocation || customLocation) &&
                "userhomepage_form-navigation--1 isActive"
              }`}
            >
              <span className="userhomepage_form-navigation-number">2</span>
              Delivery Information
            </div>
            <div
              className={`${
                pickupName &&
                pickupContact &&
                pickupEmail &&
                pickupBranch &&
                pickupLocation &&
                pickupLiveLocation &&
                "userhomepage_form-navigation--1 isActive"
              }`}
            >
              <span className="userhomepage_form-navigation-number">3</span>
              Pick up Information
            </div>
          </div>
          {/* {getPosition.showDailog && (
          <DailogComp open={!getPosition.gotLocation} dailogHandeller={null}>
            <div className="homepagePopUpShare">
              <div className="homepagePopUpShare--imgcontainer">
                <img src="/assets/map.png" alt="map" />
              </div>
              <h2>Enable your current location</h2>
              <p>
                This app may requires that the location dervice are turn on on
                your device. You may enable your location in your device.
              </p>
              <PrimaryButton
                onClick={() => {
                  getLocationOfuser();
                }}
              >
                Allow While using this app
              </PrimaryButton>
              <SecondaryButton onClick={locationAccessDailogHandeller}>
                Dont Allow This app
              </SecondaryButton>
            </div>
          </DailogComp>
        )} */}

          <div className="userhomepage_form-details-handeller">
            <div className="userhomepage_form-details">
              <div className="userhomepage_form-details-heading">
                <h1>Request Delivery Form</h1>
                <DailogComp
                  dailogHandeller={ShareDailogOpenHandeller}
                  open={ShareDailogOpen}
                  title={"share"}
                >
                  <div className="homepagePopUpShare-ifallowed">
                    <div
                      onClick={shareCopyLinkHandeller}
                      className="shareContainer"
                    >
                      <div
                        className="shareContainer__imgcontainer"
                        style={{ background: "#F7F8FA" }}
                      >
                        <img src="/assets/iconcopy.png" alt="copy" />
                      </div>
                      <h4>Copy</h4>
                    </div>
                    <FacebookShareButton url={shareUrl}>
                      <div className="shareContainer">
                        <div
                          className="shareContainer__imgcontainer"
                          style={{ background: "#3b5999" }}
                        >
                          <img src="/assets/facebook.png" alt="facebook" />
                        </div>
                        <h4>Facebook</h4>
                      </div>
                    </FacebookShareButton>
                    <FacebookShareButton url={shareUrl}>
                      <div className="shareContainer">
                        <div
                          className="shareContainer__imgcontainer"
                          style={{ background: "#28BB46" }}
                        >
                          <img src="/assets/whatsapp.png" alt="facebook" />
                        </div>
                        <h4>Whatsapp</h4>
                      </div>
                    </FacebookShareButton>
                    <FacebookShareButton url={shareUrl}>
                      <div className="shareContainer">
                        <div
                          className="shareContainer__imgcontainer"
                          style={{ background: "#9069AE" }}
                        >
                          <img src="/assets/viber.png" alt="facebook" />
                        </div>
                        <h4>Viber</h4>
                      </div>
                    </FacebookShareButton>
                    <FacebookShareButton url={shareUrl}>
                      <div className="shareContainer">
                        <div
                          className="shareContainer__imgcontainer"
                          style={{ background: "#158CFF" }}
                        >
                          <img src="/assets/messenger.png" alt="facebook" />
                        </div>
                        <h4>Messenger</h4>
                      </div>
                    </FacebookShareButton>
                  </div>
                  {shareLink && (
                    <p className="SharelinkMsg">your share link is coppied</p>
                  )}
                </DailogComp>
                <PrimaryButton
                  onClick={ShareDailogOpenHandeller}
                  endIcon={<RiShareBoxFill />}
                >
                  Share
                </PrimaryButton>
              </div>
              <div className="selectfeildcomp">
                <Select
                  disableUnderline
                  labelId="label"
                  id="select"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                >
                  <MenuItem value="none">Chose Business</MenuItem>
                  {getBusinessForm?.data?.map((value, index) => (
                    <MenuItem value={`${value.businessname}`}>
                      {value.businessname}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              {/* <div className="userhomepage_form-details__bulksection">
                <span> for uploadingrequest in large amount</span>
                <SecondaryButton onClick={bulkuploaddailoghandeller}>
                  Bulk Upload
                </SecondaryButton>
                <SecondaryButton onClick={gotoBulkOption}>
                  Bulk option
                </SecondaryButton>
                <SecondaryButton>One by one view</SecondaryButton>
              </div> */}
              <div className="userhomepage_form-details-form">
                <div className="userhomepage_form-details-form-heading">
                  <LableCom name="Package Information" />
                </div>
                <div onClick={() => changeWritingStateHandeller(1)}>
                  <Row>
                    <Col>
                      <InputFeildComponent
                        placeholder="Eg: book"
                        label="Product Name"
                        type="text"
                        value={productname}
                        onChange={(e) => setProductname(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <InputFeildComponent
                        placeholder="Any sensitive case"
                        label="Package details"
                        type="text"
                        value={packagedetail}
                        onChange={(e) => setPackagedetail(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputFeildComponent
                        placeholder="Eg: Rs 1300"
                        label="Package Value"
                        type="text"
                        value={packagevalue}
                        onChange={(e) => setPackageValue(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <InputFeildComponent
                        placeholder="Eg: Rs1200"
                        label="COD"
                        type="text"
                        value={cod}
                        onChange={(e) => setCod(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputFeildComponent
                        placeholder="Eg: 10 kg"
                        label="Weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </Col>
                    <Col />
                  </Row>
                  <div className="userhomepage_form-details-form-search">
                    <div className="userhomepage_form-details-form-search-input">
                      <input
                        type="text"
                        placeholder="Seacrh User by Phone number/Email"
                      />
                      <BsSearch className="userhomepage_form-details-form-search-input-icon" />
                    </div>
                  </div>
                </div>
                <div className="userhomepage_form-details-form-heading">
                  <LableCom name="Delivery Information" />
                </div>
                <div onClick={() => changeWritingStateHandeller(2)}>
                  <Row>
                    <Col>
                      <InputFeildComponent
                        placeholder="Name"
                        label="Delivery to"
                        type="text"
                        value={deliveryTo}
                        onChange={(e) => setDeliveryto(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <InputFeildComponent
                        placeholder="Number"
                        label="Phone Number"
                        type="Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputFeildComponent
                        placeholder="Email Address"
                        label="Email"
                        type="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <InputFeildComponent
                        placeholder="Eg: Koteshor"
                        label="Address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "0px" }}>
                    <Col>
                      <InputFeildComponent
                        placeholder="Eg: Bank, Chowk"
                        label="Nearest LandMark"
                        type="text"
                        value={LandMark}
                        onChange={(e) => setLandMark(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <AutocompleteSetting
                        name="Pick Up Branch"
                        arrayOfOption={listOfBranches}
                        placeholder="Please Chose branch You want to pickup"
                        onChange={(e, v) => setPickUpBranch(v)}
                        value={pickupBranch}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {fetchOrAdd ? (
                        <InputFeildComponent
                          placeholder="Live Location"
                          label="Live Location"
                          type="text"
                          disabled
                          value={livelocation}
                          onChange={(e) => setLiveLocation(e.target.value)}
                        />
                      ) : (
                        <div className="addCustomLocation">
                          <LableCom name="Delivery Location" />
                          <GooglePlacesAutocomplete
                            apiKey="AIzaSyBNq93JSTKS4YrKHs1JFn3XDolKZt0Cb5E"
                            selectProps={{
                              style: {
                                option: (provider) => ({
                                  ...provider,
                                  fontSize: "10px",
                                }),
                              },
                              customLocation,
                              onChange: setCustomLocation,
                            }}
                            autocompletionRequest={{
                              componentRestrictions: {
                                country: "np",
                              },
                            }}
                          />
                        </div>
                      )}
                      <div className="addlocation">
                        {fetchOrAdd ? (
                          <button type="none" onClick={getLocationOfuserAgain}>
                            Get Location
                          </button>
                        ) : null}
                        <button type="none" onClick={fetchOrAddHandeller}>
                          {fetchOrAdd ? "Add Custom" : "Add Live Location"}
                        </button>
                      </div>
                    </Col>
                    <Col />
                  </Row>
                </div>
                <div onClick={() => changeWritingStateHandeller(3)}>
                  {/* <LableCom name="When Would You like to Place A Delivery Order?" />
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={value}
                      onChange={handleChange}
                      input={{
                        ...register("DeliveryTime", { required: true }),
                      }}
                    >
                      <FormControlLabel
                        value="Delivery Now"
                        control={<Radio />}
                        label="Delivery Now "
                      />
                      <FormControlLabel
                        value="time"
                        control={<Radio />}
                        label="Set date and time"
                      />
                    </RadioGroup>
                  </FormControl>

                  {value === "time" && (
                    <div className="userhomepage_form-details-form_dateAndTime">
                      <Row xs={4} md={9} lg={10}>
                        <Col>
                          <input
                            {...register("DeliveryDate")}
                            type="date"
                            className="inputfeildcomponent"
                          />
                        </Col>
                        <Col>
                          <input
                            {...register("DeliveryTime")}
                            type="time"
                            className="inputfeildcomponent"
                          />
                        </Col>
                      </Row>
                    </div>
                  )} */}

                  <Form.Group
                    className="mb-3 userhomepage_form-details-form_buttonGrop"
                    id="formGridCheckbox"
                    onChange={(e) => setRequestPickUp(!requestPickUp)}
                  >
                    <Form.Check
                      checked={requestPickUp}
                      type="checkbox"
                      label="Request pick up"
                    />
                  </Form.Group>
                  {requestPickUp && (
                    <div className="userhomepage_form-details-form_delivery">
                      <h3>
                        Pick up information
                        <span> *</span>
                        <BootstrapTooltip
                          arrow
                          title="Change the Information"
                          placement="right"
                        >
                          <Button onClick={pickUpinformationDailogHandeller}>
                            <span>
                              <BiPencil />
                            </span>
                          </Button>
                        </BootstrapTooltip>
                      </h3>
                      <p>{pickupName}</p>
                      <p>{pickupContact}</p>
                      <p>{pickupEmail}</p>
                      <p>{pickupBranch}</p>
                      <p>{pickupLocation}</p>
                      <p>{pickupLiveLocation}</p>
                    </div>
                  )}
                </div>
                <div className="userhomepage_form-details-form_buttonGrop">
                  <PrimaryButton onClick={onSubmitForm} type="submit">
                    Save
                  </PrimaryButton>
                  <SecondaryButton onClick={setAllDataToDefault}>
                    Reset
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestDeliveryFormEdit;
