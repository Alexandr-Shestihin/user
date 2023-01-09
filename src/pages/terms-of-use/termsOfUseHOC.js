import React from "react";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";
//
import TermsOfUse from "./termsOfUse";

export default function TermsOfUseHOC({ ...props }) {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <TermsOfUse {...props} />
      </Wrapper>
    </>
  );
}
