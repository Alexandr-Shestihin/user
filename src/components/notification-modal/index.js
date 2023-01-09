import React from "react";
import {ButtonRow, Button, Modal, ModalSubTitle} from "../UI";
import {useDispatch, useSelector} from "react-redux";
import {hideNotificationModal} from "../../redux/actions";
import {FormattedMessage} from "react-intl";

const NotificationModal = () => {
    const dispatch = useDispatch()
    const {state, message} = useSelector(state => state.notificationModal)

    const close = () => {
        dispatch(hideNotificationModal())
    }

    return (
        <Modal
            closeButton
            open={state}
            onClose={close}>
            <ModalSubTitle>
                {message}
            </ModalSubTitle>
            <ButtonRow direction="center">
                <Button
                    variant="secondary"
                    label={<FormattedMessage id="global.buttons.ok" />}
                    action={close}
                />
            </ButtonRow>
        </Modal>
    )
}

export default NotificationModal