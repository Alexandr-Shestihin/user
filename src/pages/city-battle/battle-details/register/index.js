import React from "react";
import {Styled} from "./style";
import {useDispatch, useSelector} from "react-redux";
import {showAuthModal, showRegisterModal} from "../../../../redux/actions/auth";
import {Button, ButtonRow} from "../../../../components/UI";
import {FormattedMessage} from "react-intl";

export const Register = () => {
    const dispatch = useDispatch();
    const userOnline = useSelector(store => store.userOnline)

    if (userOnline)
        return null

    return (
        <Styled.Wrapper>
            <Styled.Map>
                <Styled.Title>
                    <FormattedMessage id="cityBattle.registration.title" />
                </Styled.Title>
                <Styled.Message>
                    <FormattedMessage id="cityBattle.registration.message" />
                </Styled.Message>
                <ButtonRow direction="center">
                    <Button
                        label={<FormattedMessage id="global.buttons.signUp" />}
                        action={() => {
                            dispatch(showRegisterModal())
                            dispatch(showAuthModal())
                        }}/>
                    <Button
                        label={<FormattedMessage id="global.buttons.login" />}
                        action={() => dispatch(showAuthModal())}/>
                </ButtonRow>
            </Styled.Map>
        </Styled.Wrapper>
    )
}