import React from "react";
import HoldingTournaments from "./HoldingTournaments";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";
const searchTournaments = (props) => {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <HoldingTournaments {...props} />
      </Wrapper>
    </>
  );
};

export default searchTournaments;
