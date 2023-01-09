import ResetPassword from "./ResetPassword";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";
export default function ResetPasswordHOC({ ...props }) {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <ResetPassword {...props} />
      </Wrapper>
    </>
  );
}
