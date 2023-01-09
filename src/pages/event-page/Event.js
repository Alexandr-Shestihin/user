import React from "react";
import styled from "styled-components";

//
import Top from "./components/Top";
import Information from "./components/Information";
import Bottom from "./components/Bottom";

export default function Event() {
  return (
    <StyledEvent>
      <Top />
      <Information />
      <Bottom />
    </StyledEvent>
  );
}

const StyledEvent = styled.div``;
