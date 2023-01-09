import React from "react";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";
//
import SignUpForm from "./singup";

export default function SignUp({ ...props }) {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <SignUpForm {...props} />
      </Wrapper>
    </>
  );
}
