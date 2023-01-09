import Event from "./Events";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";
export default function EventPage({ ...props }) {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Event {...props} />
      </Wrapper>
    </>
  );
}
