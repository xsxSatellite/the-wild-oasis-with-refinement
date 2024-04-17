import styled from "styled-components";

const sizes = {
  small: {
    fontSize: "1.2rem",
    padding: ".4rem .8rem",
    textTransform: "uppercase",
    fontWeight: "600",
    textAlign: "center",
  },
  medium: {
    fontSize: "1.4rem",
    padding: "1.2rem 1.6rem",
    fontWeight: "500",
  },
  large: {
    fontSize: "1.6rem",
    padding: "1.2rem 2.4rem",
    fontWeight: "500",
  },
};

const variations = {
  primary: `
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: `
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    
    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: `
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button.attrs(props => ({
  $variation: props.$variation ?? "primary",
  $size: props.$size ?? "medium",
}))`
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${props => sizes[props.$size]}
  ${props => variations[props.$variation]}
`;

export default Button;
