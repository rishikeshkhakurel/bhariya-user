import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { IoIosArrowDown } from "react-icons/io";
import DailogComp from "./Dailog/DailogComp";
import PrimaryButton from "./Button/PrimaryButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const CommentBox = (props) => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [whomToShow, setWhomToShow] = useState({
    courier: false,
    user: false,
    rider: false,
    branch: false,
    recever: false,
    thirdPartyRider: false,
  });
  const changeWhomToShowHandeller = (key) => {
    switch (key) {
      case "courier":
        setWhomToShow({
          ...whomToShow,
          courier: !whomToShow.courier,
        });
        break;
      case "user":
        setWhomToShow({
          ...whomToShow,
          user: !whomToShow.user,
        });
        break;
      case "rider":
        setWhomToShow({
          ...whomToShow,
          rider: !whomToShow.rider,
        });
        break;
      case "branch":
        setWhomToShow({
          ...whomToShow,
          branch: !whomToShow.branch,
        });
        break;
      case "recever":
        setWhomToShow({
          ...whomToShow,
          recever: !whomToShow.recever,
        });
        break;
      case "thirdPartyRider":
        setWhomToShow({
          ...whomToShow,
          thirdPartyRider: !whomToShow.thirdPartyRider,
        });
        break;
      default:
        break;
    }
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <DailogComp
      dailogHandeller={props.dailogHandeller}
      open={props.open}
      title={props.title ? props.title : "Add new comment"}
    >
      <div className="addCommentDailog">
        <div className="addCommentDailo-textarea">
          <textarea
            {...props}
            className="addCommentDailog-textarea"
            id="textAreaComments"
            name="commentTextArea"
            onChange={props.onChange}
            rows="8"
            placeholder="Add a new commet"
          ></textarea>
        </div>
        <div className="addCommentDailog--switch">
          {props.switchLabel && (
            <FormGroup row>
              <FormControlLabel
                control={
                  <>
                    <Switch
                      checked={true}
                      onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                    <div className={classes.root}>
                      <div>
                        <Button
                          ref={anchorRef}
                          aria-controls={open ? "menu-list-grow" : undefined}
                          aria-haspopup="true"
                          onClick={handleToggle}
                        >
                          Show to <IoIosArrowDown />
                        </Button>
                        <Popper
                          open={open}
                          anchorEl={anchorRef.current}
                          role={undefined}
                          transition
                          disablePortal
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin:
                                  placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                              }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                  >
                                    <div className="swirchCheckbox">
                                      <input
                                        checked={whomToShow.courier}
                                        type="checkbox"
                                        id="Courier"
                                        onClick={() =>
                                          changeWhomToShowHandeller("courier")
                                        }
                                      />
                                      <label for="Courier"> Courier</label>
                                      <br />
                                      <input
                                        checked={whomToShow.user}
                                        type="checkbox"
                                        id="user"
                                        onClick={() =>
                                          changeWhomToShowHandeller("user")
                                        }
                                      />
                                      <label for="user"> user</label>
                                      <br />
                                      <input
                                        type="checkbox"
                                        id="Rider"
                                        name="Rider"
                                        checked={whomToShow.rider}
                                        onClick={() =>
                                          changeWhomToShowHandeller("rider")
                                        }
                                      />
                                      <label for="Rider">Rider</label>
                                      <br />
                                      <input
                                        type="checkbox"
                                        id="Branch"
                                        name="Branch"
                                        checked={whomToShow.branch}
                                        onClick={() =>
                                          changeWhomToShowHandeller("branch")
                                        }
                                      />
                                      <label for="branch">Branch</label>
                                      <br />
                                      <input
                                        type="checkbox"
                                        id="Receiver"
                                        name="Receiver"
                                        checked={whomToShow.recever}
                                        onClick={() =>
                                          changeWhomToShowHandeller("recever")
                                        }
                                      />
                                      <label for="branch">Recever</label>
                                      <br />
                                      <input
                                        type="checkbox"
                                        id="thirdPartyRider"
                                        checked={whomToShow.thirdPartyRider}
                                        name="thirdPartyRider"
                                        onClick={() =>
                                          changeWhomToShowHandeller(
                                            "thirdPartyRider"
                                          )
                                        }
                                      />
                                      <label for="thirdPartyRider">
                                        3rd Party Rider
                                      </label>
                                    </div>
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </div>
                    </div>
                  </>
                }
              />
            </FormGroup>
          )}
        </div>
        <div className="addCommentDailo-button">
          <PrimaryButton
            disabled={props.value?.length > 0 ? false : true}
            onClick={() => props.onConfirm(whomToShow)}
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </DailogComp>
  );
};

export default CommentBox;
