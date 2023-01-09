import React from "react";
import {ContentBox, TitleRow, TitleRowTitle} from "../../../components/UI";
import {FormattedMessage} from "react-intl";
import styled from "styled-components";
import {useHistory} from 'react-router-dom';
import LangDecoder from "../../../components/lang-decoder";

const StyledMembership = {
    Row: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 10px -10px 0;
    `,
    Col: styled.div`
        margin-top: 16px;
        padding: 0 10px;
        width: 50%;
        
        @media (max-width: 767px) {
            width: 100%;
        }
    `,
    Item: styled.div`
        width: 100%;
        display: flex;
        align-items: flex-start;
        
        small {
            display: block;
            width: 18px;
            height: 18px;
            background: #EDA211;
            border-radius: 50%;
            margin-right: 12px;
            flex-shrink: 0;
        }
        
        span {
            color: #FFFFFF;
            font-weight: 500;
            font-size: 14px;
            cursor: pointer;
            
            &:hover {
                text-decoration: underline;
            }
        }
    `
}

const Membership = ({communities}) => {
    const history = useHistory()

    return (
        <ContentBox>
            <TitleRow>
                <TitleRowTitle>
                    <FormattedMessage id="id.membership"/>
                </TitleRowTitle>
            </TitleRow>
            <StyledMembership.Row>
                {communities.map(item => {
                    const {community} = item;

                    return (
                        <StyledMembership.Col key={community.uuid}>
                            <StyledMembership.Item>
                                <small/>
                                <span onClick={() => history.push('/community/community/' + community.uuid)}>
                                    <LangDecoder data={{i18n: community.name}} target="name"/>
                                </span>
                            </StyledMembership.Item>
                        </StyledMembership.Col>
                    )
                })}
            </StyledMembership.Row>
        </ContentBox>
    )
}

export default Membership