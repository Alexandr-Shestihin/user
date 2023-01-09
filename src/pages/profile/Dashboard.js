import React from "react";
import styled from "styled-components";

//
import Bottom from "./sections/Bottom";
import Top from "./sections/Top";

export default function Dashboard({
  user = false,
  props,
  isCreator,
  id,
  ...rest
}) {
  return (
    <StyledDashboard>
      <Top
        user={user}
        isEditMode={false}
        {...props}
        isCreator={isCreator}
        id={id}
      />
      <Bottom {...rest} user={user} isCreator={isCreator} id={id} />
    </StyledDashboard>
  );
}

const StyledDashboard = styled.div`
  /* padding-bottom: 70px; */
`;
