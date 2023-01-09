import React from "react";
import ERA from "../../assets/svg/ERALogo.svg";
import GoogleVerif from "../../assets/svg/GoogleVerif.svg"
import "./Verification.css";

const Verification = () => {
    return (
        <div className="verification">
            <h2 className="verification__title">Verification</h2>
            <img
                className="verification__image"
                src={GoogleVerif}
                alt="clock"
                width="90"
                height="90"
            />
            <h3 className="verification__auth-code">AUTHENTICATION CODE</h3>
            <form className="verification__form" action="">
                <div className="form__verification-code">
                    <img
                        className="verification-code__image-left"
                        src={GoogleVerif}
                        alt="clock"
                        width="30"
                        height="30"
                    />
                    <input
                        className="verification-code__input"
                        type="text"
                        placeholder="Paste Google verification code"
                    />
                    <img
                        className="verification-code__image-right"
                        src={ERA}
                        alt="clock"
                        width="20"
                        height="25"
                    />
                </div>
                <input
                    className="form__verification-submit"
                    type="submit"
                    value="Send"
                />
            </form>
            <a className="verification__security-link" href="#">
                Security check unavailable?
            </a>
        </div>
    );
};

export default Verification;
