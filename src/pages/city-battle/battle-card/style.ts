import styled from "styled-components";
import {InnerBox} from '../../../components/UI';

export const Styled = {
    Card: styled(InnerBox)`
        padding: 20px 10px;
        text-align: center;
        
        & + & {
            margin-top: 10px;
        }
        
        .title {
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            margin: 0 0 4px;
            color: #FDFDFD;
        }
        
        .date {
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
            color: #FFBE3F;
            margin: 0 0 16px;
        }
        
        .game {
            text-transform: uppercase;
            font-weight: 500;
            font-size: 14px;
            color: #D5CBFF;
        }
        
        &.slider {
            .title {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    `,
    ParticipantsRow: styled.div`
        display: flex;
        justify-content: space-between;
        margin: 10px 0 0;
        
        .vs {
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            color: #FFBE3F;
            
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 8px;
            flex-shrink: 0;
        }
    `,
    Participant: styled.div`
        background: #201941;
        border-radius: 3px;
        padding: 10px;
        width: 100%;
        max-width: 40%;
        
        .name {
            font-weight: 500;
            font-size: 14px;
            color: #D5CBFF;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .image {
            margin: 0 auto 10px;
            width: 70px;
            height: 70px;
            max-width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        
            img {
                display: block;
                max-width: 100%;
                max-height: 100%;
            }
        }
    `
}