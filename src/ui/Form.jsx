import styled from "styled-components";

const Form = styled.form.attrs(props => ({
  // assign default value (form) to $type if it's undefined or null
  $type: props.$type ?? "form",
}))`
  overflow: hidden;
  font-size: 1.4rem;

  ${props => {
    switch (props.$type) {
      case "form":
        return {
          paddingBlock: "2.4rem",
          paddingInline: "4rem",
          backgroundColor: "var(--color-grey-0)",
          borderRadius: "var(--border-radius-md)",
        };
      case "modal":
        return {
          inlineSize: "80rem",
        };
    }
  }}
`;

export default Form;
