import styled from "styled-components";
import {InnerBox} from "../../components/UI";

export const Styled = {
    Section: styled.div`
        & + & {
            margin-top: 40px;
        }
    `,
    SectionTitle: styled(InnerBox)`
        margin: 0 0 10px;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        @media (max-width: 767px) {
            flex-direction: column;
        }
    `,
    Tabs: styled.div`
        display: flex;
        align-items: center;

        @media (max-width: 767px) {
            margin: 6px 0;
        }

        div {
            cursor: pointer;
            transition: all .3s ease;
            font-weight: 500;
            font-size: 14px;

            &:hover {
                color: #EDA211;
            }
        }

        div.active {
            color: #EDA211;
        }

        div + div {
            margin-left: 30px;
        }
    `,
    Label: styled.div`
        font-weight: bold;
        font-size: 21px;
        color: #D5CBFF;
    `,
    Table: styled.div`
        
    `,
    TableMainRow: styled.div`
        display: flex;
        margin: 0 -5px;
    `,
    TableMainCol: styled.div`
        padding: 0 5px;
        
        &:first-child {
            width: 30%;
            
            @media (max-width: 767px) {
                display: none;
            }
        }
        
        &:last-child {
            width: 70%;
            
            @media (max-width: 767px) {
                width: 100%;
            }
        }
    `,
    TableInnerRow: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -2px;
    `,
    TableInnerCol: styled.div`
        padding: 0 2px;
        width: 20%;
        
        @media (max-width: 767px) {
            width: 100%;
            
            & + & {
                margin-top: 10px;
            }
            
            &.empty {
                display: none;
            }
        }
    `,
    TableHeader: styled(InnerBox)`
        margin: 0 0 10px;
        padding: 10px;
        min-height: 104px;
    `,
    TableItem: styled.div`
        border: 1px solid rgba(213, 203, 255, .2);
        padding: 6px 12px;
        border-radius: 3px;
        font-weight: 500;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        & + & {
            margin-top: 5px;
        }
        
        &.worst {
            border-color: #E50808;
            color: #E50808;
        }
        
        &.best {
            border-color: #14C911;
            color: #14C911;
        }
        
        .modal-helper {
            display: none;
            
            @media (max-width: 767px) {
                display: block;
                color: #fff;
                opacity: .5;
            }
        }
    `,
    TableLegend: styled.div`
        display: flex;
        justify-content: flex-end;
        margin: 20px 0 0;
        
        .item + .item {
            margin-left: 20px;
        }
        
        .item {
            display: flex;
            align-items: center;
        
            &__label {
                width: 20px;
                height: 6px;
                border-radius: 2px;
                
                &--green {
                    background: #14C911;
                }
                
                &--red {
                    background: #E50808;
                }
            }
            
            &__name {
                font-weight: 500;
                font-size: 12px;
                color: #D5CBFF;
                margin-left: 6px;
            }
        }
    `,
    UserCard: styled.div`
        width:60px;
        height: 60px;
        margin: 4px auto 0;
        position: relative;
    `,
    UserAvatar: styled.div`
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        background: ${props => props.image ? `#eee url(${props.image}) no-repeat center center` : '#eee'};
        background-size: cover;
    `,
    UserOnlineStatus: styled.div`
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #14C911;
        border: 2px solid #201941;
        position: absolute;
        top: 2px;
        right: 4px;
    `,
    UserName: styled.div`
        font-weight: 500;
        font-size: 14px;
        color: #D5CBFF;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        
        &.self  {
            color: #EDA211;
        }
    `
}