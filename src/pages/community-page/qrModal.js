import qr from "../../assets/images/qr-code.png";
import owl from "../../assets/images/owl-eye.png";
import { showQrModal, hideQrModal } from "../../redux/actions";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components/UI";
import { Styled } from "../../components/auth-modal/style";


const ModalQR = () => {
    const dispatch = useDispatch()
    const showQrModalState = useSelector(state => state.showQrModal)
    return (
        <>
            <Modal
                className="modal__wrapper"
                isTransparent={true}
                open={showQrModalState}
                onClose={() => dispatch(hideQrModal())}
            >
                <div className="modal">
                    <img className="qr__owl-eye" src={owl} alt="owl-eye" />
                    <p className="qr__title">Gamer id Card</p>
                    <div className="qr">
                        <img className="qr__img" src={qr} alt="QR code" />
                    </div>
                    <Styled.ButtonHolder>
                        <button className="qr__hide-qr" onClick={() => dispatch(hideQrModal())}>
                            <FormattedMessage id="gamer.id.card.btn.close" />
                        </button>
                    </Styled.ButtonHolder>
                </div>
            </Modal>
        </>
    )
}

export default ModalQR