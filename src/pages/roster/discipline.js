import Discipline from "./Discipline/Discipline";
import React, { useState } from "react";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";
import profile4 from "../../assets/images/profile-4.png";
export const Context = React.createContext();
let contextDate = {
   country: "Estonia",
   languages: ["Estonian", "Germany"],
   gameMain: "",
   gameImage: "",
   couchName: "",
   couchImg: "",
   teamBuilder: "KingPin",
   teamBuilderImage: profile4,
   managerName: "KingPin",
   managerImg: profile4,
   team: ["+"],
   reserveTeam: ["+"],
   decisionIsMade: false,
   rosterChoise: false,
};

function DisciplineRoster() {
   const [context, setContext] = useState(contextDate);
   return (
      <Context.Provider value={[context, setContext]}>
         <GlobalStyles />
         <Wrapper>
            <Discipline />
         </Wrapper>
      </Context.Provider>
   );
}

export default DisciplineRoster;
