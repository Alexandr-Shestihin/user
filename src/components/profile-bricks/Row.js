import React from "react";
import styled from "styled-components";

//
import Card from "./Card";

export default function Row({ title = "Title", cards = [], history, teamId }) {
   return (
      <StyledRow>
         <section>
            <h1>{title}</h1>
         </section>
         <section>
            {cards.length ? (
               cards.map((card) => <Card
                  {...card}
                  key={card.id}
                  history={history}
                  teamId={teamId}
               />)
            ) : (
               <div className="empty-data">There is no games yet</div>
            )}
         </section>
      </StyledRow>
   );
}

const StyledRow = styled.div`
  ${"" /* background-color: #3f317c; */}
  ${"" /* TODO color */}

  & > section {
    &:first-of-type {
      padding: 10px 23px;
      box-shadow: 0 12px 13px 0px #00000075;
      z-index: 2;
      background-color: var(--bg);
      ${"" /* background-color: rgb(32, 25, 65); */}
      ${"" /* TODO color */}

      & > h1 {
        font-size: 17px;
        font-weight: bold;
        font-style: normal;
        letter-spacing: -0.67px;
        line-height: normal;
        margin: 0;
      }
    }

    &:last-of-type {
      padding: 18px 31px 18px;
      display: flex;
      gap: 30px;
      overflow-y: auto;

      min-height: 150px;

      &::-webkit-scrollbar {
        height: 0;
      }
    }
  }
`;
