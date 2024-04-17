import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 0;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export default function Select({ options, currentOption, onChange }) {
  return (
    <StyledSelect value={currentOption} onChange={onChange}>
      {options.map(option => (
        <option key={option.key} value={option.value}>
          {option.key}
        </option>
      ))}
    </StyledSelect>
  );
}
