import styled from "styled-components";

const FormInput = styled.input`
  width: ${props => props.$w ? props.$w : "90%"};
  border: ${props => props.$b ? props.$b : "none"};
  outline: ${props => props.$outl ? props.$outl : "none"};
  height: ${props => props.$h ? props.$h : "48px"};
  background-color: ${props => props.$bgc ? props.$bgc : "#ece9f7"};
  border-radius: ${props => props.$br ? props.$br : "10px"};
  padding: ${props => props.$p ? props.$p : "5px 15px"};
`;


export default FormInput;
