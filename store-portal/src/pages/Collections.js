import * as React from 'react';
import { Card, Button } from "@material-ui/core"
import { DataGrid } from '@mui/x-data-grid'
import MUIDataTable from "mui-datatables";
import axios from 'axios'
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Link, useHistory } from "react-router-dom"
import { uri } from '../api.json'

const Collections = () => {

  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  
  const columns = ["Title", "Description"];
  
  const [collections, setCollections] = React.useState([])
  const [newRows, setRows] = React.useState([])

  const getCollections = async() => {
    axios.get(`${uri}/collection`, 
      {
        headers: {
          "Content-Type": "application/json"  
        }
      }
    ).then(res => {

      console.log(res)
      let list = res.data.collections
      setCollections(list)   
      
    })
    .catch(err => {
      console.log(err)
    })

  }

  const data = [
    ["Home page","This is the homepage collection"],
    ["Shirts", "This is the collection for shirts"]
  ];

  const options = {
    filterType: 'checkbox',
    pagination: false,
  };

  React.useEffect(async() => {
    //Runs only on the first render 
    getCollections()
    
  }, [])

  
  React.useEffect(async() => {
    console.log(collections)
    const Mows = []

    collections.map(function (collection) {      
    
    const coll = [
      collection.name,
      collection.description 
    ]

    Mows.push(coll);
      
    })

    setRows(Mows)
    console.log(newRows)

  },[collections])

  return (
    
    <div style={{ height: '100%', width: '100%' }}>
      <Card style={{height:'100%'}}>
        <div style={{display: 'flex',}}>
          <div style={{ flex: 1, justifyContent: 'flex-start', padding: 20}}>
            <h1 style={{fontSize: 24}}>Collections</h1>
          </div>
          <div style={{justifyContent: 'flex-end', padding: 20}}>
            <Link to="/addcollection"> 
              <Button variant="outlined" style={{backgroundColor: '#12824C', color: '#FFFFFF' }}>Create Collections</Button>
            </Link>
          </div>
        </div>
        <div style = {{padding: '2%'}}>
          <ThemeProvider theme={theme}>
            <MUIDataTable
              
              data={newRows}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </div>  
      </Card>
    </div>
  );
}
export default Collections