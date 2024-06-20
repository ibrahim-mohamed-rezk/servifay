import React, { useState } from "react";
import styles from "./BookNow.module.css";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import backendURL from "../../axios/backend";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FormattedMessage, useIntl } from "react-intl";

function CancelOrder() {
  const [selectedReason, setSelectedReason] = useState("");
  const [additionalReason, setAdditionalReason] = useState("");
  const params = useParams();
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const intl = useIntl();

  const handleReasonChange = (e) => {
    setSelectedReason(e.target.value);
  };

  const handleAdditionalReasonChange = (e) => {
    setAdditionalReason(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!user || !user.token) {
        toast.error("Invalid user token");
        return;
      }

      await backendURL.post(
        `/bookings/${params.orderID}/cancel`,
        {
          reason: selectedReason,
          description: additionalReason,
        },
        {
          headers: { Authorization: user.token },
        }
      );

      toast.success("Order cancelled successfully");

      navigate(`/booking/canceled/${user.id}`);
    } catch (err) {
      toast.error(err.message || "Unknown error occurred!");
      toast.error("Error occurred! Please try again.");
    }
  };

  return (
    <div className={`mt-5 ${styles.CancelOrder}`}>
      <div className={`${styles.cont}`}>
        <div className={`row ${styles.header}`}>
          <div className="col-12 m-auto mb-3">
            <div>
              <h4>
                <FormattedMessage id="whyDoYouWantToCancel" />
              </h4>
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
                  <FormattedMessage
                    id={
                      [
                        "haveYouExperiencedChanges",
                        "didYouEncounterProblemWithService",
                        "haveYouDiscoveredBetterOptions",
                        "unexpectedFinancialProblems",
                        "travelPlans",
                        "anotherReason",
                      ][index]
                    }
                  />
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
                placeholder={intl.formatMessage({ id: "addReasonHere" })}
                value={additionalReason}
                onChange={handleAdditionalReasonChange}
              ></textarea>
            </div>
          </div>
        </div>

        <div
          className={`d-flex justify-content-center align-items-center mt-5 ms-4 ${styles.BTN2}`}
        >
          <OrangeButton onClick={handleSubmit}>
            <FormattedMessage id="confirm" />
          </OrangeButton>
        </div>
      </div>
    </div>
  );
}

export default CancelOrder;
