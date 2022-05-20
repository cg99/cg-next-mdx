import React from 'react';
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.snow.css";
import "../../styles/Quill.module.scss";

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})


class Quill extends React.Component<{}, { text: string; }> {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        }
    }

    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    render() {
        return (
            <div className="text-editor">
                <QuillNoSSRWrapper
                    theme="snow"
                    onChange={(e) => {
                        this.setState({
                            text: e
                        })
                    }}
                    value={this.state.text}
                    modules={this.modules}
                    formats={this.formats} />
            </div>
        );
    }
}

export default Quill