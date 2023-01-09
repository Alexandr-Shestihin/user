import React from "react";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ModalContent } from "../";

const renderCloseIcon = () => (
   <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path
         fillRule="evenodd"
         clipRule="evenodd"
         d="M19 6.4L17.6 5L12 10.6L6.4 5L5 6.4L10.6 12L5 17.6L6.4 19L12 13.4L17.6 19L19 17.6L13.4 12L19 6.4Z"
         fill="white"
      />
   </svg>
);

const StyledModal = styled(Dialog)`
    .MuiPaper-root {
      border-radius: 0;
      background-color: black;
    }
  `,
   TransModal = styled(Dialog)`
    .MuiPaper-root {
      overflow: visible;
      border-radius: 0;
      background-color: transparent;
    }
  `,
   CloseButton = styled.button`
    border: none;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 4px;
    right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    background: transparent;

    svg {
      opacity: 0.5;
      transition: opacity 0.3s ease;
    }

    &:hover,
    &:focus {
      svg {
        opacity: 1;
      }
    }
  `;

// fix overflow on close
const onModalOpen = (callback) => {
   document.body.style.overflow = "hidden";
   if (callback) {
      callback();
   }
};

const onModalClose = (callback) => {
   document.body.style.overflow = "auto";
   if (callback) {
      callback();
   }
};

export default function Modal({
   children,
   open,
   onClose,
   closeButton = false,
   disableEscapeKeyDown = false,
   disableBackdropClick = false,
   onEntering,
   onExited,
   fullWidth = false,
   maxWidth = "sm",
   isTransparent = false,
}) {
   const Modal = isTransparent ? TransModal : StyledModal;
   return (
      <Modal
         fullWidth={fullWidth}
         maxWidth={maxWidth}
         open={open}
         onClose={onClose}
         disableEscapeKeyDown={disableEscapeKeyDown}
         disableBackdropClick={disableBackdropClick}
         onEntering={() => onModalOpen(onEntering)}
         onExited={() => onModalClose(onExited)}
         scroll="body"
      >
         <ModalContent isTransparent fullWidth={fullWidth}>
            {children}
            {closeButton && (
               <CloseButton onClick={() => onClose()}>
                  {renderCloseIcon()}
               </CloseButton>
            )}
         </ModalContent>
      </Modal>
   );
}

Modal.propTypes = {
   open: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   closeButton: PropTypes.bool,
   disableEscapeKeyDown: PropTypes.bool,
   disableBackdropClick: PropTypes.bool,
   onEntering: PropTypes.func,
   onExited: PropTypes.func,
};
