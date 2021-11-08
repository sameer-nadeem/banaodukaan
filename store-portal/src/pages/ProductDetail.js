import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { uri } from '../api.json'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState,convertFromHTML, ContentState} from 'draft-js';
import { useLocation } from 'react-router';

const ProductDetail = () => {
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
  const [product, setProduct] = useState([])
  const [imgFile, setImgFile] = useState('')

  const location = useLocation();
  const rowData = location.state;


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

  const getProductById = async () => {
    try{
        const res = await axios.get(`${uri}/product/${rowData[0]}`)
        console.log(res)
        setProduct(res.data.product)
        setImgFile(res.data.product.path)
      }
    catch (err) {
    console.log(err)
    }
  }

  useEffect(() => {
      getCollections()
      getBrands()
      getProductById()
  }, [])

  const updateProducts = (event) => {
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
        setPath(res.data.filename)
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
              <h1 style={{fontSize:24, color: 'black'}}>{product === undefined ? '' : product.title}</h1>
            </div>
            
              <div class="mb-3" style={{paddingTop: 25}}>
                <label class="form-label" style={{color:'black'}}>Title</label>
                <input class="form-control" value={product.title} style={{backgroundColor: 'white', color:'black'}} onChange={onChangeTitle} required/>
              </div>
              <div class="mb-3">
                <label class="form-label" style={{color:'black'}}>Description</label>
                  <Editor
                    editorState={EditorState.createWithContent(ContentState.createFromText(description))}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onChange={onChangeDescription}
                  />
              </div>
              <div class="row">
                
                <div class="col">
                <div class="mb-3">
                  <label class="form-label" style={{color:'black'}}>Price</label>
                  <input class="form-control" value={product.price} type="number" style={{backgroundColor: 'white', color:'black'}} onChange={onChangePrice} required/>
                </div>
                </div>
                <div class="col">
                <div class="mb-3">
                  <label class="form-label" style={{color:'black'}}>Quantity</label>
                  <input class="form-control" value={product.stock} type="number" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeQuantity} required/>
                </div>
                </div>
              </div> 
          </div>
          </div>
        <div style={{display:'flex', justifyContent:'center', padding: 20}}>
            <div class="card" style={{padding:40, paddingTop: 25, width:'85%', backgroundColor: 'white' }}>
            <div class="col">
                <h1 style={{fontSize:20, color: 'black'}}>Media</h1>
                <div  style={{display:'flex', justifyContent:'center'}}>
                    <img src = {`${uri}/uploads/${path === '' ? product.image : path}`} width='400' height='400'/>
                </div>
                <div class="mb-3">
                <form>
                  <label class="form-label" style={{color:'black', padding: 5}}>Image</label>
                  <input class="form-control" type="file" name="myImage" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeImage} required/>
                  <div style={{ marginTop: 5}}>
                  <button class="btn btn-success" style={{width:'10%',}} onClick={(e) =>uploadImages(e)}>Upload</button>
                  </div>
                </form>
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
                <option selected value={product.brandId === undefined ? '' : product.brandId._id}>{product.brandId === undefined ? 'Pick a Brand' : product.brandId.name}</option>
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
                <option selected value={product.collectionId === undefined ? '' : product.collectionId._id}>{product.collectionId === undefined ? 'Pick a Collection' : product.collectionId.name}</option>
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
              <option selected value={product.status}>{product.status}</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
      </div>
        <button class="btn btn-success" style={{width:'18%'}} onClick={(e) =>updateProducts(e)}>Update Product</button>
        </div>
        
      </div>
          </form>
        </div>
    )


}

export default ProductDetail