import React, { useState } from "react";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";
import profile4 from "../../assets/images/profile-4.png";
import CreateRoster from "./CreateRoster/CreateRoster";

function CreateRosterRoster() {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <CreateRoster />
      </Wrapper>
    </>
  );
}

export default CreateRosterRoster;
