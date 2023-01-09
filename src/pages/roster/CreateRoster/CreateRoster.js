import React, { useState, useContext, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import "./CreateRoster.css";
import arrow from "../../../assets/svg/arrow-down.svg";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import NoImage from "../../../assets/no-image.png";
import { setCreateRosterValues } from "../../../redux/actions";
import { withRouter } from "react-router-dom";
import { isFieldEmpty } from "../../../helpers";
import { toast } from "react-toastify";
import { data, languageList, initialErrors } from "./const";
import { API, API_ROUTER } from "../../../api";
import TeamGamesItem from "./teamGamesItem";
import { players } from "../../roster/data";
import { Context } from "../../../components/main/index";
import { LinearProgress } from "@material-ui/core";

const disciplPlaceholder = (saveTempData, id) => (
   <div className="title-and-link__edit-roster-link title-and-link__edit-roster-link--disabled">
      You have to choose
      <button
         className="title-and-link__edit-roster-link"
         onClick={() => saveTempData(`/teams/team/${id.teamId}/roster/discipline`)}
      >
         Discipline
      </button>
      before making a roster
   </div>
);

const CreateRoster = (props) => {
   let id = useParams();

   console.log(Context);
   const [context, setContext] = useContext(Context);
   console.log(context);
   const [teamGames, setTeamGames] = useState([]);

   const { match } = props;
   const [errors, setErrors] = useState(initialErrors);
   // console.log(match.params.teamId);
   const dispatch = useDispatch();
   const {
      country,
      languages = [],
      name,
      discipline = {},
   } = useSelector((state) => state.roster);
   const [requestSuccess, setRequestSuccess] = useState(false);

   const [rosterName, setRosterName] = useState(name);
   const [rosterCountry, setRosterCountry] = useState(country);
   const [rosterLanguage, setRosterLanguage] = useState(languages);
   // const [country, changeCountry] = useState(context.country);
   const [countries, setCountry] = useState("");
   // const [flag, changeFlag] = useState(usa);
   const [modalWindow, toggleWindow] = useState(null);
   const [modalLanguagesWindow, toggleLanguagesWindow] = useState(false);
   useEffect(() => {
      API.request({
         ...API_ROUTER.teams.getTeamGames,
         pathKeys: {
            teamId: id.teamId,
         },
      })
         .then((res) => {
            setTeamGames(res.games);
            setRequestSuccess(true);
         })
         .catch((err) => console.log(err));
   }, [id]);
   console.log(teamGames);
   const changeLand = (some) => {
      let newCountry = JSON.parse(JSON.stringify(data));
      newCountry.country = some;
      setRosterCountry(some);
      setCountry(newCountry.country);
      let newObject = data.filter((a) => a.country == some)[0];
      // changeFlag(`${newObject.img}`);
      toggleWindow(null);
   };

   const closeChoise = (e) => {
      e.preventDefault();
      // const newErrors = initialErrors;
      // setErrors({ ...errors, ...newErrors });
      // newErrors.title = isFieldEmpty(rosterName);
      // newErrors.gameId = isFieldEmpty(discipline.id);
      // newErrors.teamId = isFieldEmpty(id.teamId);
      // newErrors.country = isFieldEmpty(countries);
      // if (Object.values(newErrors).some((value) => value.length)) {
      //   if (newErrors.title === "This field is required") {
      //     toast.error("please enter roster name");
      //   }
      //   if (newErrors.country === "This field is required") {
      //     toast.error("please enter roster country");
      //   }
      //   if (newErrors.discipline === "This field is required") {
      //     toast.error("please enter roster discipline");
      //   }
      // }
      // if (!Object.values(newErrors).some((value) => value.length)) {
      //   const data = {
      //     teamId: id.teamId,
      //     title: rosterName,
      //     gameId: discipline.id,
      //     country: countries,
      //     languages: rosterLanguage,
      //   };
      //   API.request({ ...API_ROUTER.roster.add, data })
      //     .then(({ item }) => {
      //       // TEAM_URL = item.uuid;
      //     })
      //     .then(() => history.push(`/teams/team/${id.teamId}`))
      //     .catch((err) => toast.error(err.data && err.data.message));
      // }
      history.push(`/teams/team/${id.teamId}`);
   };

   const validate = {
      rosterName: rosterName,
      rosterCountry: rosterCountry,
      rosterDiscipline: discipline,
   };

   const toggleCountry = () => {
      toggleWindow(!modalWindow);
   };

   /* Выбор языка */
   const toggleLanguage = () => {
      toggleLanguagesWindow(!modalLanguagesWindow);
   };

   const toggleLanguageItem = (selectedLanguage) => {
      let languageIndex = "";
      let newLangArr = [...rosterLanguage];

      /* Если язык уже выбран, то убрать из списка*/
      if (rosterLanguage.includes(selectedLanguage)) {
         languageIndex = rosterLanguage.indexOf(selectedLanguage);
         newLangArr.splice(languageIndex, 1);

         /* Получаем массив адресов картинок, для отображения под списком языков*/
         // ourArr.map((tong) =>
         //   newImagesArr.push(
         //     languageList.filter((el) => el.language == tong)[0]["img"]
         //   )
         // );
         // console.log("ourArr", ourArr);
         // changeLanguageImages(newImagesArr);
      }
      /* Если язык не выбран, то добавить*/
      if (!rosterLanguage.includes(selectedLanguage)) {
         newLangArr.push(selectedLanguage);

         // setContext(newContext);
         // changeLanguageImages(newImagesArr);

         /* Получаем массив адресов картинок из массива объектов languageList , для отображения под списком языков*/
         // ourArr.map((tong) =>
         //   newImagesArr.push(
         //     languageList.filter((el) => el.language == tong)[0]["img"]
         //   )
         // );
         // changeLanguageImages(newImagesArr);
      }

      setRosterLanguage(newLangArr);
   };

   const history = useHistory();

   function goToUrl(url) {
      saveTempData();
      history.push(url);
   }

   const saveTempData = (url) => {
      dispatch(
         setCreateRosterValues({
            name: rosterName,
            country: countries,
            languages: rosterLanguage,
         })
      );

      history.push(url);
   };
   const renderButton = () => {
      // if (
      //   !validate.rosterName ||
      //   !validate.rosterCountry ||
      //   !validate.rosterDiscipline
      // ) {
      //   return (
      //     <div className="submit-button-wrapper">
      //       <div
      //         className="submit-button submit-button--disabled"
      //         style={{ fontSize: 17 }}
      //       >
      //         Enter fields with *
      //       </div>
      //     </div>
      //   );
      // } else if (
      //   validate.rosterName &&
      //   validate.rosterCountry &&
      //   validate.rosterDiscipline
      // )
      return (
         <SubmitButton
            type="submit"
            buttonText={"back"}
            disabled={true}
            clickFunction={closeChoise}
         />
      );
   };
   console.log(id);

   return (
      <div>
         {/* <Context.Provider value={[context, setContext]}> */}
         <div className="create-roster">
            <h1 className="create-roster__title">Create Roster</h1>
            <form className="create-roster__form" action="">
               <section className="create-roster__form-discipline">
                  <div className="form-discipline">
                     <p className="form-discipline__title">Discipline</p>

                     {/* <button
                className="form-discipline__select-link"
                onClick={() =>
                  goToUrl(`/teams/team/${id.teamId}/roster/discipline`)
                }
              >
                Select
              </button> */}
                  </div>
                  <ul className="games__list">
                     {teamGames.map((el) => (
                        <li className={"games__item-list"} key={el.id}>
                           <img
                              className="games__item-list-image"
                              src={el.logo}
                              alt={el.title}
                              width="100"
                              height="100"
                           />
                           {el.title.length > 16 ? (
                              <p className="games__item-list-text">
                                 {el.title.slice(0, 16) + "..."}
                              </p>
                           ) : (
                              <p className="games__item-list-text">{el.title}</p>
                           )}
                        </li>
                     ))}
                  </ul>
                  {/* <div className="team-games">
              {requestSuccess ? renderGames(teamGames) : <LinearProgress />}
            </div> */}
               </section>
               {/* <section className="create-roster__roster-name">
                  <h3 className="roster-name__title">Roster Name*</h3>
                  <input
                     className="roster-name__input"
                     type="text"
                     placeholder="Enter Roster Name"
                     value={rosterName}
                     onChange={(e) => setRosterName(e.target.value)}
                  />
               </section> */}
               {/* <section className="create-roster__country-wrapper">
            <h3 className="country__title">Country*</h3>

            <article className="create-roster__country">
              <input
                className="create-roster__country-input"
                type="text"
                value={rosterCountry}
                name="create-roster__country"
              />
              <div
                className="create-roster__country-select"
                onClick={() => toggleCountry()}
              >
                {" "}
                <div class="country__country-wrapper">
                  <img
                    className="create-roster__country-flag"
                    src={flag}
                    alt="country flag"
                    width="32"
                    height="32"
                  />
                  <p className="create-roster__country-text">{rosterCountry}</p>
                  <img
                    className="create-roster__country-arrow"
                    src={arrow}
                    alt="arrow-down"
                  />
                </div>
              </div>
              {modalWindow !== null && (
                <ul className="create-roster__country-list">
                  {data.map((el) => (
                    <li
                      className="country-list__item"
                      onClick={(e) => changeLand(el.country)}
                      value={el.country}
                    >
                      <img
                        className="country-list__item-image"
                        width="32"
                        height="32"
                        src={el.img}
                        alt={el.country}
                      />
                      <p className="country-list__item-name">{el.country}</p>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </section> */}
               {/* <section className="create-roster__language">
            <h3 className="language__title">Select The Speaking Language</h3>

            <article className="create-roster__language">
              <input
                className="create-roster__country-input"
                type="text"
                value={rosterLanguage}
                name="create-roster__languages"
                onChange={(e) => setRosterLanguage(e.target.value)}
              />
              <div
                className="create-roster__language-select"
                onClick={() => toggleLanguage()}
              >
                <ul className="create-roster__language-wrapper">
                  {rosterLanguage &&
                    rosterLanguage.map((language) => (
                      <li className="create-roster__tong-item">
                        <img
                          class="create-roster__tong-item-image"
                          src={
                            languageList.filter((el) => el.language == tong)[0][
                              "img"
                            ]
                          }
                          alt="flag"
                          width="24"
                          height="24"
                        />
                        {language}
                      </li>
                    ))}
                </ul>

                <img
                  className="country-select__arrow"
                  src={arrow}
                  alt="arrow"
                  width="14"
                  height="7"
                />
              </div>
              <div className="create-roster__language-list-wrapper">
                {modalLanguagesWindow && (
                  <ul className="create-roster__language-list">
                    {languageList.map((el) => (
                      <li
                        className="language-list__item"
                        onClick={(e) => toggleLanguageItem(el.language)}
                        value={el.language}
                      >
                        <img
                          className="language-list__item-image"
                          src={el.img}
                          alt="flag"
                          width="24"
                          height="24"
                        />
                        <p className="language-list__item-text">
                          {el.language}
                        </p>
                        {rosterLanguage.indexOf(el.language) !== -1 ? (
                          <div className="language-list__item-yes"></div>
                        ) : (
                          <div className="language-list__item-no"></div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </section> */}
               <section className="create-roster__change-roster">
                  {teamGames?.length ? (
                     <>
                        <div className="change-roster__title-and-link">
                           {/* <p className="title-and-link__title">Roster</p> */}

                           {/* <a
                    className="title-and-link__edit-roster-link"
                    onClick={() =>
                      saveTempData(`/teams/team/${id.teamId}/roster/edit`)
                    }
                  >
                    Edit
                  </a> */}
                        </div>
                        <ul className="change-roster__profile-images">
                           {/* {context.team.map((b) => ( */}
                           <li className="change-roster__profile-item">
                              {/* {b == "+" ? ( */}
                              {/*  {context.team.map((el) =>
                                 el === "+" ? (
                                    false
                                 ) : (
                                    <div className="player-list__player">
                                       {el == "+" ? (
                                          <div className="add-players__image"></div>
                                       ) : (
                                          <img
                                             className="player-list__player-image"
                                             src={
                                                players.filter((a) => a.player == el)[0]["img"]
                                             }
                                             alt={el}
                                             width="60"
                                             height="60"
                                          />
                                       )}
                                       <p className="player-list__player-name">
                                          {el == "+" ? "" : el}
                                       </p>
                                    </div>
                                 )
                              )} */}
                              {/* <div
                                 className="change-roster__profile-item-image--plus"
                                 onClick={() =>
                                    goToUrl(`/teams/team/${id.teamId}/roster/edit`)
                                 }
                              >
                                 +
                              </div> */}
                              {/* ) : ( */}
                              {/* <img
                          className="change-roster__profile-item-image"
                          src={players.filter((a) => a.player == b)[0]["img"]}
                          alt={b}
                        />
                      )} */}
                              <p className="change-roster__profile-item-name">
                                 {/* {b == "+" ? "" : b} */}
                              </p>
                           </li>
                           {/* ))} */}
                        </ul>
                     </>
                  ) : (
                     <>
                        <div className="change-roster__title-and-link">
                           <p className="title-and-link__title">Roster</p>
                        </div>
                        {disciplPlaceholder(saveTempData)}
                     </>
                  )}
               </section>
               {renderButton()}
            </form>
         </div>
         {/* </Context.Provider> */}
      </div>
   );
};
const mapStateToProps = (state) => {
   return {
      userData: state.userData,
   };
};

export default withRouter(connect(mapStateToProps)(CreateRoster));
