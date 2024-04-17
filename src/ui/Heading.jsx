import styled from "styled-components";

const Heading = styled.h1`
  ${props => {
    switch (props.as) {
      case "h2":
        return "font-size: 3rem; font-weight: 500;";
      case "h3":
        return "font-size: 2rem; font-weight: 400;";
      case "h4":
        return "font-size: 3rem; font-weight: 600; text-align: center;";
      default:
        return "font-size: 4rem; font-weight: 600;";
    }
  }}

  line-height: 1.4;
`;

export default Heading;
