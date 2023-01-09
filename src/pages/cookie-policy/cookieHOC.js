import React from "react";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";
//
import Cookie from "./cookie";

export default function CookiePolicy({ ...props }) {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Cookie {...props} />
      </Wrapper>
    </>
  );
}
