import React from "react";
import styled from "styled-components";

export default function Wrapper({ children }) {
  return <StyledWrapper>{children}</StyledWrapper>;
}

const StyledWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  background-color: var(--bg);
  ${"" /* TODO color  */}
  ${"" /* background-color: #3f317c; */}

  @media (max-width: 670px) {
    width: 100%;
  }
`;
