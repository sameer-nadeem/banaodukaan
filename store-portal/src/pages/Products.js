import * as React from 'react';
import { Box, Tabs, Tab, CardContent, Card, CardActionArea, Typography, Button, Stack } from "@material-ui/core"
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { uri } from '../api.json'
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';


const Products = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [products, setProducts] = React.useState([])
  const [newRows, setRows] = React.useState([])


  const getProducts = async() => {
    axios.get(`${uri}/product`, 
      {
        headers: {
          "Content-Type": "application/json"  
        }
      }
    ).then(res => {

      console.log(res)
      let list = res.data.products
      setProducts(list)   
      
    })
    .catch(err => {
      console.log(err)
    })

  }

  const deleteProduct = async(id) => {
    axios.delete(`${uri}/product/${id}`, 
      {
        headers: {
          "Content-Type": "application/json"  
        }
      }
    )
    .catch(err => {
      console.log(err)
    })

  }

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center' },
  //   { field: 'title', headerName: 'Title', width: 150, headerAlign: 'center' },
  //   { field: 'status', headerName: 'Status', width: 150, headerAlign: 'center'},
  //   {
  //     field: 'stock',
  //     headerName: 'Inventory',
  //     type: 'number',
  //     width: 150,
  //     headerAlign: 'center'
  //   },
  //   {
  //     field: 'collection',
  //     headerName: 'Collection',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     headerAlign: 'center'
  //   },
  // ];

  const columns = [
    {
    name: "id",
    label: "ID",
    options: {
      filter: true,
      sort: false,
    }
    },
    {
    name: "title",
    label: "Title",
    options: {
      filter: true,
      sort: false,
    }
    },
    {
    name: "status",
    label: "Status",
    options: {
      filter: true,
      sort: false,
    }
    },
    {
    name: "stock",
    label: "Stock",
    options: {
      filter: true,
      sort: true,
    }
    },
    {
      name: "collection",
      label: "Collections",
      options: {
        filter: true,
        sort: false,
      }
      },
  ];
  
  let rows = [
    { id: 1, title: 'Snow', status: 'Jon', stock: 35, collection: 'test' },
    { id: 2, title: 'Lannister', status: 'Cersei', stock: 42, collection: 'test'  },
    { id: 3, title: 'Lannister', status: 'Jaime', stock: 45, collection: 'test'  },
    { id: 4, title: 'Stark', status: 'Arya', stock: 16, collection: 'test' },
    { id: 5, title: 'Targaryen', status: 'Daenerys', stock: 55, collection: 'test'  },
    { id: 6, title: 'Melisandre', status: null, stock: 150, collection: 'test'  },
    { id: 7, title: 'Clifford', status: 'Ferrara', stock: 44, collection: 'test'  },
    { id: 8, title: 'Frances', status: 'Rossini', stock: 36, collection: 'test'  },
    { id: 9, title: 'Roxie', status: 'Harvey', stock: 65, collection: 'test'},
  ];
  
  const options = {
    filterType: 'checkbox',
    pagination: true,
    onRowsDelete : (rowData, newTable) => {
      // console.log(rowData.data)
      for (let i = 0; i < rowData.data.length; i++) {
        let idx = rowData.data[i].dataIndex
        let id = newRows[idx].id
        deleteProduct(id)

      }
      setTimeout(function(){
        getProducts()
      }, 200)
      
      ;},
    onRowClick: (rowData, rowState) => {
      console.log("bye");}
    }

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  React.useEffect(async() => {
    //Runs only on the first render 
    getProducts()
    
  }, [])

  React.useEffect(async() => {
    console.log(products)
    const Mows = []

    products.map(function (product) {      
    if (product.deleteFlag == false){
      const prod = {
        id: product._id,
        title: product.title,
        status: null,
        stock: product.stock,
        collection: 'test'
      
      }
      Mows.push(prod);}
      else {}
      
    })

    setRows(Mows)

  },[products])


  return (
    
    <div style={{width: '100%' }}>
      <Card style={{height:'100%'}}>
        <div style={{display: 'flex',}}>
        <div style={{ flex: 1, justifyContent: 'flex-start', padding: 20}}>
          <h1 style={{fontSize: 24}}>Products</h1>
        </div>
        <div style={{justifyContent: 'flex-end', padding: 20}}>
          <Button variant="outlined" style={{backgroundColor: '#12824C', color: '#FFFFFF'}}>Add Product</Button>
        </div>
        </div>
        <ThemeProvider theme={theme}>
            <MUIDataTable
              
              data={newRows}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
      </Card>
    </div>
  );
}
export default Products