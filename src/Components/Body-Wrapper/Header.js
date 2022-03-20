import { Avatar, makeStyles, Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

function Header(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="adminHeader">
      <Link to="/dashboard">
        <div className="adminHeader__imgcontainer">
          <img src="/assets/logo.svg" alt="logo" />
        </div>
      </Link>
      <div className="adminHeader__details">
        <div className="adminHeader__details-notification"></div>
        <Avatar
          alt="Remy Sharp"
        //   src={userProfileDetails.profileUrl}
        src="rishi"
          className={classes.large}
        />
        <div className="adminHeader__details-name">
          <button onClick={handleClick}>
            {/* {userProfileDetails.name}  */}
            Rishi
            <ExpandMoreIcon size="20px" />
          </button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="/dashboard">
              <MenuItem>Back To Home</MenuItem>
            </Link>
            <Link to="/setting">
              <MenuItem>My account</MenuItem>
            </Link>
            <MenuItem onClick={() => props.changeRole(null)}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
