import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import OrangeButton from "../../../styled-components/buttons/OrangeButton";
import { useNavigate } from "react-router-dom";
import backendURL from "../../../axios/backend";
import { useSelector } from "react-redux";

const VerifayEmailAlert = () => {
  const navigate = useNavigate();
  const user = useSelector((data) => data.auth);

  const handelClick = () => {
    backendURL
      .post("/send-verification-code", { email: user.email })
      .then(() => {
        navigate("/verifayEmail");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={1}>
        <Alert
          severity="warning"
          action={
            <OrangeButton
              onClick={handelClick}
              $h="30px"
              $m="0"
              $fs="13px"
              $c="#000"
            >
              Verify
            </OrangeButton>
          }
        >
          Please verify your email address
        </Alert>
      </Stack>
    </div>
  );
};

export default VerifayEmailAlert;
