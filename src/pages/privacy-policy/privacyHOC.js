import React from "react";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";
//
import Privacy from "./privacy";

export default function PrivacyPolicy({ ...props }) {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Privacy {...props} />
      </Wrapper>
    </>
  );
}
