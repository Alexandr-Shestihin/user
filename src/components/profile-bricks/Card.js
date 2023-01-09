import React from "react";
import styled, { css } from "styled-components";

import NoImage from "../../assets/no-image.png";

const imageWithPlaceHolder = (game, logo) =>

   game?.image ? (
      <img
         src={game?.image ? game?.image : NoImage}
         className={game?.image ? "" : "placeholderImage"}
         alt="img"
         style={{ width: 90, height: 90, borderRadius: "24px" }}
      />
   ) : (
      <img
         src={logo ? logo : NoImage}
         className={game?.image ? "" : "placeholderImage"}
         alt="img"
         style={{ width: 90, height: 90, borderRadius: "24px" }}
      />
   );

const dumb = () => {
   console.log("there is no action on this card");
};

export default function Card({
   add = false,
   title,
   noTitle = "Title",
   game,
   img,
   logo,
   icon = null,
   action = dumb,
   isComing = false,
   nickname,
   teamId,
   history
}) {
   const chackedTitle = (value) => {
      value === 'Member list' && history.push(`/teams/team/${teamId}/invite`);
   }
   return (
      <div onClick={() => chackedTitle(title)}>
         < StyledCard isComing={isComing} >
            <section onClick={!isComing ? action : dumb}>
               {add ? (
                  <i className="icon icon-plus" style={{ background: "var(--icon)" }} />
               ) : icon ? (
                  <i
                     className={"icon icon-" + icon}
                     style={{ width: "45px", height: "45px" }}
                  />
               ) : (
                  imageWithPlaceHolder(game, logo)
               )}
            </section>
            <section>
               {nickname ? (
                  <p>
                     {game?.title?.length > 15
                        ? game?.title?.slice(0, 15) + "..."
                        : game?.title || noTitle}
                     {/* {nickname || title} */}
                     {isComing ? (
                        <i
                           className="icon icon-password"
                           style={{ marginLeft: 5, width: 15, height: 15 }}
                        />
                     ) : (
                        ""
                     )}
                  </p>
               ) : (
                  <p>
                     {title?.length > 15
                        ? title?.slice(0, 15) + "..."
                        : title || noTitle}
                     {/* {nickname || title} */}
                     {isComing ? (
                        <i
                           className="icon icon-password"
                           style={{ marginLeft: 5, width: 15, height: 15 }}
                        />
                     ) : (
                        ""
                     )}
                  </p>
               )}
            </section>
         </StyledCard >
      </div >
   );
}

const StyledCard = styled.div`
  width: max-content;

  & > section {
    ${"" /* .placeholderImage {
      max-width: 70%;
    } */
   }

    &:first-of-type {
      width: 92px;
      height: 92px;
      border-radius: 24px;
      border: 1px solid var(--icon);
      background-color: #414042;
      ${"" /* background-color: rgba(255, 255, 255, 0.05); */}
      ${"" /* TODO color */}
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    &:last-of-type {
      & > p {
        font-size: 11px;
        font-weight: 400;
        font-style: normal;
        letter-spacing: -0.41px;
        line-height: normal;
        margin-top: 4px;
        text-align: center;
      }
    }
  }

  ${({ isComing }) =>
      isComing &&
      css`
      opacity: 0.2;
    `}
`;
