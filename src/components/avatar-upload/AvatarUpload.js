import React, { useRef, useState } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import plus from "../../assets/svg/plus-white.svg";

export default function AvatarUpload() {
  const fileRef = useRef(null);
  const [img, setImg] = useState(null);

  function uploadFile() {
    fileRef.current.click();
  }

  function changeImg(e) {
    const file = e.target.files[0];
    setImg(file);
  }

  return (
    <StyledAvatar onClick={uploadFile} bg={img && URL.createObjectURL(img)}>
      {!img && <img src={plus} alt="choose image"/>}
      <input type="file" ref={fileRef} onChange={changeImg} />
    </StyledAvatar>
  );
}

const StyledAvatar = styled.div`
  display: inline-block;
  width: 77px;
  height: 77px;
  box-shadow: 7px 11px 14px rgba(2, 2, 2, 0.29);
  border: 1px solid #757881;
  background-color: #262626;
  border-radius: 50%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;

  ${({ bg }) =>
    bg &&
    css`
      background: url(${bg}) no-repeat center;
      background-size: cover;
    `}

  & > div {
    font-size: 52px;
    font-weight: lighter;
    color: #757881;
  }

  & > input {
    display: none;
  }
`;
