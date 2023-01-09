import React, {Component} from "react";
import ReactCrop from 'react-image-crop';
import PropTypes from "prop-types";
import styled from "styled-components";

import {Button} from "../UI";

const ButtonRow = styled.div`
        display: flex;
        justify-content: center;
        margin: 30px 0 0;
        
        button + button {
            margin-left: 16px;
        }
    `,
    CropContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;

export default class AvatarLoader extends Component {

    state = {
        crop: {
            x: 0,
            y: 0,
            unit: 'px',
            width: 200,
            height: 200,
        }
    };

    onImageLoaded = () => {
        this.setState({
            crop: {
                unit: 'px',
                aspect: 1,
                width: 112,
                height: 112,
                x: 0,
                y: 0,
                ...this.props.settings
            },
        });

        return false; // Return false if you set crop state in here.
    };

    savePicture = () => {
        const {image, onImageCrop} = this.props;
        const {crop} = this.state;

        const img = new Image();
        img.src = image;

        const canvas = document.createElement('canvas');
        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            img,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        // Base64 string
        const base64Image = canvas.toDataURL('image/png');
        onImageCrop(base64Image);
    };

    render() {
        const {crop} = this.state;
        const {image} = this.props;

        console.log("this.props", this.props);

        return (
            <CropContainer>
                <ReactCrop
                    onImageLoaded={this.onImageLoaded}
                    src={image}
                    crop={crop}
                    onChange={newCrop => this.setState({crop: newCrop})} />
                <ButtonRow>
                    <Button action={this.props.cancel} label="Cancel" variant="secondary"/>
                    <Button action={this.savePicture} label="Save" />
                </ButtonRow>
            </CropContainer>
        )
    }
}

AvatarLoader.propTypes = {
    settings: PropTypes.object,
    image: PropTypes.string.isRequired,
    onImageCrop: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired
};