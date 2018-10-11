import React, {Component} from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import  draftToHtml  from 'draftjs-to-html';

import {inject, observer} from 'mobx-react';

import styles from '../styles/components/WysiwygE.css';

// https://github.com/jpuri/react-draft-wysiwyg
// https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
//https://github.com/jpuri/react-draft-wysiwyg/issues/346

@inject('viewerStore', 'discussionStore', 'threadStore')
@observer

class WysiwygE extends Component {
    constructor(props) {
        super(props);
        this.state = {uploadedImages: []};
    }

    componentDidMount () {
        this.props.discussionStore.setEditorState(EditorState.createEmpty());
    }

    editorStateChange = (editorState) =>{
        if (this.props.newDiscussion){
            if(this.props.discussionStore.wysiwygText!=0){
                this.props.discussionStore.setNewDiscussionText(this.props.discussionStore.wysiwygText);
            } else {
                this.props.discussionStore.setNewDiscussionText("");
            }
        }
        if (this.props.adminEditPost){
            this.props.discussionStore.setAdminEditorState(editorState);

        }
        else if (this.props.userEditPost){
            this.props.discussionStore.setUserEditorState(editorState);

        }
        else {
            this.props.discussionStore.setEditorState(editorState);

        }

        let editorObj = convertToRaw(editorState.getCurrentContent());

        // Working emotions - might not working video
        let text = stateToHTML(editorState.getCurrentContent());

        //If Video is there
        if(editorObj && editorObj.entityMap && editorObj.entityMap[0] && editorObj.entityMap[0].type && (editorObj.entityMap[0].type == 'EMBEDDED_LINK')){
            // Working video - might not working emotions
            text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        }

        this.props.discussionStore.setWysiwygText(text);
    };

    newEditorState(){
        if (this.props.adminEditPost){
            return(this.props.discussionStore.adminEditorState)

        }
        else if (this.props.userEditPost){
            return(this.props.discussionStore.userEditorState)

        }
        else {
            return(this.props.discussionStore.editorState);
        }
    }

    getFileBase64 = (file, callback) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        // Since FileReader is asynchronous,
        // we need to pass data back.
        reader.onload = () => callback(reader.result);
        reader.onerror = error => {};
    };

    imageUploadCallback = file => new Promise(
        (resolve, reject) => this.getFileBase64(
            file,
            data => resolve({ data: { link: data } })
        )
    );

    render() {
            return (
                <Editor
                    editorState={this.newEditorState()}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.editorStateChange}
                    placeholder="Escribe tu pregunta o post aquí con todos los detalles que necesites ... "
                    toolbar={{
                            options: ['inline', 'blockType', 'list', 'history', 'image', 'emoji', 'embedded', 'link'],
                            blockType: {
                                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote']
                              },
                            inline: {
                                options: ['bold', 'italic', 'underline', 'strikethrough']
                            },
                            list: {
                                options: ['unordered', 'ordered']
                            },
                            link: { inDropdown: false, defaultTargetOption: '_blank' },
                            image: {
                                className: undefined,
                                component: undefined,
                                popupClassName: undefined,
                                urlEnabled: true,
                                uploadEnabled: true,
                                alignmentEnabled: true,
                                uploadCallback: this.imageUploadCallback,
                                previewImage: true,
                                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                alt: { present: false, mandatory: false },
                                defaultSize: {
                                    height: 'auto',
                                    width: 'auto',
                                },
                            }
                    }
                }
                />
            )
        }

}

export default WysiwygE;
