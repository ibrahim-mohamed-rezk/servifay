import React, { useState } from "react";
import styles from "./BookNow.module.css";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import backendURL from "../../axios/backend";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CancelOrder() {
  const [selectedReason, setSelectedReason] = useState("");
  const [additionalReason, setAdditionalReason] = useState("");
  const params = useParams();
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleReasonChange = (e) => {
    setSelectedReason(e.target.value);
  };

  const handleAdditionalReasonChange = (e) => {
    setAdditionalReason(e.target.value);
  };

  const handleSubmit = async () => {
    backendURL
      .post(
        `/bookings/${params.orderID}/cancel`,
        {
          reason: selectedReason,
          description: additionalReason,
        },
        {
          headers: { Authorization: user.token },
        }
      )
      .then(() => {
        navigate(`/booking/canceled/${user.id}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className={`mt-5 ${styles.CancelOrder}`}>
      <div className={`${styles.cont}`}>
        <div className={`row ${styles.header}`}>
          <div className="col-12 m-auto mb-3">
            <div>
              <h4>Why do you want to cancel this specialist's reservation?</h4>
            </div>
          </div>
        </div>

        <div className={`row ${styles.canselReasons}`}>
          <div className="col-12 m-auto">
            {[
              "reason1",
              "reason2",
              "reason3",
              "reason4",
              "reason5",
              "reason6",
            ].map((id, index) => (
              <div key={id} className={`mb-2 ${styles.formCheck}`}>
                <input
                  className={`${styles.formCheckInput}`}
                  type="radio"
                  id={id}
                  name="reason"
                  value={id}
                  onChange={handleReasonChange}
                ></input>
                <label htmlFor={id} className="ms-2">
                  {
                    [
                      "Have you experienced changes in your personal circumstances?",
                      "Did you encounter a problem with the service?",
                      "Have you discovered better options for you?",
                      "Are you facing unexpected financial problems?",
                      "Travel plans",
                      "Another reason",
                    ][index]
                  }
                </label>
              </div>
            ))}
            <hr className="hr"></hr>
          </div>
        </div>

        <div className={`row ${styles.textAreaContainer}`}>
          <div className="col-12 m-auto">
            <div>
              <textarea
                className="form-control"
                name="reason"
                id="writen-reason"
                placeholder="Add reason here"
                value={additionalReason}
                onChange={handleAdditionalReasonChange}
              ></textarea>
            </div>
          </div>
        </div>

        <div
          className={`d-flex justify-content-center align-items-center mt-5 ms-4 ${styles.BTN2}`}
        >
          <OrangeButton onClick={handleSubmit}>Confirm</OrangeButton>
        </div>
      </div>
    </div>
  );
}

export default CancelOrder;
