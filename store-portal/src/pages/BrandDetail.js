import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { uri } from '../api.json'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState,convertFromHTML, ContentState} from 'draft-js';
import { useLocation } from 'react-router';
import { Link, useHistory } from "react-router-dom"


const BrandDetail = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState([])

  const location = useLocation();
  const rowData = location.state;
  const history = useHistory();

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  }
  const onChangeDescription = (editorState) => {
    setDescription(editorState.blocks[0].text)
  }
  
  const updateBrand = (event) => {
    event.preventDefault()
    const body = {
        name: title,
        description: description,
        deleteFlag: false
    }
    axios.put(`${uri}/brand/${brand._id}`, body, 
        {
          headers: {
            "Content-Type": "application/json"  
          }
        }
      ).then(res => {
        history.push('/brands')
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  const brandID = async () => {
    try{
        const res = await axios.get(`${uri}/brand/${rowData[0]}`)
        setBrand(res.data.brand)
        setTitle(res.data.brand.name)
        setDescription(res.data.brand.description)
      }
    catch (err) {
    console.log(err)
    }
  }

  useEffect(() => {
      brandID()
  }, [])

  
    return (
        <div>
          <form style={{paddingTop: 25}}>
          <div style={{display:'flex', justifyContent:'center', padding: 20}}>
          <div class="card" style={{padding:40, paddingTop: 25, width:'85%', backgroundColor: 'white' }}>
            <div>
              <h1 style={{fontSize:24, color: 'black'}}>{brand === undefined ? '' : brand.name}</h1>
            </div>
            
              <div class="mb-3" style={{paddingTop: 25}}>
                <label class="form-label" style={{color:'black'}}>Title</label>
                <input class="form-control" value={title} style={{backgroundColor: 'white', color:'black'}} onChange={onChangeTitle} required/>
              </div>
              <div class="mb-3">
                <label class="form-label" style={{color:'black'}}>Current Description</label>
                <div> 
                <textarea class="form-control" style={{backgroundColor: 'white', color:'black'}} value={brand.description} disabled="disabled" id="exampleFormControlTextarea1" rows="3"/>
                </div>
                <div>
                <label class="form-label" style={{color:'black', paddingTop: 25}}>New Description</label>
                
                  <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onChange={onChangeDescription}
                  />
                  </div>
            </div>
            <button class="btn btn-success" style={{width:'25%'}} onClick={(e) =>updateBrand(e)}>Update Brand</button>
          </div>
          
        </div>
      </form>
    </div>          
  )
}

export default BrandDetail