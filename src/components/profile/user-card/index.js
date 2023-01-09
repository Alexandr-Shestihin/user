import React, {useState, useRef} from "react";
import styled from "styled-components";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {LinearProgress} from "@material-ui/core";
import {FormattedMessage} from "react-intl";

import {API, API_ROUTER} from "../../../api";
import store from "../../../redux/store";
import {getUserData} from "../../../redux/actions/user";
import {dataUriToBlob, getAvatar} from "../../../helpers";
import {Modal, ContentBox} from "../../UI";
import AvatarLoader from "../../avatar-loader";

const StyledContentBox = styled(ContentBox)`
        text-align: center;   
    `,
    Nickname = styled.div`
        font-weight: bold;
        font-size: 21px;
        margin: 0 0 20px;
    `,
    AvatarHolder = styled.div`
        width: 112px;
        height: 112px;
        margin: 0 auto 10px;
        position: relative;
    `,
    Avatar = styled.div`
        width: 112px;
        height: 112px;
        border-radius: 50%;
        overflow: hidden;
        background: ${props => props.image ? `#eee url(${props.image}) no-repeat center center` : '#eee'};
        background-size: cover;
    `,
    OnlineStatus = styled.div`
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #14C911;
        border: 2px solid #201941;
        position: absolute;
        top: -2px;
        right: 20px;
    `,
    EditButton = styled.div`
        text-align: center;
        
        a {
            font-weight: 500;
            font-size: 14px;
            text-decoration-line: underline;
            color: #EDA211;
            
            &:hover {
                text-decoration: none;
            }
        }
    `,
    Name = styled.div`
        font-weight: 500;
        font-size: 16px;
        margin: 20px 0 4px;
    `,
    Role = styled.div`
        font-weight: 500;
        font-size: 14px;
        opacity: .9;
    `;

export default function UserCard() {
    const [modalState, setModalState] = useState(false);
    const closeModal = () => setModalState(false);

    const [userImage, setUserImage] = useState(null);
    const profilePictureInput = useRef(null);
    const userData = useSelector(state => state.userData);

    // resize image on load
    const handleLoadAvatar = file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement("img");
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                const MAX_WIDTH = 294;
                const MAX_HEIGHT = 294;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL("image/png");
                setUserImage(dataUrl)
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    // on image select
    const onImageSelect = event => {
        const file = event.target.files[0];

        if (file) {
            handleLoadAvatar(file);
            setModalState(true);
            profilePictureInput.current.value = null;
        }
    };

    // on crop
    const onImageCrop = base64 => {
        const blob = dataUriToBlob(base64);
        const formData = new FormData();
        formData.append('avatar', blob);

        const params = {
            ...API_ROUTER.user.setUserAvatar,
            data: formData
        };

        API.request(params, true)
            .then(() => {
                toast.success('Avatar saved!');
                store.dispatch(getUserData());
            })
            .catch(err => toast.error(err.data && err.data.message));

        closeModal();
    };

    // card
    const renderCard = () => {
        return (
            <>
                <Nickname>{userData.nickname || ''}</Nickname>
                <AvatarHolder>
                    <Avatar image={getAvatar(userData.avatars)}/>
                    <OnlineStatus/>
                </AvatarHolder>
                <EditButton>
                    <a href="/" onClick={e => {
                        e.preventDefault();
                        profilePictureInput.current.click();}}>
                        <FormattedMessage id="global.buttons.edit"/>
                    </a>
                    <input
                        hidden
                        ref={profilePictureInput}
                        type="file"
                        onInput={onImageSelect}
                        accept="image/x-png,image/png,image/gif,image/jpeg"
                    />
                </EditButton>
                <Name>{`${userData.firstName || ''} ${userData.lastName || ''}`}</Name>
                <Role>Gamer</Role>
            </>
        )
    };

    // loader
    const renderLoader = () => <LinearProgress />;

    // render
    return (
        <>
            <StyledContentBox>
                {userData ? renderCard() : renderLoader()}
            </StyledContentBox>
            <Modal
                closeButton
                open={modalState}
                onClose={closeModal}>
                {userImage &&
                <AvatarLoader
                    image={userImage}
                    onImageCrop={onImageCrop}
                    cancel={() => setModalState(false)}/>
                }
            </Modal>
        </>
    )
}