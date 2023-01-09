import React, {FunctionComponent} from "react";
import styled from "styled-components";
import {ContentBox} from "../UI";

const icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 490.667 490.667">
        <path fill="#eda211" d="M416,0H74.667C33.493,0,0,33.493,0,74.667v234.667C0,350.507,33.493,384,74.667,384h230.251l103.552,103.552
			c2.027,2.027,4.757,3.115,7.531,3.115c1.365,0,2.773-0.256,4.075-0.811c3.989-1.643,6.592-5.547,6.592-9.856v-96.768
			c36.139-5.184,64-36.352,64-73.899V74.667C490.667,33.493,457.173,0,416,0z M245.333,320c-17.643,0-32-14.357-32-32
			s14.357-32,32-32c17.643,0,32,14.357,32,32S262.976,320,245.333,320z M287.915,98.304l-9.195,105.429
			c-1.216,17.259-15.915,30.933-33.387,30.933c-17.664,0-32.341-13.675-33.557-31.125l-9.003-105.109
			c-0.64-8.96,2.432-17.749,8.448-24.213C217.28,67.712,225.813,64,234.667,64H256c8.853,0,17.387,3.712,23.445,10.219
			C285.461,80.704,288.555,89.472,287.915,98.304z"/>
    </svg>

)

const Wrapper = styled(ContentBox)`
    padding: 20px 20px 20px 60px;
    position: relative;
    
    @media (max-width: 767px) {
        padding-top: 54px;
    }
    
    p {
        margin: 0 0 16px;
        font-weight: 500;
    }
    
    a {
        color: #eda211;
    }
    
    .icon {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 24px;
        height: 24px;
        
        svg {
            width: 100%;
            height: 100%;
        }
    }
`

interface Props {
    message: string | JSX.Element
}

const WarningNotification: FunctionComponent<Props> = ({message}) => {
    return (
        <Wrapper>
            <div className="icon">
                {icon()}
            </div>
            {message}
        </Wrapper>
    )
}

export default WarningNotification