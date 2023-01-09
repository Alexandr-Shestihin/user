import React from "react";
import Select from "react-dropdown-select";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";
import ErrorMessage from "../blocks/ErrorMessage";
import { useIntl, FormattedMessage } from "react-intl";
import { Label } from "./Label";

const StyledSelect = styled.div`
  position: relative;
  width: 100%;

  > div {
    width: 100%;
  }

  &.has-error {
    .react-dropdown-select {
      border-color: rgba(235, 87, 87, 0.2) !important;
    }
  }

  &.full-dropdown-width {
    .react-dropdown-select-dropdown {
      width: auto;
    }
  }

  &.multiline {
    .react-dropdown-select-type-multi {
      flex-wrap: wrap;
    }

    .react-dropdown-select {
      min-height: 30px;
      height: auto;
    }
  }

  &.multiple {
    .react-dropdown-select {
      height: auto;
      min-height: 30px;
    }

    .react-dropdown-select-input {
      display: none;
    }

    .react-dropdown-select-option {
      margin-top: 1px;
      margin-bottom: 1px;
    }
  }

  .react-dropdown-select {
    border: 1px solid rgba(213, 203, 255, 0.2);
    outline: none;
    box-shadow: none !important;
    height: 30px;
    min-height: 0;
    border-radius: 3px;
    transition: border-color 0.3s ease;
    opacity: ${(props) => (props.disabled ? ".5" : "1")};
    padding-left: 40px;

    &:hover,
    &:focus,
    &:focus-within {
      border-color: rgba(213, 203, 255, 0.6);
    }
  }

  .react-dropdown-select-clear {
    margin: 0;
    padding: 0 20px;
    position: absolute;
    right: 0;
  }

  .react-dropdown-select-input {
    font-weight: 500;
    font-size: 14px;
    color: #fff;
  }

  .react-dropdown-select-dropdown {
    border-radius: 3px;
    background: #262626;
    border-color: rgba(213, 203, 255, 0.6);
    max-height: 200px;

    span {
      font-size: 14px;
      font-weight: 500;
      border: none;
      padding-top: 8px;
      padding-bottom: 8px;
    }
  }

  .react-dropdown-select-item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 34px;
    flex-shrink: 0;

    &:hover {
      background: #825b29;
    }

    &.react-dropdown-select-item-selected {
      background: #825b29;
    }
  }

  .react-dropdown-select-no-data {
    text-align: left;
    color: #fff;
    padding: 6px 12px;
    font-size: 14px;
  }

  .react-dropdown-select-type-single {
    input {
      margin: 0;
      width: 100%;
    }

    > span + input {
      display: none;
    }

    > span {
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
  }

  .react-dropdown-select-content {
    max-width: 100%;
    padding-right: 30px;
  }

  .react-dropdown-select-type-multi {
    //flex-wrap: nowrap;
    //overflow: hidden;
    height: auto;
  }

  .react-dropdown-select-option {
    background: #242424;

    &-label {
      background: #242424;
      font-size: 12px;
      white-space: nowrap;
    }

    &-remove {
      background: #242424;
    }
  }

  .react-dropdown-select-dropdown-handle {
    position: absolute;
    top: 50%;
    right: 2px;
    margin: -8px 0 0;
    width: 16px;
    height: 16px;
    z-index: 1;

    svg {
      position: relative;
      top: -1px;
    }
  }

  &.homepage {
    .react-dropdown-select {
      height: 50px;
      border: 1px solid #fff;
      background: #fff;
      padding-left: 12px;
      padding-right: 12px;

      &:hover,
      &:focus,
      &:focus-within {
        border-color: #fff;
      }
    }

    .react-dropdown-select-input {
      font-weight: 500;
      font-size: 14px;
      color: #333;
    }

    .react-dropdown-select-dropdown-handle {
      svg path {
        fill: #333 !important;
      }
    }

    .react-dropdown-select-type-single > span {
      color: #333;
    }
  }
`;

const noDataRenderer = () => (
  <div className="react-dropdown-select-no-data">
    <FormattedMessage id="global.forms.placeholders.noData" />
  </div>
);

export default function CustomSelect({
  name,
  options,
  values,
  error,
  showErrorMessage = true,
  disabled = false,
  placeholder,
  onChange,
  variant = "default",
  searchFn,
  clearable = false,
  required,
  label,
  multiple = false,
  multiline = false,
  fullDropdownWidth = false,
}) {
  const intl = useIntl();

  return (
    <StyledSelect
      disabled={disabled}
      className={classNames({
        [variant]: !!variant,
        error: error,
        multiple,
        multiline,
        "full-dropdown-width": fullDropdownWidth,
      })}
    >
      {label && (
        <Label>
          {label} {required && "*"}
        </Label>
      )}
      <Select
        name={name}
        multi={multiple}
        values={values}
        disabled={disabled}
        clearable={clearable}
        onChange={onChange}
        noDataRenderer={noDataRenderer}
        placeholder={
          placeholder ||
          intl.formatMessage({ id: "global.forms.placeholders.select" })
        }
        searchFn={searchFn}
        options={options}
      />
      {error && showErrorMessage && <ErrorMessage>{error}</ErrorMessage>}
    </StyledSelect>
  );
}

CustomSelect.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
  error: PropTypes.string,
  showErrorMessage: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  searchFn: PropTypes.func,
  clearable: PropTypes.bool,
  required: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  multiple: PropTypes.bool,
  fullDropdownWidth: PropTypes.bool,
};
