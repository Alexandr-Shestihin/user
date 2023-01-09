import Games from "./Games";
import React, { useState } from "react";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";

export const Context = React.createContext();
let contextDate = {
  gameMain: "",
  gameImage: "",
};

function GamesRoster() {
  const [context, setContext] = useState(contextDate);
  return (
    <Context.Provider value={[context, setContext]}>
      <GlobalStyles />
      <Wrapper>
        <Games />
      </Wrapper>
    </Context.Provider>
  );
}

export default GamesRoster;
