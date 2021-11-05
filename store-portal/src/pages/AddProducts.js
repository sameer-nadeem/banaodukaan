import * as React from 'react';
import { useState } from 'react';
import { Box, Card, MenuItem, Select} from '@material-ui/core';
import {Form,Button,Row,Col} from 'react-bootstrap'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState} from 'draft-js';


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
  const onChangeDescription = (editorState, event) => {
    const {value} = event.target
    setDescription(value);
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

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{display:'flex', justifyContent:'center', padding: 20}}>
      <Card style={{padding:40, paddingTop: 25, width:'85%' }}>
        <div>
          <h1 style={{fontSize:22}}>Add product</h1>
        </div>
        <Form style={{paddingTop: 25}}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="Short sleeve t-shirt" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeTitle}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              editorState={description}
              onEditorStateChange={onChangeDescription}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload File</Form.Label>
                <Form.Control type="file" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeImage}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" inline>
                <Form.Label>Price</Form.Label>
                <Form.Control type="email" placeholder="Enter Price" style={{backgroundColor: 'white', color:'black'}} onChange={onChangePrice} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" inline>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="email" placeholder="Enter Price" style={{backgroundColor: 'white', color:'black'}} onChange={onChangeQuantity}/>
              </Form.Group>
            </Col>
          </Row> 
        </Form>
      </Card>
      </div>
      <div style={{display:'flex', justifyContent:'center', padding: 20}}>
      <Card style={{padding:40, paddingTop: 25, width:'85%' }}>
      <Row>
        <Col>
          <Form.Group className="mb-3" inline>
            <Form.Label>Brand</Form.Label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Brand"
              style={{width: '100%'}}
              onChange={onChangeBrand}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" inline>
          <Form.Label>Collection</Form.Label>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Brand"
              style={{width: '100%'}}
              onChange={onChangeCollection}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
      </Form.Group>
        </Col>
  </Row>
  <Row >
    
    <Col>
        <Form.Group className="mb-3" inline>
          <Form.Label>Status</Form.Label>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Brand"
              style={{width: '100%'}}
              onChange={onChangeStatus}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
      </Form.Group>
    </Col>
  </Row>
  <Button>Submit</Button>
      </Card>
      </div>
    </Box>
  );
}

export default AddProducts