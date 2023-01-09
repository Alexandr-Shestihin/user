import React from "react";

import AddRoster from "./AddRoster";
import GlobalStyles from "../../assets/styles/global";
import Wrapper from "../../components/wrapper";
export default function AddRosterHOC({ ...props }) {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <AddRoster {...props} />
      </Wrapper>
    </>
  );
}
