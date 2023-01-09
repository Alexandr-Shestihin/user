import React, { createRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";

export default function UploadAvatar({
  user,
  conditionRendering,
  onImageSelect,
  image,
}) {
  const [img, setImg] = useState(image || user?.logo);
  const fileRef = createRef(null);

  useEffect(() => {
    if (user?.logo) setImg(user?.logo);
    if (image) setImg(image);
  }, [user?.logo, image]);

  conditionRendering =
    conditionRendering ||
    ((node) => {
      return !user ? node : "";
    });

  function uploadImg() {
    fileRef.current.click();
  }

  function changeImg(e) {
    onImageSelect && onImageSelect(e);

    e = e.target.files[0];
    setImg(URL.createObjectURL(e));
  }

  return (
    <StyledUploadAvatar img={img}>
      {conditionRendering(
        <>
          <div onClick={uploadImg} className="camera">
            <i
              className="icon icon-camera"
              style={{ width: "17px", height: "13px" }}
            />
          </div>
        </>
      )}
      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        multiple={false}
        onChange={changeImg}
      />
    </StyledUploadAvatar>
  );
}

const StyledUploadAvatar = styled.div`
  display: inline-block;
  width: 132px;
  height: 132px;
  border-radius: 50%;
  background-color: var(--nav-bg);
  position: relative;

  & > .camera {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--blue);
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(-12.5%, -12.5%);
  }

  & > input[type="file"] {
    visibility: hidden;
    opacity: 0;
    display: none;
  }

  ${({ img }) =>
    img &&
    css`
      background: url(${img}) no-repeat center;
      background-size: cover;
    `}

  @media (max-width : 400px) {
    width: 120px;
    height: 120px;
  }
`;
