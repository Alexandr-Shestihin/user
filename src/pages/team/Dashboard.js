import React from "react";
import styled from "styled-components";

import Wrapper from "../../components/wrapper";
import Bottom from "./sections/Bottom";
import Top from "./sections/Top";

export default function Dashboard({ team = {}, isCreator, teamId, ...rest }) {
   return (
      <Wrapper>
         <StyledDashboard>
            <Top {...rest} team={team} isCreator={isCreator} />
            <Bottom {...rest} team={team} isCreator={isCreator} teamId={teamId} />
         </StyledDashboard>
      </Wrapper>
   );
}

const StyledDashboard = styled.div``;
