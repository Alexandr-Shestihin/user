import styled, { css } from "styled-components";

// export const Styled = {
//   Button: styled.button`
//     cursor: pointer;
//     background-color: transparent;
//     border: none;
//     outline: none;
//     border-radius: 20px;
//     color: #fff;
//     font-size: 16px;
//     font-weight: bold;
//     font-style: normal;
//     letter-spacing: normal;
//     line-height: normal;
//     padding: 16px 45px;
//     white-space: nowrap;

//     ${({ active }) =>
//       active &&
//       css`
//         background-color: #fff;
//         color: #000;
//       `}
//     ${({ size }) =>
//       size === "sm" &&
//       css`
//         font-size: 10px;
//         padding: 10px 24px;
//         border-radius: 12px;
//       `}

//   ${({ color }) =>
//       color === "yellow" &&
//       css`
//         background-color: #ce8926;
//         color: var(--dark);
//       `}
//   `,
// };
export const Styled = {
  Button: styled.button`
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    border-radius: 20px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    padding: 16px 45px;
    white-space: nowrap;

    &.primary {
      background-color: #ce8926;
      color: var(--dark);

      &:hover,
      &:focus {
        background: #bd810d;
      }

      &:active {
        background-color: #fff;
        color: #000;
      }
    }
    &.secondary {
      color: #000;
      background: #f1f1f1;

      &:hover,
      &:focus {
        background: #b09dfe;
      }

      &:active {
        background: #8b6ffe;
      }
    }

    &.sm {
      height: 36px;
      padding: 0 12px;
      font-size: 14px;
    }

    &.full-width {
      width: 100%;
    }

    &[disabled] {
      background: #999;
      pointer-events: none;
    }
  `,
};
