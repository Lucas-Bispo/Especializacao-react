import { ButtonContainer } from "./button.styles";

interface ButtonProps {
  color?: "primary" | "secondary" | "success" | "danger";
}

export function Button({ color = "primary" }: ButtonProps) {
  return <ButtonContainer color={color}>Enviar</ButtonContainer>;
}