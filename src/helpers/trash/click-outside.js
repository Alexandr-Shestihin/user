import {useEffect} from "react";
import PropTypes from "prop-types";

export function ClickOutside(ref, callback) {
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
}

ClickOutside.propTypes = {
    ref: PropTypes.element.isRequired,
    callback: PropTypes.func.isRequired
};