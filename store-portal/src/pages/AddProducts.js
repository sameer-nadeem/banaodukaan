import * as React from 'react';
import { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState} from 'draft-js';
import axios from 'axios'
import { uri } from '../api.json'


const AddProducts = () => {
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState([])
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [brand, setBrand] = useState('')
  const [collection, setCollection] = useState('')
  const [status, setStatus] = useState('')

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  }
  const onChangeDescription = (editorState) => {
    setDescription(editorState.blocks[0].text)
  }
  const onChangeImage = (event) => {
      setImage(event.target.value);
  } 
  const onChangePrice = (event) => {
      setPrice(event.target.value);
  }
  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  }
  const onChangeBrand = (event) => {
      setBrand(event.target.value);
  }  
  const onChangeCollection = (event) => {
      setCollection(event.target.value);
  } 
  const onChangeStatus = (event) => {
      setStatus(event.target.value);
  }

  const addProducts = (event) => {
    event.preventDefault()
    const data = {
      title: title,
      price: price,
      stock: quantity,
      description: description,
      brandID: brand,
      collectionID: collection,
    }
    console.log(data)
    axios.post(`${uri}/product`, data, 
      {
        headers: {
          "Content-Type": "application/json"  
        }
      }
    ).then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })


  }

  return (
    <div>
      <div style={{display:'flex', justifyContent:'center', padding: 20}}>
      <div class="card" style={{padding:40, paddingTop: 25, width:'85%', backgroundColor: 'white' }}>
        <div>
          <h1 style={{fontSize:22, color: 'black'}}>Add product</h1>
        </div>
        <form style={{paddingTop: 25}}>
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
          <div class="row">
            <div class="col">
            <div class="mb-3">
              <label class="form-label" style={{color:'black'}}>File</label>
              <input class="form-control" type="file" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeImage}/>
            </div>
            </div>
            <div class="col">
            <div class="mb-3">
              <label class="form-label" style={{color:'black'}}>Price</label>
              <input class="form-control" type="number" style={{backgroundColor: 'white', color:'black'}} onChange={onChangePrice}/>
            </div>
            </div>
            <div class="col">
            <div class="mb-3">
              <label class="form-label" style={{color:'black'}}>Quantity</label>
              <input class="form-control" type="number" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeQuantity}/>
            </div>
            </div>
          </div> 
        </form>
      </div>
      </div>
      <div style={{display:'flex', justifyContent:'center', padding: 20}}>
      <div class="card" style={{padding:40, paddingTop: 25, width:'85%', backgroundColor: 'white' }}>
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label class="form-label" style={{color:'black'}}>Brand</label>
            <select class="form-select" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeBrand}>
              <option selected>Pick a Brand</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div class="col">
        <div class="mb-3">
            <label class="form-label" style={{color:'black'}}>Collection</label>
            <select class="form-select" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeCollection}>
              <option selected>Pick a Collection</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="mb-3">
        <label class="form-label" style={{color:'black'}}>Status</label>
        <select class="form-select" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeStatus}>
          <option selected>Select Status</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
  </div>
  <button type="button" class="btn btn-success" style={{width:'12%'}} onClick={(e) =>addProducts(e)}>Add Product</button>
      </div>
      </div>
    </div>
  );
}

export default AddProducts