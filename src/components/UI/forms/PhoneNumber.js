import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import ErrorMessage from "../blocks/ErrorMessage";
import { Label } from "./Label";

const StyledInput = styled.div`
  width: 100%;
  position: relative;

  &.has-error {
    .react-tel-input input.form-control {
      border-color: rgba(235, 87, 87, 0.2) !important;
    }
  }

  .react-tel-input input.form-control {
    width: 100%;
    height: 30px;
    display: block;

    border: 1px solid rgba(213, 203, 255, 0.2);
    background: transparent;
    border-radius: 3px;

    font-weight: 500;
    font-size: 14px;
    color: #fff;
    padding: 0 6px 0 44px;

    transition: all 0.3s ease;
    outline: none;

    &:hover,
    &:focus,
    &.open {
      border-color: rgba(213, 203, 255, 0.6);
    }

    &.has-error {
      border-color: rgba(235, 87, 87, 0.2);
    }
  }

  .flag-dropdown {
    background-color: transparent !important;
    border: none;
  }

  .selected-flag {
    background: transparent !important;

    .arrow {
      border-top-color: #fff;
    }

    .arrow.up {
      border-bottom-color: #fff;
    }
  }

  .country-list {
    border-radius: 3px;
    background: #262626;
    border: 1px solid rgba(213, 203, 255, 0.6) !important;

    .country {
      outline: none;
    }

    .country:hover,
    .country:focus {
      background: rgba(130, 91, 41, 0.75);
    }

    .country.highlight {
      background: rgba(130, 91, 41, 1);
    }
  }
`;

export default function PhoneNumber({
  name,
  value,
  onChange,
  country,
  error = "",
  required,
  label,
}) {
  return (
    <StyledInput className={error ? "has-error" : ""}>
      {label && (
        <Label>
          {label} {required && "*"}
        </Label>
      )}
      <PhoneInput
        required
        onChange={onChange}
        country={country}
        name={name}
        value={value}
        className={error && "has-error"}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </StyledInput>
  );
}

PhoneNumber.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
