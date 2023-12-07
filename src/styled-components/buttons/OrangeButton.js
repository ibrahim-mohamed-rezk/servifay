import styled from "styled-components";

const OrangeButton = styled.button`
  height: ${(props) => (props.$h ? props.$h : "48px")};
  width: ${(props) => (props.$w ? props.$w : "90%")};
  background-color: #ff9300;
  border: none;
  outline: none;
  border-radius: ${(props) => (props.$br ? props.$br : "15px")};
  padding: 5px 15px;
  color: ${(props) => (props.$c ? props.$c : "#fff")};
  font-weight: bolder;
  line-height: 20px;
  font-size: 18px;
  margin-top: 0.25em;
  margin-bottom: 1.5em;
`;

export default OrangeButton;
