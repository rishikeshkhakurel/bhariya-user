import React, { useCallback, useEffect, useState } from "react";
import { RiShareBoxFill } from "react-icons/ri";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Button, MenuItem, Select, Checkbox } from "@material-ui/core";
import { BiPencil } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import LableCom from "../../../common/Components/LableCom";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
import InputFeildComponent from "../../../common/Components/InputFeildComponent";
import SecondaryButton from "../../../common/Components/Button/SecondaryButton";
import DailogComp from "../../../common/Components/Dailog/DailogComp";
import Loading from "../../../common/Components/loading/LoadingComp";
import AlertBox from "../../../common/AlertBox";
import { arrayOfLocation } from "../../../common/utils/LocationObject";
import AutocompleteSetting from "../../../common/Components/AutoComplete";
import {
  useSendbulkdataMutation,
  useSendRequestDeliveryFormMutation,
  useGetBusinessFormQuery,
  useGetBranchDetailsQuery,
  useGetuserSettingQuery,
  useSetSearchUserQuery,
} from "../../../Redux/Services/FetchApi";
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
const RequestDeliveryForm = () => {
  const getAllBranchResponseInfo = useGetBranchDetailsQuery();
  const listOfBranches = getAllBranchResponseInfo?.data?.results?.map(
    (value) => value.branchname
  );

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

  const getuserSettingResponseInfo = useGetuserSettingQuery();

  const [searchUser, setSearchUser] = useState("");

  const searchUserDataResponseInfo = useSetSearchUserQuery(searchUser);

  const fillValueOfData = (id) => {
    searchUserDataResponseInfo.data.map((value) => {
      if (value.id === id) {
        setDeliveryto(value.fullname);
        setPhoneNumber(value.phonenumber);
        setEmail(value.email);
        setAddress(value.address);
      }
    });
    setSearchUser("");
  };

  useEffect(() => {
    console.log("dataaaaaaaaaaaaaaaa", getuserSettingResponseInfo);
    if (getuserSettingResponseInfo.isSuccess) {
      setPickUpName(getuserSettingResponseInfo.data[0].fullname);
      setPickUpContact(getuserSettingResponseInfo.data[0].phonenumber);
      console.log("pickkuppppppppppp", pickupContact);
      setPickUpEmail(getuserSettingResponseInfo.data[0].email);
      setPickUpLocation(getuserSettingResponseInfo.data[0].address);
    }
  }, [getuserSettingResponseInfo.isSuccess]);
  const getUserDetails = () => {};
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

  const [bulkuploaddailog, setBulkuploaddailog] = useState(false);
  const bulkuploaddailoghandeller = () => {
    setBulkuploaddailog(!bulkuploaddailog);
  };
  const handleOpenDialogBulkUpload = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sendCsvFile, sendCsvFileResponseInfo] = useSendbulkdataMutation();

  const sendfiletobackend = (e) => {
    const files = e.target.files;

    const file = files[0];
    if (file) {
      const formdata = new FormData();
      formdata.append("file_name", file);
      sendCsvFile(formdata);
    }
  };

  const gotoBulkOption = () => {
    navigate("/deliveryhistory/requestdeliveryform/bulktabel");
  };
  const [sendRequestDelivery, sendRequestDeliveryResponseInfo] =
    useSendRequestDeliveryFormMutation();

  // const branchOption = ["pokhara", "kathmandu", "janakpur"];

  const getBranchListResponseInfo = useGetBranchDetailsQuery();
  const [branchOption, setBranchOption] = useState([]);
  useEffect(() => {
    if (getBranchListResponseInfo.isSuccess) {
      const newArray = getBranchListResponseInfo.data?.map((value) => {
        return value.branchname;
      });
      setBranchOption(newArray);
    }
  }, [getBranchListResponseInfo.isSuccess]);

  const onSubmitForm = () => {
    if (phoneNumber.includes("977")) {
      setPhoneNumber(phoneNumber);
    } else {
      setPhoneNumber(Number(`977${phoneNumber}`));
    }
    sendRequestDelivery({
      business: business,
      cod: cod,
      deliveryto: deliveryTo,
      packagedetail: packagedetail,
      deliverybranch: deliveryBranch,
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
      recievingbranch: pickupBranch,
      senderlivelocation: pickupLiveLocation,
    });
  };

  useEffect(() => {
    if (sendCsvFileResponseInfo.isSuccess) {
      setBulkuploaddailog(false);
    }
  }, [sendCsvFileResponseInfo.isSuccess]);

  useEffect(() => {
    if (sendRequestDeliveryResponseInfo.isSuccess) {
      setBusiness("none");
      setCod("");
      setDeliveryBranch("");
      setDeliveryto("");
      setEmail("");
      setLiveLocation("");
      setPackageValue("");
      setPackagedetail("");
      setPhoneNumber("");
      setAddress("");
      setProductname("");
      setRequestPickUp(false);
      setRequestSucess(true);
    }
  }, [sendRequestDeliveryResponseInfo.isSuccess]);

  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [customAddress, setCustomAddress] = useState("");

  const getBusinessForm = useGetBusinessFormQuery();
  const [openAddCustomDailog, setopenAddCustomDailog] = useState(false);

  const [fetchOrAdd, setFetchOrAdd] = useState(true);

  const fetchOrAddHandeller = () => {
    setFetchOrAdd(!fetchOrAdd);
  };
  const openAddCustomDailogHandeller = () => {
    setopenAddCustomDailog(!openAddCustomDailog);
  };

  const [toCheckDetailsEnteredState, setToCheckDetailsEnteredState] = useState({
    packagedetail: false,
    deliveryInformation: false,
    pickUpInformation: false,
  });

  return (
    <>
      {sendCsvFileResponseInfo.isLoading ||
        (sendRequestDeliveryResponseInfo.isLoading && <Loading />)}
      {sendCsvFileResponseInfo.isSuccess ||
        (sendRequestDeliveryResponseInfo.isSuccess && (
          <AlertBox AlertMessage={"your Order is placed"} />
        ))}
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
          open={bulkuploaddailog}
          dailogHandeller={bulkuploaddailoghandeller}
          title="Bulk File"
        >
          <div className="bulkfileupload">
            <div className="bulkfileupload__box">
              <div className="bulkfileupload__box__imgcontainer">
                <img src="/assets/copylink.svg" alt="svg" />
              </div>
              <div className="bulkfileupload__box__title">
                <label className="bulkfileupload__box__title" for="file">
                  Choose file from your device
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  style={{ display: "none" }}
                  placeholder="Choose file from your device"
                  onChange={(e) => sendfiletobackend(e)}
                />
              </div>
            </div>
            {/* <div className="bulkfileupload__box">
            <div className="bulkfileupload__box__imgcontainer">
              <img src="/assets/copydocument.svg" alt="svg" />
            </div>
            <div className="bulkfileupload__box__title">
              <h2>Attach file frm goofle excel/CSB files</h2>
            </div>
          </div> */}
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
              arrayofoption={arrayOfLocation.region}
              placeholder="Please Chose your region"
              onChange={(e, v) => setRegion(v)}
              value={region}
            />
            <AutocompleteSetting
              name="City"
              arrayofoption={arrayOfLocation.region}
              placeholder="Please Chose your city"
              onChange={(e, v) => setCity(v)}
              value={city}
            />
            <AutocompleteSetting
              name="Area"
              arrayofoption={arrayOfLocation.region}
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
              type="phonenumber"
            />
            <InputFeildComponent
              placeholder="Email"
              label="Email"
              type="email"
              value={pickupEmail}
              onChange={(e) => setPickUpEmail(e.target.value)}
            />
            <AutocompleteSetting
              name="Pick Up Branch"
              arrayofoption={listOfBranches}
              placeholder="Please Chose branch You want to pickup"
              onChange={(e, v) => setPickUpBranch(v)}
              value={pickupBranch}
            />
            <InputFeildComponent
              placeholder="Location"
              label="Location"
              type="text"
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
              <div className="userhomepage_form-details__bulksection">
                <span> for uploadingrequest in large amount</span>
                <SecondaryButton onClick={bulkuploaddailoghandeller}>
                  Bulk Upload
                </SecondaryButton>
                <SecondaryButton onClick={gotoBulkOption}>
                  Bulk option
                </SecondaryButton>
                {/* <SecondaryButton>One by one view</SecondaryButton> */}
              </div>
              <div className="userhomepage_form-details-form">
                <div className="userhomepage_form-details-form-heading">
                  <LableCom name="Package Information" />
                </div>
                <div>
                  <div>
                    <div>
                      <InputFeildComponent
                        placeholder="Eg: book"
                        label="Product Name"
                        type="text"
                        value={productname}
                        onChange={(e) => setProductname(e.target.value)}
                      />
                    </div>
                    <div>
                      <InputFeildComponent
                        placeholder="Any sensitive case"
                        label="Package details"
                        type="text"
                        value={packagedetail}
                        onChange={(e) => setPackagedetail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <InputFeildComponent
                        placeholder="Eg: Rs 1300"
                        label="Package Value"
                        type="number"
                        value={packagevalue}
                        onChange={(e) => setPackageValue(e.target.value)}
                      />
                    </div>
                    <div>
                      <InputFeildComponent
                        placeholder="Eg: Rs1200"
                        label="COD"
                        type="number"
                        value={cod}
                        onChange={(e) => setCod(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="userhomepage_form-details-form-search">
                    <div className="userhomepage_form-details-form-search-input">
                      <input
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                        type="text"
                        placeholder="Search User by Phone number/Email"
                      />
                      <BsSearch className="userhomepage_form-details-form-search-input-icon" />
                    </div>
                    <div
                      className={
                        searchUser.length > 0
                          ? "userhomepage_form-details-form-search__container"
                          : "userhomepage_form-details-form-search__container isOverFlowed"
                      }
                    >
                      {searchUser.length > 0 &&
                        searchUserDataResponseInfo.data.map((value) => {
                          if (value.user_role === "user") {
                            if (
                              value.id != getuserSettingResponseInfo.data[0].id
                            ) {
                              return (
                                <div
                                  onClick={() => fillValueOfData(value.id)}
                                  key={value.id}
                                  className="userhomepage_form-details-form-search__box"
                                >
                                  <h3>{value.fullname}</h3>
                                  <p>
                                    {value.phonenumber
                                      ? value.phonenumber
                                      : value.email}{" "}
                                    | {value.address}
                                  </p>
                                </div>
                              );
                            } else {
                              return (
                                <div className="userhomepage_form-details-form-search__box">
                                  No details Found
                                </div>
                              );
                            }
                          }
                        })}
                    </div>
                  </div>
                </div>
                <div className="userhomepage_form-details-form-heading">
                  <LableCom name="Delivery Information" />
                </div>
                <div>
                  <div>
                    <div>
                      <InputFeildComponent
                        placeholder="Name"
                        label="Delivery to"
                        type="text"
                        value={deliveryTo}
                        onChange={(e) => setDeliveryto(e.target.value)}
                      />
                    </div>
                    <div>
                      <InputFeildComponent
                        placeholder="Number"
                        label="Phone Number"
                        type="phonenumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <InputFeildComponent
                        placeholder="Email Address"
                        label="Email"
                        type="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <InputFeildComponent
                        placeholder="Eg: Koteshor"
                        label="Address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: "0px" }}>
                    <div>
                      <AutocompleteSetting
                        name="Delivery Branch"
                        arrayOfOption={branchOption}
                        placeholder="Eg: Kathmandu"
                        type="text"
                        onChange={(e, v) => setDeliveryBranch(v)}
                        value={deliveryBranch}
                      />
                    </div>
                    <div>
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
                    </div>
                  </div>
                </div>
                <div>
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

                  <div>
                    <Checkbox
                      style={{ color: "#28bb46" }}
                      checked={requestPickUp}
                      type="checkbox"
                      label="Request pick up"
                      onChange={(e) => setRequestPickUp(!requestPickUp)}
                    />
                  </div>
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
                    Request Order
                  </PrimaryButton>
                  <SecondaryButton>Save As Draft</SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestDeliveryForm;
