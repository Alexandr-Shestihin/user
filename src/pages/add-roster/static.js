import { v4 as uuidv4 } from "uuid";

//
import usa from "../../assets/images/img-login_register_profile_rodster/usa.png";
import estonia from "../../assets/images/img-login_register_profile_rodster/estonia.png";
import germany from "../../assets/images/img-login_register_profile_rodster/germany.png";

export const countries = [
  {
    id: uuidv4(),
    name: "Estonia",
    flag: estonia,
  },
  {
    id: uuidv4(),
    name: "Usa",
    flag: usa,
  },
  {
    id: uuidv4(),
    name: "Germany",
    flag: germany,
  },
];
