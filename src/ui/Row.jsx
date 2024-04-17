import styled from "styled-components";

const Row = styled.div.attrs(props => ({
  // assign default value (vertical) to $type if it's undefined or null
  $type: props.$type ?? "vertical",
}))`
  display: flex;

  ${props => {
    switch (props.$type) {
      case "horizontal":
        return {
          justifyContent: "space-between",
          alignItems: "center",
        };
      case "vertical":
        return {
          flexDirection: "column",
          gap: "1.6rem",
        };
    }
  }}
`;

export default Row;
