import { Editor, EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { Component, useState } from "react";
import axios from "axios";


class Draft extends Component<{}, { editorState: EditorState }> {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange: (editorState: EditorState) => void = (editorState) => {
        this.setState({
            editorState,
        });
    };

    uploadImageCallBack = async (file) => {
        const imgData = await this.uploadInlineImageForArticle(file);
        return Promise.resolve({
            data: {
                link: `${process.env.NEXT_PUBLIC_API_URL}${imgData[0].formats.small.url}`
            }
        });
    }

    async uploadInlineImageForArticle(file) {
        const formData = new FormData();
        formData.append('files', file);
        try {
            let { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/upload`,
                formData
            )
            return data;
        } catch (e) {
            console.log('caught error');
            console.error(e);
            return null;
        }
    }

    render() {
        const { editorState } = this.state;

        return (
            <Editor
                editorState={editorState}
                toolbarClassName="toolbar-class"
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: {
                        urlEnabled: true,
                        uploadEnabled: true,
                        uploadCallback: this.uploadImageCallBack,
                        previewImage: true,
                        alt: { present: false, mandatory: false }
                    },
                }}
            />
        )
    }
}

export default Draft;
