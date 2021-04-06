import React from 'react';
import EditorJS from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../Tools/Tools';


const PostEditor = props => {

    return <EditorJS 
        tools={EDITOR_JS_TOOLS}
    />
};

export default PostEditor;