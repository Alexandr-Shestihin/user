import styled from "styled-components";
import {TitleRow} from "../UI";

export const Styled = {
    AchievementsTitleRow: styled(TitleRow)`
        @media (max-width: 767px) {
            button {
                display: none;
            }
        }
    `,
    AchievementsContainer: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
    `,
    AchievementsItem: styled.div`
        padding: 0 5px;
        width: 10%;
        margin: 10px 0 0;
        
        img {
            display: block;
            margin: 0 auto;
            max-width: 100%;
        }
        
        @media (max-width: 767px) {
            width: 12.5%;
        }
        
        @media (max-width: 699px) {
            width: 14.28%;
        }
        
        @media (max-width: 599px) {
            width: 16.6666%;
        }
        
        @media (max-width: 499px) {
            width: 20%;
        }
   `,
    AchievementsButtonRow: styled.div`
        margin: 20px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;

        @media (min-width: 768px) {
            display: none;
        }
    `,
    UndefinedIcon: styled.div`
        font-size: 12px;
        opacity: .5;
        text-align: center;
        width: 70px;
        height: 70px;
        margin: 0 auto;
        max-width: 100%;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,.1);
    `
}