import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function SocialLinks({setter, info}) {
  const [open, setOpen] = useState(false);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setter({
      ...info,
      links
    })
  }, [links])

  function handleChangeLink(e) {
    e.preventDefault();
    const { name, value } = e.target;

    const data = { type: name, url: value };

    setLinks([ ...info?.links?.filter(item => item.type !== name), data ])
  }

  return (
    <StyledSocialLinks>
      {
        info?.links && info?.links.map((link) => {
          return (
            <section>
              <div className="names">
                <p>{link.type}</p>
              </div>
              <div>
                <i
                    className="icon icon-pencil"
                    style={{ width: "14px", height: "14px" }}
                />
                <input type="text" name={link.type} value={link?.url} onChange={handleChangeLink} />
              </div>
            </section>
          )
        })
      }
    </StyledSocialLinks>
  );
}

const StyledSocialLinks = styled.div`
  & > section {
    padding: 5px 38px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid #9a9ca6;

    div {
      width: 75%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      gap: 16px;

      & > p {
        font-size: 12px;
        font-weight: 300;
        font-style: normal;
        letter-spacing: normal;
      }

      & > input {
        color: #ffffff;
        font-size: 12px;
        font-weight: 300;
        font-style: normal;
        letter-spacing: normal;
        background-color: transparent;
        width: 100%;
        border: none;
        outline: none;
        &::placeholder {
          color: #fff;
        }
      }
    }

    .names {
      width: 20%;
    }
  }
`;
