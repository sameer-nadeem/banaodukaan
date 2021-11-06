import * as React from 'react';
import { useState, useRef } from 'react';
import { Editor } from "react-draft-wysiwyg";
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios'
import { uri } from '../api.json'

const AddCollections = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(title,description)

    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const onChangeDescription = (editorState) => {
        setDescription(editorState.blocks[0].text)
    }

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', padding: 20}}>
                <div class="card" style={{padding:40, paddingTop: 25, width:'85%', backgroundColor: 'white' }}>
                    <div style = {{display: 'flex'}}>
                        <h1 style={{fontSize:22, color: 'black'}}>Create Collection</h1>
                    </div>
                    <form style={{paddingTop: 25}} onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label class="form-label" style={{color:'black'}}>Title</label>
                        <input class="form-control" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeTitle}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" style={{color:'black'}}>Description</label>
                            <Editor
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onChange={onChangeDescription}
                            />
                    </div>
                    <button type="submit" class="btn btn-success" style={{width:'12%'}}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCollections