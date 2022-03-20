import React from "react";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useEffect } from "react";
import InputFeildComponent from "../../../common/Components/InputFeildComponent";
import LableCom from "../../../common/Components/LableCom";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
import SecondaryButton from "../../../common/Components/Button/SecondaryButton";
import { useAddBusinessFormMutation } from "../../../Redux/Services/FetchApi";
import Loading from "../../../common/Components/loading/LoadingComp";
import AlertBox from "../../../common/AlertBox";
import { Col, Row } from "react-bootstrap";

const UserBusiness = () => {
  const maxNumber = 3;
  const [businessname, setBusinessname] = useState("");
  const [contactperson, setContactpersion] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState("");
  const [pan, setPan] = useState("");
  const [images, setImages] = useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const [businessform, businessFormResponseInfo] = useAddBusinessFormMutation();

  const sendBusinessForm = () => {
    const dataurl = images.map((value) => value.data_url);
    businessform({
      businessname: businessname,
      contactperson: contactperson,
      contactnumber: contactNumber,
      contactemail: contactEmail,
      monthlyvolume: monthlyVolume,
      pan: pan,
      addfile: dataurl,
    });
  };

  const clearAllValue = () => {
    setBusinessname("");
    setMonthlyVolume("");
    setContactNumber("");
    setContactpersion("");
    setPan("");
    setContactEmail("");
    setImages([]);
  };

  useEffect(() => {
    if (businessFormResponseInfo.isSuccess) {
      clearAllValue();
    }
  }, [businessFormResponseInfo.isSuccess]);

  const [isValidated, setIsValidated] = useState(true);

  const checkvalidation = () => {
    const dataurl = images.map((value) => value.data_url);
    if (
      businessname &&
      contactperson &&
      contactNumber &&
      contactEmail &&
      monthlyVolume &&
      pan &&
      dataurl.length > 1
    ) {
      setIsValidated(false);
    } else {
      setIsValidated(true);
    }
  };

  useEffect(() => {
    checkvalidation();
  }, [
    businessname,
    contactperson,
    contactNumber,
    contactEmail,
    monthlyVolume,
    pan,
    images,
  ]);
  return (
    <>
      {businessFormResponseInfo.isLoading && <Loading />}
      {businessFormResponseInfo.isSuccess && (
        <AlertBox AlertMessage={"your business form is sucessfully added"} />
      )}
      {businessFormResponseInfo.isError && (
        <AlertBox isError AlertMessage={"Plaese try Again"} />
      )}
      <div className="userAdmin-business">
        <div className="userAdmin--header">
          <h2>Business</h2>
          <p>Promote your business</p>
        </div>
        <div className="userAdmin-business-form">
          <div className="userAdmin-business-form-heading">Business form</div>
          <div className="userAdmin-business-form_inputs">
            <Row>
              <Col>
                <InputFeildComponent
                  label="Business Name"
                  placeholder="Local Dealier"
                  type="text"
                  value={businessname}
                  onChange={(e) => setBusinessname(e.target.value)}
                />
              </Col>
              <Col>
                <InputFeildComponent
                  label="Contact Person"
                  placeholder="Sushmita Limbu"
                  type="text"
                  value={contactperson}
                  onChange={(e) => setContactpersion(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputFeildComponent
                  label="Contact"
                  placeholder="ex-9823213213"
                  value={contactNumber}
                  type="phonenumber"
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </Col>
              <Col>
                <InputFeildComponent
                  label="Email"
                  placeholder="example@gmail.com"
                  value={contactEmail}
                  type="email"
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputFeildComponent
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(e.target.value)}
                  label="Monthly Volume"
                  type="number"
                  placeholder="Ex-40"
                />
              </Col>
              <Col>
                <InputFeildComponent
                  label="PAN Number"
                  placeholder="Ex-423143218"
                  type="number"
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                />
              </Col>
            </Row>
            <div className="businessformAddDocuments-error">
              <LableCom name="Add Files/Documents" />
              <p className="businessForm-errorText">
                To verify your business details please upload the scan of
                Company Registration & Pan
              </p>
            </div>
            <div>
              <div>
                <ImageUploading
                  multiple
                  value={images}
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
                          {images?.map((value, index) => {
                            return (
                              <div
                                key={index}
                                className="businessformAddDocuments__images__imgcontainer"
                              >
                                <span>
                                  <MdOutlineCancel
                                    onClick={() => onImageRemove(index)}
                                  />
                                </span>
                                <img src={value?.data_url} alt="img" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </ImageUploading>
              </div>
            </div>
            <div className="businessformAddDocuments-button">
              <PrimaryButton disabled={isValidated} onClick={sendBusinessForm}>
                Add Now
              </PrimaryButton>
              <SecondaryButton onClick={clearAllValue}>Clear</SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBusiness;
