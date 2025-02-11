import styled from "styled-components";

export const ButtonContainer = styled.button`
  width: 100px;
  height: 40px;
  background-color: ${(props) =>
    props.color === "primary"
      ? "purple"
      : props.color === "secondary"
      ? "orange"
      : props.color === "success"
      ? "green"
      : props.color === "danger"
      ? "red"
      : "gray"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;