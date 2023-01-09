import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;

  display: flex;
  align-items: center;
  background: transparent;

  &.primary {
    span {
      color: #fff;
    }

    svg {
      path {
        fill: #fff;
      }
    }

    &:hover,
    &:focus {
      span {
        color: #d5cbff;
      }

      svg {
        path {
          fill: #d5cbff;
        }
      }
    }
  }

  &.secondary {
    span {
      color: #eda211;
    }

    svg {
      path {
        fill: #eda211;
      }
    }

    &:hover,
    &:focus {
      span {
        color: #bd810d;
      }

      svg {
        path {
          fill: #bd810d;
        }
      }
    }
  }

  &.dark {
    span {
      color: #3f317c;
    }

    svg {
      path {
        fill: #3f317c;
      }
    }

    &:hover,
    &:focus {
      span {
        color: #eda211;
      }

      svg {
        path {
          fill: #eda211;
        }
      }
    }
  }

  span {
    font-weight: 500;
    font-size: 14px;
    transition: color 0.3s ease;
  }

  svg {
    margin-left: 8px;

    path {
      transition: fill 0.3s ease;
    }
  }
`;

const arrowIcon = () => (
  <svg
    width="13"
    height="7"
    viewBox="0 0 13 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0.112875 4.104V2.84H7.98488V0.856L12.4809 3.464L7.98488 6.088V4.104H0.112875Z" />
  </svg>
);

export default function ArrowButton({
  type = "button",
  label = "Button",
  variant = "primary",
  action,
}) {
  return (
    <StyledButton onClick={action} className={variant} type={type}>
      <span>{label}</span>
      {arrowIcon()}
    </StyledButton>
  );
}

ArrowButton.propTypes = {
  action: PropTypes.func.isRequired,
  type: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  variant: PropTypes.oneOf(["primary", "secondary", "dark"]),
};
