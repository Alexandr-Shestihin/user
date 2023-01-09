import React, {Component} from "react";
import {ContentBox, Input, ModalTitle, ButtonRow, Button} from "../../UI";
import {API,API_ROUTER} from "../../../api";
import styled from "styled-components";
import ProfileTemplate from "../profile-template";
import {toast} from "react-toastify";
import {FormattedMessage} from "react-intl";
import {isConfirmPasswordCorrect, isFieldEmpty, isPasswordValid} from "../../../helpers";

const PasswordBox = styled.div`
        width: 290px;
        max-width: 100%;
        margin: 30px auto;
        
        @media (max-width: 767px) {
            margin: 0 auto;
        }
    `,
    Title = styled(ModalTitle)`
        margin: 0 0 24px;
    `,
    FormGroup = styled.div`
        & + & {
            margin-top: 20px;
        }
        
        &:last-child {
            margin-bottom: 30px;
        }
        
        > label {
            display: block;
            font-size: 14px;
            margin: 0 0 4px;
        }
    `;

export default class Password extends Component {

    state = {
        values: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        errors: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    };

    onSubmit = e => {
        e.preventDefault();
        const {values, errors} = this.state;

        // validation
        errors.oldPassword = isFieldEmpty(values.oldPassword);
        errors.newPassword = isPasswordValid(values.newPassword);
        errors.confirmPassword = isConfirmPasswordCorrect(values.newPassword, values.confirmPassword);
        this.setState({errors});

        if (!Object.values(errors).some(value => value.length)) {
            const params = {
                ...API_ROUTER.auth.changePassword,
                data: {
                    currentPassword: values.oldPassword,
                    newPassword: values.newPassword
                }
            };

            API.request(params, true)
                .then(() => toast.success(<FormattedMessage id="changePassword.passwordChanged" />))
                .catch(err => toast.error(err.data && err.data.message))
        }
    };

    onInputChange = e => {
        const {values} = this.state;
        values[e.target.name] = e.target.value;

        this.setState({values})
    };

    render() {
        const {values, errors} = this.state;

        return (
            <ProfileTemplate>
                <ContentBox>
                    <PasswordBox>
                        <Title>
                            <FormattedMessage id="changePassword.changePassword" />
                        </Title>
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <FormGroup>
                                    <FormattedMessage id="changePassword.oldPassword" tagName="label"/>
                                    <Input
                                        onChange={this.onInputChange}
                                        name="oldPassword"
                                        type="password"
                                        error={errors.oldPassword}
                                        value={values.oldPassword}/>
                                </FormGroup>
                                <FormGroup>
                                    <FormattedMessage id="changePassword.newPassword" tagName="label"/>
                                    <Input
                                        onChange={this.onInputChange}
                                        name="newPassword"
                                        type="password"
                                        error={errors.newPassword}
                                        value={values.newPassword}/>
                                </FormGroup>
                                <FormGroup>
                                    <FormattedMessage id="changePassword.confirmPassword" tagName="label"/>
                                    <Input
                                        onChange={this.onInputChange}
                                        name="confirmPassword"
                                        type="password"
                                        error={errors.confirmPassword}
                                        value={values.confirmPassword}/>
                                </FormGroup>
                            </div>
                            <ButtonRow direction="center">
                                <Button
                                    type="submit"
                                    label={<FormattedMessage id="changePassword.changePassword" />}
                                    action={this.onSubmit}/>
                            </ButtonRow>
                        </form>
                    </PasswordBox>
                </ContentBox>
            </ProfileTemplate>
        )
    }
}