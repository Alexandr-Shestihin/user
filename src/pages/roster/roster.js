import React, { useState } from "react";
import Roster from "./Roster/Roster";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";
/* import profile4 from "../../assets/images/profile-4.png"; */

/* export const Context = React.createContext(); */

/* let contextDate = {
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
 */
function App() {
   /*    const changeTeam = (actualTeam) => {
         let newDate = JSON.parse(JSON.stringify(contextDate));
   
      } */

   /* const [context, setContext] = useState(contextDate); */
   return (
      <div>
         <GlobalStyles />
         <Wrapper>
            <Roster />
         </Wrapper>
      </div>
   );
}

export default App;
