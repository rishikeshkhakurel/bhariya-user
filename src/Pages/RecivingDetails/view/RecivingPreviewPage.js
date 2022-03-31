import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiMessageRoundedAdd } from "react-icons/bi";
import CommentBox from "../../../common/Components/CommentBox";
import DailogComp from "../../../common/Components/Dailog/DailogComp";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
import SecondaryButton from "../../../common/Components/Button/SecondaryButton";
import EmojiRating from "../../../common/Components/EmojiRating";

const RecivingPreviewPage = () => {
  // dailog for rating
  const [ratingDailogState, setratingDailogState] = useState(false);
  const ratingDailogStateHandeller = () => {
    setratingDailogState(!ratingDailogState);
  };
  // dailog for comment
  const [AddCommentState, setAddCommentState] = useState(false);
  const AddCommentStateHandeller = () => {
    setAddCommentState(!AddCommentState);
  };
  return (
    <div className="deliverySummery">
      {/* dailog for comment  */}
      <CommentBox
        open={AddCommentState}
        dailogHandeller={AddCommentStateHandeller}
      />

      {/* dailog for rating  */}
      <DailogComp
        open={ratingDailogState}
        dailogHandeller={ratingDailogStateHandeller}
      >
        <div className="ratingdailog">
          <div className="ratingdailog_imgcontainer">
            <img src="/assets/hero.png" alt="hero" />
            <div className="ratingdailog_imgcontainer_emoji">
              <img src="/assets/emoji.png" alt="emoji" />
            </div>
          </div>
          <div className="ratingdailog--heading">
            <h2>How was the service</h2>
          </div>
          <div className="ratingdailog_emoji">
            <EmojiRating />
          </div>
          <div className="ratingdailog_subheading">
            <h2>I love the service</h2>
          </div>
          <textarea
            className="ratingdailog-textarea"
            id="textAreaComments"
            name="commentTextArea"
            rows="5"
            placeholder="Write how you feel about the service."
          ></textarea>
          <div className="ratingdailog_buttons">
            <PrimaryButton>Submit</PrimaryButton>
            <SecondaryButton>Cancel</SecondaryButton>
          </div>
        </div>
      </DailogComp>
      <p className="deliverySummery-top">
        Delivery History {">"} Delivery Summery
      </p>
      <div className="userAdmin--header">
        <h2>Delivery Summery</h2>
      </div>
      <div className="deliverySummery_button">
        <Link to="/recivingdetails">Back to Listing</Link>
      </div>
      <div className="deliverySummery-container">
        <Row>
          <Col>
            <div className="deliverySummery-container-left">
              <div className="deliverySummery-container-left-details">
                <h4> Delivery Details</h4>
                <li>
                  Delivery by : <span> Sushmita Limbu</span>
                </li>
                <li>
                  Order ID : <span> #1234</span>
                </li>
                <li>
                  Brach : <span>Kathmandu</span>
                </li>
                <li>
                  Reciver : <span> Khem Kala Kamnabag</span>
                </li>
                <li>
                  Delivery Address : <span>Dharan</span>
                </li>
                <li>
                  Phone Number : <span> 9823624253 </span>
                </li>
                <li>
                  Email : <span> SushmitaLimbu@gmail.com </span>
                </li>
                <li>
                  COD charge : <span> Rs. 1300</span>
                </li>
                <li>
                  Delivery Charge : <span> Rs. 800 </span>
                </li>
                <li>
                  Delivery Status : <span> Dlivered</span>
                </li>
              </div>
              <div className="deliverySummery-container-left-status">
                <h4>Order Status</h4>
                <li>
                  Pickup created :<span> Nov 1, 2021, 7:00 AM</span>
                </li>
                <li>
                  Delivery conformation :<span> Nov 1, 2021, 7:10 AM</span>
                </li>
                <li>
                  Sent for Pickup :<span> Nov 1, 2021, 7:10 AM</span>
                </li>
                <li>
                  Dispatch to Dharan :<span> Nov 1, 2021, 7:10 AM</span>
                </li>
                <li>
                  Arrived At Dharan Branch :<span> Nov 1, 2021, 7:10 AM</span>
                </li>
                <li>
                  Sent for Delivery :<span> Nov 1, 2021, 7:10 AM</span>
                </li>
                <li>
                  Delivered :<span> Nov 1, 2021, 7:10 AM</span>
                </li>
              </div>
            </div>
          </Col>
          <Col>
            <div className="deliverySummery-container-right">
              <Row>
                <div className="deliverySummery-container-right_discription">
                  <h4>Delivery Description</h4>
                  <p>
                    This package contains imported glass materials and needed to
                    be handle carefully. Thank you.
                  </p>
                </div>
              </Row>
              <Row>
                <div className="deliverySummery-container-right_Comments">
                  <div className="deliverySummery-container-right_Comments-top">
                    <h4>Delivery Comments</h4>
                    <button onClick={AddCommentStateHandeller}>
                      <BiMessageRoundedAdd /> <span> Add Comments</span>
                    </button>
                  </div>
                  <div className="deliverySummery-container-right_Comments-box">
                    <div className="deliverySummery-container-right_Comments-box-left">
                      Rider
                    </div>
                    <div className="deliverySummery-container-right_Comments-box-right">
                      The delivery package had been received by the receiver.
                      <div className="deliverySummery-container-right_Comments-box-bttom">
                        Nov 2, 2021, 11:00 AM
                      </div>
                    </div>
                  </div>
                  <div className="deliverySummery-container-right_Comments-box">
                    <div className="deliverySummery-container-right_Comments-box-left">
                      Yours
                    </div>
                    <div className="deliverySummery-container-right_Comments-box-right">
                      Please call the receiver on this nuber 9087654567, in case
                      he/she doesn’t receive the call.
                      <div className="deliverySummery-container-right_Comments-box-bttom">
                        Nov 2, 2021, 11:00 AM
                      </div>
                    </div>
                  </div>
                  <div className="deliverySummery-container-right_Comments-box">
                    <div className="deliverySummery-container-right_Comments-box-left">
                      Rider
                    </div>
                    <div className="deliverySummery-container-right_Comments-box-right">
                      The order ID #567890 has been changed and the customer
                      wants his/her refund back
                      <div className="deliverySummery-container-right_Comments-box-bttom">
                        Nov 2, 2021, 11:00 AM
                      </div>
                    </div>
                  </div>
                </div>
              </Row>

              <Row className="recivingPrewviewRatig-layout">
                <div className="recivingPrewviewRatig">
                  <h1>Riders Details</h1>
                  <div className="recivingPrewviewRatig-lay">
                    <div className="recivingPrewviewRatig-imgcontainer">
                      <img src="/assets/hero.png" alt="img" />
                    </div>

                    <div className="recivingPrewviewRatig-discriptin">
                      <h3>Suman Karki</h3>
                      higest Rated 4.5
                    </div>

                    <div className="recivingPrewviewRatig_button">
                      <button onClick={ratingDailogStateHandeller}>
                        Rate Him
                      </button>
                    </div>
                  </div>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RecivingPreviewPage;
