import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import LableCom from "../../../common/Components/LableCom";
import InputFeildComponent from "../../../common/Components/InputFeildComponent";
import AlertBox from "../../../common/Components/AlertBox";
import Loading from "../../../common/Components/loading/LoadingComp";
import { useGetBusinessFormByIdQuery, useUpdateBusinessFormByIdMutation } from "../../../Redux/Services/FetchApi";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
import SecondaryButton from "../../../common/Components/Button/SecondaryButton";
const BusinessDetails = () => {
  const { id } = useParams();
  const getBusinessFormByIdResponseInfo = useGetBusinessFormByIdQuery(id);

  const maxNumber = 3;
  const { register, handelSubmit } = useForm();

  const [businessname, setBusinessname] = useState("");
  const [contactperson, setContactpersion] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState("");
  const [pan, setPan] = useState("");
  const [images, setImages] = useState([]);

  console.log("..............",contactNumber)

  const [businessform, businessFormResponseInfo] =
    useUpdateBusinessFormByIdMutation();

  const sendBusinessForm = () => {
    const dataurl = images.map((value) => value);
    businessform({
      id: id,
      data: {
        id: id,
        businessname: businessname,
        contactperson: contactperson,
        contactnumber: contactNumber,
        contactemail: contactEmail,
        monthlyvolume: monthlyVolume,
        pan: pan,
        addfile: dataurl,
      },
    });
  };
  const clearAllValue = () => {
    setBusinessname(getBusinessFormByIdResponseInfo?.data?.businessname);
    setMonthlyVolume(getBusinessFormByIdResponseInfo?.data?.monthlyvolume);
    setContactNumber(getBusinessFormByIdResponseInfo?.data?.contactnumber);
    setContactpersion(getBusinessFormByIdResponseInfo?.data?.contactperson);
    setPan(getBusinessFormByIdResponseInfo?.data?.pan);
    setContactEmail(getBusinessFormByIdResponseInfo?.data?.contactemail);
    const imageList = getBusinessFormByIdResponseInfo.data.business.map(
      (value) => value.addfile
    );
    setImages(imageList);
  };
  useEffect(() => {
    if (getBusinessFormByIdResponseInfo.isSuccess) {
      clearAllValue();
    }
  }, [getBusinessFormByIdResponseInfo.isSuccess]);
  useEffect(() => {
    if (getBusinessFormByIdResponseInfo.isSuccess) {
      clearAllValue();
    }
  }, [id]);

  const onChange = (imageList, addUpdateIndex) => {
    const newImage = imageList?.map((value) => {
      if (value?.data_url) {
        return value.data_url;
      } else return value;
    });
    setImages(newImage);
  };

  return (
    <>
      {businessFormResponseInfo.isLoading ||
        (getBusinessFormByIdResponseInfo.isLoading && <Loading />)}
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
                  value={businessname}
                  type="text"
                  onChange={(e) => setBusinessname(e.target.value)}
                />
              </Col>
              <Col>
                <InputFeildComponent
                  label="Contact Person"
                  placeholder="Sushmita Limbu"
                  value={contactperson}
                  type="text"
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
                  placeholder="Ex-40"
                  type="number"
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
                                <img src={value} alt="img" />
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
              <PrimaryButton onClick={sendBusinessForm}>Update</PrimaryButton>
              <SecondaryButton onClick={clearAllValue}>Clear</SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessDetails;
