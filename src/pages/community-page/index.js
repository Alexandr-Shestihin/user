import React from "react";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";
//
import CommunityPageHOC from "./CommunityPage";

export default function CommunityPage({ ...props }) {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <CommunityPageHOC {...props} />
      </Wrapper>
    </>
  );
}
