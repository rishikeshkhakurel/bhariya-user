import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { BiMessageRoundedAdd } from "react-icons/bi";
import moment from "moment";
import {
  useAddDeliveryNoteMutation,
  useGetDeliveryHistoryDataByidQuery,
  useGetDeliveryNotesQuery,
  useGetuserSettingQuery,
  usePostDeliveryCommentMutation,
} from "../../../Redux/Services/FetchApi";
import Loading from "../../../common/Components/loading/LoadingComp";
import CommentBox from "../../../common/Components/CommentBox";
const UserSummary = () => {
  const { id: orderId } = useParams();

  const getUserSettingResponseInfo = useGetuserSettingQuery();

  const getAssignedOrderByIdResponseInfo =
    useGetDeliveryHistoryDataByidQuery(orderId);

  const data = getAssignedOrderByIdResponseInfo?.data;
  console.log("data", getAssignedOrderByIdResponseInfo)

  const [addDeliveryNoteState, setAddDeliveryNoteState] = useState(false);

  const closeAddDeliveryNoteState = () => setAddDeliveryNoteState(false);
  const openAddDeliveryNoteState = () => setAddDeliveryNoteState(true);

  const [deliveryNote, setDeliveryNote] = useState("");

  const getDeliveryNoteResponseInfo = useGetDeliveryNotesQuery();

  let allNotes = [];
  data?.addnoteall.map((value) => {
    allNotes.push({
      ...value,
      notes: value.note,
      noteAdder: value.notedby.user_role,
    });
  });
  data?.addpay.map((value) =>
    allNotes.push({
      ...value,
      notes: value.addnote,
      noteAdder: value.postedby.user_role,
    })
  );
  data?.internalnote?.map((value) => {
    allNotes.push({
      ...value,
      notes: value.note,
      noteAdder: value.posted.user_role,
    });
  });

  const [sendDeliveryNote, sendDeliveryNoteResponseInfo] =
    useAddDeliveryNoteMutation();

  const postSendDeliveryNote = (whomeToShowData) => {
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
    sendDeliveryNote({
      items: getAssignedOrderByIdResponseInfo.data.id,
      note: deliveryNote,
      whometoshow: dataWhomToShow.join(" "),
    });
  };

  const [addDeliveryCommentState, setAddDeliveryCommentState] = useState(false);

  const closeDeliveryCommentState = () => setAddDeliveryCommentState(false);
  const openDeliveryCommentState = () => setAddDeliveryCommentState(true);

  const deliveryCommentData = [];

  data?.externalnote?.map((value) => {
    if (
      value.whometoshow.includes(getUserSettingResponseInfo?.data[0].user_role)
    )
      deliveryCommentData.push(value);
  });

  const [deliveryComment, setDeliveryComment] = useState("");

  const [sendDeliveryComment, sendDeliveryCommentResponseInfo] =
    usePostDeliveryCommentMutation();

  const postSendDeliveryComment = (whomeToShowData) => {
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
    sendDeliveryComment({
      items: getAssignedOrderByIdResponseInfo.data.id,
      note: deliveryComment,
      whometoshow: dataWhomToShow.join(" "),
    });
  };

  useEffect(() => {
    if (sendDeliveryNoteResponseInfo.isSuccess) {
      setAddDeliveryNoteState(false);
    }
  }, [sendDeliveryNoteResponseInfo]);

  useEffect(() => {
    if (sendDeliveryCommentResponseInfo.isSuccess) {
      setAddDeliveryCommentState(false);
    }
  }, [sendDeliveryCommentResponseInfo]);

  return (
    <>
      {getAssignedOrderByIdResponseInfo.isLoading ||
      sendDeliveryCommentResponseInfo.isLoading ||
      sendDeliveryNoteResponseInfo.isLoading ? (
        <Loading />
      ) : (
        <div className="deliverySummery">
          <p className="deliverySummery-top">
            Delivery Order {">"} Customer Summery
          </p>
          <div className="userAdmin--header">
            <h2>Customer Summery</h2>
          </div>
          <div className="deliverySummery_button">
            <Link to="/DeliveryHistory">Back to Listing</Link>
          </div>
          <div className="deliverySummery-container">
            <Row>
              <Col>
                <div className="deliverySummery-container-left">
                  <div className="deliverySummery-container-left-details">
                    <h4> Delivery Details</h4>
                    <li>
                      Sender :{" "}
                      {data.order.map((data) => {
                        <span>{data.name} </span>;
                      })}
                    </li>
                    <li>
                      Order ID : <span>{data.id}</span>
                    </li>
                    <li>
                      Address : <span>{data.order[0].senderlocation}</span>
                    </li>
                    <li>
                      Brach : <span>{data.order[0].recievingbranch}</span>
                    </li>
                    <li>
                      Phone Number :{" "}
                      <span> {data.order[0].sendercontact} </span>
                    </li>
                    <li>
                      Email : <span> {data.order[0].senderemail} </span>
                    </li>
                    <li>
                      COD charge : <span> Rs. {data.cod}</span>
                    </li>
                    <li>
                      Payment Mode :{" "}
                      <span>
                        {data?.addpay[0]?.paymentoption
                          ? data?.addpay[0]?.paymentoption
                          : "Not Set yet"}{" "}
                      </span>
                    </li>
                    <li>
                      Delivery Status : <span> {data.order_status}</span>
                    </li>
                  </div>
                  <div className="deliverySummery-container-left-status">
                    <h4>Receiver Details</h4>
                    <li>
                      Receiver: <span> {data.deliveryto}</span>
                    </li>
                    <li>
                      Branch: <span>{data.recievingbranch}</span>
                    </li>
                    <li>
                      Contact: <span>{data.phone}</span>
                    </li>
                    <li>
                      Address: <span> {data.deliverylocation}</span>
                    </li>

                    <li>
                      Live Location: <span>{data.livelocation}</span>
                    </li>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="deliverySummery-container-right">
                  <Row>
                    <div className="deliverySummery-container-right_discription">
                      <h4>Delivery Description</h4>
                      <p>{data.packagedetail}</p>
                    </div>
                  </Row>
                  <Row>
                    <div className="deliverySummery-container-right_Comments">
                      <CommentBox
                        open={addDeliveryCommentState}
                        value={deliveryComment}
                        dailogHandeller={closeDeliveryCommentState}
                        onChange={(e) => setDeliveryComment(e.target.value)}
                        onConfirm={(data) => postSendDeliveryComment(data)}
                        switchLabel
                      />
                      <div className="deliverySummery-container-right_Comments-top">
                        <h4>Delivery Comments</h4>
                        <button onClick={openDeliveryCommentState}>
                          <BiMessageRoundedAdd /> <span> Add Comments</span>
                        </button>
                      </div>
                      <div className="deliverycommentcontainer">
                        {deliveryCommentData.reverse().map((value) => {
                          const date = moment(value.added).format(
                            "ddd Do MMM YYYY h:mm A"
                          );
                          return (
                            <div className="deliverySummery-container-right_Comments-box">
                              <div className="deliverySummery-container-right_Comments-box-left">
                                {value.posted.user_role}
                              </div>
                              <div className="deliverySummery-container-right_Comments-box-right">
                                {value.note}
                                <div className="deliverySummery-container-right_Comments-box-bttom">
                                  {date}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <div className="deliverySummery-container-right_Comments">
                      <CommentBox
                        open={addDeliveryNoteState}
                        dailogHandeller={closeAddDeliveryNoteState}
                        value={deliveryNote}
                        onChange={(e) => setDeliveryNote(e.target.value)}
                        title="Add New Note"
                        onConfirm={(data) => postSendDeliveryNote(data)}
                        switchLabel
                      />
                      <div className="deliverySummery-container-right_Comments-top">
                        <h4>Delivery Notes</h4>
                        <button onClick={openAddDeliveryNoteState}>
                          <BiMessageRoundedAdd /> <span> Add Notes</span>
                        </button>
                      </div>
                      <div className="deliverycommentcontainer">
                        {allNotes.reverse().map((value) => {
                          const date = moment(value.addon).format(
                            "ddd Do MMM YYYY h:mm A"
                          );
                          return (
                            <div className="deliverySummery-container-right_Comments-box">
                              <div className="deliverySummery-container-right_Comments-box-left">
                                {value.noteAdder}
                              </div>
                              <div className="deliverySummery-container-right_Comments-box-right">
                                {value.notes}
                                <div className="deliverySummery-container-right_Comments-box-bttom">
                                  {date}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSummary;
