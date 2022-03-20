import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useGetBusinessFormQuery } from "../../Redux/Services/FetchApi";
const AdminNavigationButton = (props) => {
  const [businessState, setBusinessStateState] = useState(0);
  const businessStateHandeller = (value) => {
    setBusinessStateState(value);
  };

  const [businessFormState, setBusinessFormState] = useState([]);
  const getBusinessForm = useGetBusinessFormQuery();

  const { pathname } = useLocation();

  useEffect(() => {
    if (getBusinessForm.isSuccess) {
      setBusinessFormState(getBusinessForm);
    }
  }, [getBusinessForm]);

  return (
    <>
      <Link to={props.link}>
        <div
          className={`AdminNavigationButton ${
            props.link.includes(pathname) && "AdminNavigationButton--isactive"
          }`}
        >
          <span>{props.children}</span>
          <span>{props.title}</span>
        </div>
      </Link>
      {props.dropdown && (
        <div className="AdminNavigationButton-business">
          {businessFormState?.data?.results?.map((value, index) => {
            return (
              <Link to={`/business/${value.id}`}>
                <div
                  onClick={() => businessStateHandeller(index)}
                  className={`AdminNavigationButton-business-box ${
                    props.link.includes(pathname) && "business-box-isActive"
                  } `}
                >
                  {value.businessname}
                </div>
              </Link>
            );
          })}
          <Link to="/business">
            <div
              onClick={() => businessStateHandeller(10)}
              className={`AdminNavigationButton-business-box AdminNavigationButton-business-box-add ${
                props.link.includes(pathname) && "business-box-isActive"
              }`}
            >
              <AiOutlinePlus /> <span> Add Business</span>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default AdminNavigationButton;
