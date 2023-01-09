import React from "react";

import Wrapper from "../../components/wrapper";
import Settings from "./Settings";

const TeamSettings = (props) => {
  return (
      <Wrapper>
          <Settings {...props} />
      </Wrapper>
  );
};

export default TeamSettings;
