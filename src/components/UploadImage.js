import React, {Component} from 'react';
import styles from '../styles/components/UploadImage.css';

import {inject, observer} from 'mobx-react';


@inject('viewerStore', 'discussionStore', 'userStore')
@observer

class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {

            this.setState({
                imagePreviewUrl: reader.result
            });
        };

        reader.onload = (event) => {
            this.setState({
                file: event.target.result
            });
            this.props.userStore.setNewImage(event.target.result);
        };
        reader.readAsDataURL(file);
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<div className="upload-image" style={{backgroundImage: 'url('+imagePreviewUrl+')'}}/>)
        }
        else {
            $imagePreview = (<div className="upload-image" style={{backgroundImage: this.props.userStore.currentUser?'url('+this.props.userStore.currentUser.avatar+')':'url("/images/no-program.png")'}}/>);
        }
        return (
            <div>
                {$imagePreview}
                <label htmlFor="attachmentName">
                    <div className="c-upload-btn">
                        <span className="upload-btn"><i className="flaticon-web-link"/>Cambiar Imagen</span>
                    </div>
                    <input id="attachmentName" type="file" onChange={this._handleImageChange} style={{display: 'none'}}/>
                </label>
            </div>
        )
    }
}

export default UploadImage;

