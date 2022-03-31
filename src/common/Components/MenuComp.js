import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { IoIosArrowDown } from "react-icons/io";
import { Accordion } from "react-bootstrap";
import { BsArrowLeftShort } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import DailogComp from "./Dailog/DailogComp";
import PrimaryButton from "./Button/PrimaryButton";
import SecondaryButton from "./Button/SecondaryButton";
import TextButton from "./Button/TextButton";
import InputFeildComponent from "./InputFeildComponent";
import LableCom from "./LableCom";
import AreYouSure from "./AreYousureComp/AreYouSure";
import RiderPaymentConformationDailog from "./Dailog/RiderPaymentConformationDailog";
import DeliveryConfirmNote from "./Dailog/DeliveryConfirmNote";
import CommentBox from "./CommentBox";
import SelectAndSearch from "./SelectAndSearch";
import SwitchMode from "./SwitchMode";
import {
  useAssigneToRiderMutation,
  useGetBranchDetailsQuery,
  useGetBusinessFormQuery,
  useGetRiderDetailsQuery,
} from "../../Redux/Services/FetchApi";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuComp(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const getAllBranchResponseInfo = useGetBranchDetailsQuery();
  const getAllBusinessResponseInfo = useGetBusinessFormQuery();
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

  // const userState = useSelector((state) => state.authentiaction.role);
  const userState = localStorage.getItem("userState");

  const dynamicEditMenu = () => {
    switch (userState) {
      case "user":
        if (props.userDeliveryHistory) {
          return (
            <>
              <MenuItem onClick={handleClose}>Cancel</MenuItem>
              <MenuItem onClick={handleClose}>Cancel & Return</MenuItem>
              <MenuItem onClick={handleClose}>Cancel & Detach</MenuItem>
              <MenuItem onClick={handleClose}>Fund</MenuItem>
              <MenuItem onClick={handleClose}>Detach</MenuItem>
              <MenuItem onClick={() => props.onClickToEditUserDelivery()}>
                Edit
              </MenuItem>
            </>
          );
        } else if (props.userDeliveryHistorySortBranch) {
          return (
            <>
              <MenuItem>KathMandu</MenuItem>
              <MenuItem onClick={handleClose}>Dharan</MenuItem>
              <MenuItem onClick={handleClose}>Butwal</MenuItem>
              <MenuItem onClick={handleClose}>Dhamak</MenuItem>
            </>
          );
        } else if (props.BranchList) {
          return getAllBranchResponseInfo?.data?.map((value) => (
            <MenuItem
              onClick={(e)=>
                props.search(value.branchname)
              }
            >
              {value.branchname}
            </MenuItem>
          ));
        } else if (props.userDeliveryHistorySortStatus) {
          return (
            <>
              <MenuItem onClick={(e)=>props.search("delivered")}>Delivered</MenuItem>
              <MenuItem onClick={(e)=>props.search("Picked up")}>Picked up</MenuItem>
              <MenuItem onClick={(e)=>props.search("On the way")}>On the way</MenuItem>
              <MenuItem onClick={(e)=>props.search("Cancel")}>Cancel</MenuItem>
            </>
          );
        } else if (props.userDeliveryHistorySortBusinessType) {
          return getAllBusinessResponseInfo?.data?.map((value) => (
            <MenuItem onClick={(e)=>props.search(value.businessname)}>{value.businessname}</MenuItem>
          ));
        } else if (props.bulktabel) {
          return (
            <>
              <MenuItem onClick={() => props.onClickToConfirm()}>
                Confirm
              </MenuItem>
              <MenuItem onClick={handleClose}>Share</MenuItem>
              <MenuItem onClick={() => props.onClickToRemove()}>
                Remove
              </MenuItem>
            </>
          );
        } else if (props.userRecivingTabel) {
          return (
            <>
              <MenuItem>Confirm Recive</MenuItem>
              {/* <MenuItem onClick={handleClose}>Refund Request</MenuItem>
              <MenuItem onClick={() => props.onClickToRemove()}>
                Exchange Request
              </MenuItem> */}
            </>
          );
        }
        break;
    }
  };

  const [dailogOpen, setDailogOpen] = useState(false);
  const dailogOpenHandeller = () => {
    setDailogOpen(true);
  };
  const dailogCloseHandeller = () => {
    setDailogOpen(false);
  };

  const [paymentOpen, setPaymentOpen] = useState(false);
  const paymentOpenHandeller = () => {
    dailogCloseHandeller();
    setPaymentOpen(true);
  };
  const paymentCloseHandeller = () => {
    setPaymentOpen(false);
  };

  const [deliveryNote, setDeliveryNote] = useState(false);

  const deliveryNoteOpenHandeller = () => {
    paymentCloseHandeller();
    setDeliveryNote(true);
  };
  const deliveryNoteCloseHandeller = () => {
    setDeliveryNote(false);
  };
  const [cancelDelivery, setCancelDelivery] = useState(false);
  const handelcancelDeliveryopen = () => {
    setCancelDelivery(true);
  };
  const handelcancelDeliveryclose = () => {
    setCancelDelivery(false);
  };
  const [openCancelNote, setOpenCancelNote] = useState(false);
  const openCancelNoteHandeller = () => {
    handelcancelDeliveryclose();
    setOpenCancelNote(true);
  };
  const closeCancelNoteHandeller = () => {
    setOpenCancelNote(false);
  };
  const [openDispatchedNote, setOpenDispatchedNote] = useState(false);
  const handellOpenDispatchedNote = () => {
    setOpenDispatchedNote(true);
  };
  const handellCloseDispatchedNote = () => {
    setOpenDispatchedNote(false);
  };

  const [openPickedUpDailog, setopenPickedUpDailog] = useState(false);
  const handellopenPickedUpDailog = () => {
    setopenPickedUpDailog(true);
  };
  const handellClosePickedUpDailog = () => {
    setopenPickedUpDailog(false);
  };

  const [openPickedUpDailogComment, setOpenPickedUpDailogComment] =
    useState(false);

  const handellopenPickedUpDailogComment = () => {
    handellClosePickedUpDailog();
    setOpenPickedUpDailogComment(true);
  };
  const handellClosePickedUpDailogComment = () => {
    setOpenPickedUpDailogComment(false);
  };

  const [openOnTheWayDailog, setOpenOnTheWayDailog] = useState(false);
  const handelOpenOnTheWayDailog = () => {
    setOpenOnTheWayDailog(!openOnTheWayDailog);
  };
  const [riderDetailsState, setRiderDetailsResponseInfo] = useState([]);

  const getRiderDetailsResonseInfo = useGetRiderDetailsQuery();

  useEffect(() => {
    if (getRiderDetailsResonseInfo.isSuccess) {
      setRiderDetailsResponseInfo(getRiderDetailsResonseInfo.data);
    }
  }, [getRiderDetailsResonseInfo]);

  const [searchRiderDailog, setSearchRiderDailog] = useState(false);
  const searchRiderDailogOpenHandeller = () => {
    setOpen(false);
    setSearchRiderDailog(true);
  };
  const searchRiderDailogCloseHandeller = () => {
    setSearchRiderDailog(false);
  };

  const [autoCompleteShow, setAutoCompleteShow] = useState("");

  const [riderListingViewPage, setRiderListingViewPage] = useState(false);

  const [assignedToRider, asignedToRiderResponseInfo] =
    useAssigneToRiderMutation();

  const [riderSelectClickState, setRiderSelectClickState] = useState("");

  const RiderListingViewPageOpenHandeller = (assignedTo, assignedItem) => {
    setRiderSelectClickState({
      assignedId: assignedTo,
      itemId: assignedItem,
    });
    searchRiderDailogCloseHandeller();
    setRiderListingViewPage(true);
  };
  const RiderListingViewPageCloseHandeller = () => {
    setRiderListingViewPage(false);
  };

  const clickOnBackHandeller = () => {
    setRiderListingViewPage(false);
    setSearchRiderDailog(true);
  };
  const [riderViewAddAnote, setRiderViewAddAnote] = useState(false);
  const [riderConfirmNote, setRiderConfirmNote] = useState("");

  const riderViewAddAnoteOpenHandeller = () => {
    RiderListingViewPageCloseHandeller();
    setRiderViewAddAnote(true);
  };
  const riderViewAddAnoteCloseHandeller = () => {
    setRiderViewAddAnote(false);
  };
  const onConfirmAssigneRider = (whomeToShowData) => {
    const dataWhomToShow = [];
    if (whomeToShowData.courier) {
      dataWhomToShow.push("courier");
    }
    if (whomeToShowData.branch) {
      dataWhomToShow.push("branch");
    }
    if (whomeToShowData.recever) {
      dataWhomToShow.push("recever");
    }
    if (whomeToShowData.rider) {
      dataWhomToShow.push("rider");
    }
    if (whomeToShowData.thirdPartyRider) {
      dataWhomToShow.push("thirdPartyRider");
    }
    assignedToRider({
      assignto: riderSelectClickState.assignedId,
      assigneditem: riderSelectClickState.itemId,
      assignby: Number(localStorage.getItem("userid")),
      note: riderConfirmNote,
      whomtoshow: dataWhomToShow.join(" "),
    });
  };
  const [ConformPickUp, setConformPickUp] = useState(false);
  const ConformPickUpHandeller = () => {
    setConformPickUp(!ConformPickUp);
  };
  const onConformPickup = () => {
    setConformPickUp(false);
  };
  const [AssigneDelivery, setAssigneDelivery] = useState(false);
  const AssigneDeliveryOpenHandeller = () => {
    setAssigneDelivery(true);
  };
  const AssigneDeliveryCloseHandeller = () => {
    setAssigneDelivery(false);
  };

  const [assigneBranch, setAssigneBranch] = useState(false);
  const assigneBrancOpenhHandeller = () => {
    AssigneDeliveryCloseHandeller();
    setAssigneBranch(true);
  };
  const assigneBranchHandellerCloseHandeller = () => {
    setAssigneBranch(false);
  };
  const [areYouSureAssigne, setAreYouSureAssigne] = useState(false);
  const areYouSureAssigneOpenHandeller = () => {
    setAssigneBranch(false);
    setAreYouSureAssigne(true);
  };
  const areYouSureAssigneCloseHandeller = () => {
    setAreYouSureAssigne(false);
  };

  const [assigneBranchComment, setAssigneBranchComment] = useState(false);
  const assigneBranchCommentOpenHandeller = () => {
    setAreYouSureAssigne(false);
    setAssigneBranchComment(true);
  };
  const assigneBranchCommentCloseHandeller = () => {
    setAssigneBranchComment(false);
  };

  const [branchTransactionEdit, setBranchTransactionEdit] = useState(false);

  const branchTransactionEditHandeller = () => {
    setBranchTransactionEdit(!branchTransactionEdit);
  };

  const [riderSuspend, setRiderSuspend] = useState(false);
  const riderSuspendHandellerOpen = () => {
    setRiderSuspend(true);
  };
  const riderSuspendHandellerClose = () => {
    setRiderSuspend(false);
  };

  const [riderSuspendComment, setRiderSuspendComment] = useState(false);
  const riderSuspendCommentHandellerOpen = () => {
    riderSuspendHandellerClose();
    setRiderSuspendComment(true);
  };
  const riderSuspendCommentHandellerClose = () => {
    setRiderSuspendComment(false);
  };

  const [branchRiderAddPayment, setBranchRiderAddPayment] = useState(false);
  const branchRiderAddPaymentOpenHandeller = () => {
    setBranchRiderAddPayment(true);
  };
  const branchRiderAddPaymentCloseHandeller = () => {
    setBranchRiderAddPayment(false);
  };

  return (
    <div className={classes.root}>
      <div>
        <CommentBox
          open={riderSuspendComment}
          dailogHandeller={riderSuspendCommentHandellerClose}
        />
        <DailogComp
          open={branchRiderAddPayment}
          dailogHandeller={branchRiderAddPaymentCloseHandeller}
          title="Add Payment"
        >
          <div className="branchRiderPayment">
            <div className="branchRiderPayment-heading">
              <div className="addCommentDailog--switch">
                <span>
                  Add Salary
                  <SwitchMode label={"Add Payment"} />
                </span>
              </div>
            </div>
          </div>
        </DailogComp>
        <DailogComp
          open={branchTransactionEdit}
          dailogHandeller={branchTransactionEditHandeller}
          title="Edit Drivers"
        >
          <div className="BranchTransactionEdit">
            <div>
              <div>
                <InputFeildComponent label="Order Id" />
              </div>
              <div>
                <InputFeildComponent label="Ref Id" />
              </div>
            </div>
            <div>
              <div>
                <LableCom name="Payment Type" />
                <SelectAndSearch placeholder="Payment Type" />
              </div>
              <div>
                <LableCom name="Payment Mode" />
                <SelectAndSearch placeholder="Payment Mode" />
              </div>
            </div>
            <div>
              <div>
                <InputFeildComponent label="Amount" />
              </div>
              <div>
                <InputFeildComponent label="Note" required={false} />
              </div>
            </div>
            <div className="BranchTransactionEdit__buttons">
              <PrimaryButton>Save Change</PrimaryButton>
              <SecondaryButton>Cancel</SecondaryButton>
            </div>
          </div>
        </DailogComp>

        <DailogComp
          open={searchRiderDailog}
          dailogHandeller={searchRiderDailogCloseHandeller}
          title="Search Rider"
        >
          <div className="branchDeliveryOrdersRiderSearchDailog">
            <div className="branchDeliveryOrdersRiderSearchDailog__inputs">
              <input
                value={autoCompleteShow}
                onChange={(e) => setAutoCompleteShow(e.target.value)}
                type="text"
              />
              <IoIosArrowDown />
            </div>
            {autoCompleteShow.length !== 0 && (
              <>
                {riderDetailsState.map((value) => {
                  return (
                    <div className="branchDeliveryOrdersRiderSearchDailog__dropdown">
                      <div className="branchDeliveryOrdersRiderSearchDailog__dropdown-box">
                        <Accordion defaultActiveKey="no">
                          <Accordion.Item>
                            <Accordion.Header>
                              <div
                                onClick={() =>
                                  RiderListingViewPageOpenHandeller(
                                    value.id,
                                    props.itemIdConfirm
                                  )
                                }
                                className="branchDeliveryOrdersRiderSearchDailog__dropdown-box_top"
                              >
                                <div className="branchDeliveryOrdersRiderSearchDailog__dropdown-box_top-imgcontainer">
                                  <img
                                    src={value.rider.profilepicture}
                                    alt="hero"
                                  />
                                </div>
                                <h3>
                                  {value.rider.fullname} <br />{" "}
                                  <span>#{value.rider.id}</span>
                                </h3>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body>
                              <div className="branchDeliveryOrdersRiderSearchDailog__dropdown-box-bottom">
                                <div className="branchDeliveryOrdersRiderSearchDailog__dropdown-box-bottom-left">
                                  <h4>
                                    Today’s Delivered <br /> 4
                                  </h4>
                                </div>
                                <div className="branchDeliveryOrdersRiderSearchDailog__dropdown-box-bottom-right"></div>
                                <h4>
                                  Today’s Pending <br /> 4
                                </h4>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </DailogComp>
        <DailogComp
          dailogHandeller={RiderListingViewPageCloseHandeller}
          open={riderListingViewPage}
          title={
            <>
              <div className="riderListingViewPagetitle">
                <div className="riderListingViewPagetitle_icon">
                  <BsArrowLeftShort
                    onClick={clickOnBackHandeller}
                    fontSize="30px"
                  />
                </div>
                <div className="riderListingViewPagetitle_title">
                  {getRiderDetailsResonseInfo.data?.results?.map((value) => {
                    if (value.id === riderSelectClickState.assignedId) {
                      return `${value.rider.fullname + " #" + value.rider.id}`;
                    }
                  })}
                </div>
              </div>
            </>
          }
        >
          <div className="riderListingViewPagetitle__box">
            <div className="riderListingViewPagetitle__box-top">
              <div className="riderListingViewPagetitle__box-top-imgcontainer">
                {getRiderDetailsResonseInfo?.data?.results &&
                  getRiderDetailsResonseInfo.data?.results?.map((value) => {
                    if (value.id === riderSelectClickState.assignedId) {
                      return (
                        <img src={value.rider.profilepicture} alt="hero" />
                      );
                    }
                  })}
              </div>
              {getRiderDetailsResonseInfo?.data?.results &&
                getRiderDetailsResonseInfo.data?.results.map((value) => {
                  if (value.id === riderSelectClickState.assignedId) {
                    return (
                      <h3>
                        Kotheshowr, Kathmandu <br />{" "}
                        <span>{value.rider.phonenumber}</span>
                      </h3>
                    );
                  }
                })}
              <div className="riderListingViewPagetitle__box-top-buttons">
                <TextButton>Available Now</TextButton>
              </div>
            </div>
            <div className="riderListingViewPagetitle__box-details">
              <div className="branchDeliveryOrdersRiderSearchDailog__dropdown-box-bottom">
                <h4>
                  Today’s Delivered <br /> 4
                </h4>
                <h4>
                  Today’s Pending <br /> 4
                </h4>
                <h4>
                  Today’s Delivered <br /> 4
                </h4>
              </div>
            </div>
            <div className="riderListingViewPagetitle__box-buttons">
              <PrimaryButton onClick={riderViewAddAnoteOpenHandeller}>
                Assigne Now
              </PrimaryButton>
              <SecondaryButton onClick={RiderListingViewPageCloseHandeller}>
                Cancel
              </SecondaryButton>
            </div>
          </div>
        </DailogComp>
        <CommentBox
          open={riderViewAddAnote}
          value={riderConfirmNote}
          dailogHandeller={riderViewAddAnoteCloseHandeller}
          onChange={(e) => setRiderConfirmNote(e.target.value)}
          onConfirm={(data) => onConfirmAssigneRider(data)}
          switchLabel
        />
        <CommentBox
          open={assigneBranchComment}
          dailogHandeller={assigneBranchCommentCloseHandeller}
        />
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {props.children}
        </Button>

        <DailogComp
          open={assigneBranch}
          dailogHandeller={assigneBranchHandellerCloseHandeller}
          title="Assign Branch"
        >
          <div className="branchAssigneDailog">
            <SelectAndSearch placeholder="Search Branch" />
            <SelectAndSearch placeholder="Search Courier" />
            <div className="branchAssigneDailog__customBranch">
              <input type="text" placeholder="Custome Courier" />
              <GrAdd />
            </div>
            <PrimaryButton onClick={areYouSureAssigneOpenHandeller}>
              Assigne Branch
            </PrimaryButton>
          </div>
        </DailogComp>
        <AreYouSure
          title={"Are you sure, you want to suspend this rider"}
          discription="Once you suspend this rider, all the rider’s details will be
          deleted form the bhariya system"
          open={riderSuspend}
          dailogHandeller={riderSuspendHandellerClose}
          onConform={riderSuspendCommentHandellerOpen}
          img="/assets/cancel.png"
          error
        />
        <AreYouSure
          title={"Are you sure you want to assign the dharan Courier"}
          discription="Once you conformed the delivery, we will move forward or the further
          procedures."
          open={areYouSureAssigne}
          dailogHandeller={areYouSureAssigneCloseHandeller}
          onConform={assigneBranchCommentOpenHandeller}
          img="/assets/iconareyouasure.png"
        />
        <AreYouSure
          title={"Are you sure you want to Assigne the Delevery"}
          discription="Once you conformed the delivery, we will move forward or the further
          procedures."
          open={AssigneDelivery}
          dailogHandeller={AssigneDeliveryCloseHandeller}
          onConform={assigneBrancOpenhHandeller}
          img="/assets/Iconareyouasure.png"
        />
        <AreYouSure
          title={"Are you sure you want to conform the Delevery"}
          discription="Once you conformed the delivery, we will move forward or the further
          procedures."
          open={dailogOpen}
          dailogHandeller={dailogCloseHandeller}
          onConform={paymentOpenHandeller}
          img="/assets/iconareyouasure.png"
        />
        <AreYouSure
          title={"Are you sure you want to conform the Pickup"}
          discription="Once you conformed the delivery, we will move forward or the further
          procedures."
          open={ConformPickUp}
          dailogHandeller={ConformPickUpHandeller}
          onConform={onConformPickup}
          img="/assets/Iconareyouasure.png"
        />
        <AreYouSure
          title={"Are you sure, you want to cancel this delivery"}
          discription="Once you cancel this delivery, your all details will be
          freezed from your delivery history"
          open={cancelDelivery}
          dailogHandeller={handelcancelDeliveryclose}
          onConform={openCancelNoteHandeller}
          img="/assets/cancel.png"
          error
        />
        <CommentBox
          open={openCancelNote}
          dailogHandeller={closeCancelNoteHandeller}
          label="Show to receiver"
        />
        <CommentBox
          open={openDispatchedNote}
          dailogHandeller={handellCloseDispatchedNote}
          label="Show to receiver"
        />
        <RiderPaymentConformationDailog
          open={paymentOpen}
          dailogHandeller={paymentCloseHandeller}
          onConform={deliveryNoteOpenHandeller}
        />
        <DeliveryConfirmNote
          dailogHandeller={deliveryNoteCloseHandeller}
          open={deliveryNote}
          title={"Your delivery has been conformed"}
        />
        {/* pickedup one */}
        <RiderPaymentConformationDailog
          open={openPickedUpDailog}
          dailogHandeller={handellClosePickedUpDailog}
          onConform={handellopenPickedUpDailogComment}
        />
        <DeliveryConfirmNote
          dailogHandeller={handellClosePickedUpDailogComment}
          open={openPickedUpDailogComment}
          title={"Your Picked Up has been conformed"}
        />
        {/* /onthe way */}
        <CommentBox
          open={openOnTheWayDailog}
          dailogHandeller={handelOpenOnTheWayDailog}
          label="Show to receiver"
        />
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          style={{ zIndex: 10 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {dynamicEditMenu()}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
