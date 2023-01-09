import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {toast} from "react-toastify";
import {connect} from 'react-redux'
import {
    getUrlParams,
    isConfirmPasswordCorrect,
    isPasswordValid
} from "../../helpers";
import {API, API_ROUTER} from "../../api";
import {ModalContent, ModalTitle, FormGroup, Input, ButtonRow, Button} from "../../components/UI";
import {Styled} from "./style";
import {showAuthModal} from "../../redux/actions";

class ResetPassword extends Component {

    state = {
        secret: '',
        formData: {
            password: '',
            confirm: ''
        },
        errors: {
            password: '',
            confirm: ''
        }
    }

    componentDidMount() {
        const {history} = this.props
        const {secret} = getUrlParams()

        !secret
            ? history.push('/')
            : this.setState({secret})
    }

    onInputChange = e => {
        const {formData} = this.state;

        this.setState({
            formData: {
                ...formData,
                [e.target.name]: e.target.value
            }
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const {formData, secret, errors} = this.state;
        const {history} = this.props;

        // validate
        errors.password = isPasswordValid(formData.password);
        errors.confirm = isConfirmPasswordCorrect(formData.password, formData.confirm);
        this.setState({errors});

        // send request if valid
        if (!Object.values(errors).some(value => value.length)) {
            const params = {
                ...API_ROUTER.auth.confirmPassword,
                data: {
                    secret,
                    password: formData.password,
                    verify: formData.confirm
                }
            }

            API.request(params, true)
                .then(() => {
                    history.push('/')
                    this.props.showAuthModal()
                })
                .catch(err => {
                    if (err.data.errors && err.data.errors.password) {
                        toast.error(err.data.errors.password)
                    } else if (err.data.message) {
                        toast.error(err.data.message)
                    }
                })
        }
    }

    render() {
        const {formData, errors} = this.state;

        return (
            <Styled.Wrapper>
                <form onSubmit={this.onSubmit}>
                    <ModalContent>
                        <ModalTitle>
                            <FormattedMessage id="resetPassword.title" />
                        </ModalTitle>
                        <br/>
                        <FormGroup>
                            <Input
                                required
                                name="password"
                                type="password"
                                value={formData.password}
                                error={errors.password}
                                onChange={this.onInputChange}
                                label={<FormattedMessage id="resetPassword.newPassword" />}/>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                required
                                name="confirm"
                                type="password"
                                value={formData.confirm}
                                error={errors.confirm}
                                onChange={this.onInputChange}
                                label={<FormattedMessage id="resetPassword.confirmPassword" />}/>
                        </FormGroup>
                        <ButtonRow direction="center">
                            <Button
                                type='submit'
                                label={<FormattedMessage id="resetPassword.resetButton" />}
                                action={e => this.onSubmit(e)}/>
                        </ButtonRow>
                    </ModalContent>
                </form>
            </Styled.Wrapper>
        )
    }
}

const mapDispatch = {
    showAuthModal: () => showAuthModal()
}

export default connect(null, mapDispatch)(withRouter(ResetPassword));