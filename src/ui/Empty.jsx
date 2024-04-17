import styled from "styled-components";

const StyledEmpty = styled.p`
  text-align: center;
`;

function Empty({ resourceName }) {
  return <StyledEmpty>No {resourceName} yet.</StyledEmpty>;
}

export default Empty;
