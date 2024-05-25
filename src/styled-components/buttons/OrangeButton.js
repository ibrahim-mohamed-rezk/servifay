import styled from "styled-components";

const OrangeButton = styled.button`
  height: ${(props) => (props.$h ? props.$h : "48px")};
  width: ${(props) => (props.$w ? props.$w : "90%")};
  background-color: #ff9300;
  border: none;
  outline: none;
  border-radius: ${(props) => (props.$br ? props.$br : "15px")};
  padding: ${(props) => (props.$p ? props.$p : "5px 20px")};
  color: ${(props) => (props.$c ? props.$c : "#fff")};
  font-weight: bolder;
  line-height: 20px;
  font-size: ${(props) => (props.$fs ? props.$fs : "20px")};
  font-family: ${(props) => (props.$ff ? props.$ff : "Philosopher")};
  margin: ${(props) => (props.$m ? props.$m : "20px 30px 20px 30px")};
`;

export default OrangeButton;
