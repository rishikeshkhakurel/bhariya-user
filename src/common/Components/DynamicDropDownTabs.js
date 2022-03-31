import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
const DynamicDropDownTabs = (props) => {
  const [businessState, setBusinessStateState] = useState(0);
  const businessStateHandeller = (value) => {
    setBusinessStateState(value);
  };
  const dropDownItems = props.arryOfList;

  const { pathname } = useLocation();
  return (
    <>
      <Link to={props.link}>
        <div
          // onClick={() => businessStateHandeller(0)}
          className={`AdminNavigationButton ${
            props.isActive && "AdminNavigationButton--isactive"
          }`}
        >
          <span>{props.children}</span>
          <span>{props.title}</span>
        </div>
      </Link>
      {props.dropdown && dropDownItems.length >= 1 && (
        <div className="AdminNavigationButton-business">
          {dropDownItems.map((value, index) => {
            return (
              <Link
                to={`${props.link}/${value.id}`}
              >
                <div
                  // onClick={() => businessStateHandeller(index)}
                  className={`AdminNavigationButton-business-box ${
                    pathname.includes(
                      `${props.link}/${value.id}`
                    ) && "business-box-isActive"
                  } `}
                >
                  {value.name}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* {props.dropdown && (
        <div className="AdminNavigationButton-business">
          <Link to={`${props.link}/:id`}>
            <div
              onClick={() => businessStateHandeller(0)}
              className={`AdminNavigationButton-business-box ${
                businessState === 0 && "business-box-isActive"
              } `}
            >
              Business one
            </div>
          </Link>
          <Link to={`${props.link}/:id`}>
            <div
              onClick={() => businessStateHandeller(1)}
              className={`AdminNavigationButton-business-box ${
                businessState === 1 && "business-box-isActive"
              } `}
            >
              Business Two
            </div>
          </Link>
          <Link to={`${props.link}/:id`}>
            <div
              onClick={() => businessStateHandeller(2)}
              className={`AdminNavigationButton-business-box ${
                businessState === 2 && "business-box-isActive"
              } `}
            >
              Business Two
            </div>
          </Link>
        </div>
      )} */}
    </>
  );
};

export default DynamicDropDownTabs;
