import React from "react";
import styled from "styled-components";

const StyledModal = (isTransparent) => {
  return styled.div`
    visibility: ${isTransparent ? "visible" : ""};
    max-width: 100%;
    ${
      "" /* background: var(--main-bg-color);
          color: var(--main-text--active); */
    }
    position: relative;

    @media (max-width: 767px) {
      ${
        "" /* box-sizing: border-box;
      padding: 20px 20px 40px; */
      }
    }
  `;
};

export default function ModalContent({ children, fullWidth, isTransparent }) {
  const Modal = StyledModal(isTransparent);
  return <Modal fullWidth={fullWidth}>{children}</Modal>;
}
