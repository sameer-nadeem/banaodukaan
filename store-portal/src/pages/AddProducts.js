import * as React from 'react';
import { useState, useEffect } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios'
import { uri } from '../api.json'


const AddProducts = () => {
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState([])
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [brand, setBrand] = useState('')
  const [fetchBrands, setFetchedBrands] = useState([])
  const [collection, setCollection] = useState('')
  const [fetchCollections, setFetchedCollections] = useState([])
  const [status, setStatus] = useState('')
  const [path, setPath] = useState('')

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  }
  const onChangeDescription = (editorState) => {
    setDescription(editorState.blocks[0].text)
  }
  const onChangeImage = (event) => {
      setImage(event.target.files[0]);
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

  const getCollections = async () => {
    try{
      const res = await axios.get(`${uri}/collection`)
      setFetchedCollections(res.data.collections)
    }
    catch (err) {
      console.log(err)
    }
  }

  const getBrands = async () => {
    try{
      const res = await axios.get(`${uri}/brand`)
      setFetchedBrands(res.data.brands)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
      getCollections()
      getBrands()
  }, [])

  const addProducts = (event) => {
    if (image.length === 0 || title === '' || description === '' || brand === '' || collection === '' || status === ''){
      event.preventDefault()
      alert("Please Check Fields")
      return
    }
    else
    {
      event.preventDefault()
      const data = {
        title: title,
        price: price,
        stock: quantity,
        description: description,
        brandId: brand,
        collectionId: collection,
        status: status,
        image: path
      }
      axios.post(`${uri}/product`, data, 
        {
          headers: {
            "Content-Type": "application/json"  
          }
        }
      ).then(res => {
        window.location.reload(false);
      })
      .catch(err => {
        console.log(err)
      })
    }
    
  }

  const uploadImages = (event) =>{
    if (image.length === 0){
      alert("Please Select Image First")
    }
    else
    {
      console.log(image)
      event.preventDefault()
      const formData = new FormData()
      formData.append('myImage', image);
          const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          };
      axios.post(`${uri}/product/upload`, formData, config)
      .then(res => {
        alert('File has been uploaded successfully.')
        setPath(res.data.path)
      })
      .catch(err => {
        console.log(err)
      })
    }



  }

  return (
    <div>
      <form style={{paddingTop: 25}}>
      <div style={{display:'flex', justifyContent:'center', padding: 20}}>
      <div class="card" style={{padding:40, paddingTop: 25, width:'85%', backgroundColor: 'white' }}>
        <div>
          <h1 style={{fontSize:24, color: 'black'}}>Add Products</h1>
        </div>
        
          <div class="mb-3" style={{paddingTop: 25}}>
            <label class="form-label" style={{color:'black'}}>Title</label>
            <input class="form-control" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeTitle} required/>
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
            <form>
              <label class="form-label" style={{color:'black'}}>Image</label>
              <input class="form-control" type="file" name="myImage" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeImage} required/>
              <div style={{ marginTop: 5}}>
              <button class="btn btn-success" style={{width:'30%',}} onClick={(e) =>uploadImages(e)}>Upload</button>
              </div>
            </form>
            </div>
            </div>
            <div class="col">
            <div class="mb-3">
              <label class="form-label" style={{color:'black'}}>Price</label>
              <input class="form-control" type="number" style={{backgroundColor: 'white', color:'black'}} onChange={onChangePrice} required/>
            </div>
            </div>
            <div class="col">
            <div class="mb-3">
              <label class="form-label" style={{color:'black'}}>Quantity</label>
              <input class="form-control" type="number" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeQuantity} required/>
            </div>
            </div>
          </div> 
      </div>
      </div>
      <div style={{display:'flex', justifyContent:'center', padding: 20}}>
      <div class="card" style={{padding:40, paddingTop: 25, width:'85%', backgroundColor: 'white' }}>
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label class="form-label" style={{color:'black'}}>Brand</label>
            <select class="form-select" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeBrand} required>
            <option value="">Pick a Brand</option>
              {
                fetchBrands.map(b => (
                  <option value={b._id} key={b._id}>{b.name}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div class="col">
        <div class="mb-3">
            <label class="form-label" style={{color:'black'}}>Collection</label>
            <select class="form-select" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeCollection} required>
              <option value="">Pick a Collection</option>
              {
                fetchCollections.map(c => (
                  <option value={c._id} key={c._id}>{c.name}</option>
                ))
              }
            </select>
          </div>
        </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="mb-3">
        <label class="form-label" style={{color:'black'}}>Status</label>
        <select class="form-select" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeStatus} required>
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
        </select>
      </div>
    </div>
  </div>
    <button class="btn btn-success" style={{width:'18%'}} onClick={(e) =>addProducts(e)}>Add Product</button>
    </div>
    
  </div>
      </form>
    </div>
  );
}

export default AddProducts