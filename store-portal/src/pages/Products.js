import * as React from "react";
import {
  Card,
  Button,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import axios from "axios";
import { uri } from "../api.json";
import { Link, useHistory } from "react-router-dom";

const Products = () => {
  const [value, setValue] = React.useState(0);
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [products, setProducts] = React.useState([]);
  const [newRows, setRows] = React.useState([]);

  const getProducts = async () => {
    axios
      .get(`${uri}/product`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        let list = res.data.products;
        setProducts(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = async (id) => {
    axios
      .delete(`${uri}/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "thumbnail",
      label: "Picture",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "stock",
      label: "Stock",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "collection",
      label: "Collections",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "brand",
      label: "Brand",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    pagination: true,
    onRowsDelete: (rowData, newTable) => {
      // console.log(rowData.data)
      for (let i = 0; i < rowData.data.length; i++) {
        let idx = rowData.data[i].dataIndex;
        let id = newRows[idx].id;
        deleteProduct(id);
      }
      setTimeout(function () {
        getProducts();
      }, 200);
    },
    onRowClick: (rowData) => {
      history.push("/productdetail", rowData);
    },
  };

  React.useEffect(async () => {
    //Runs only on the first render
    getProducts();
  }, []);

  React.useEffect(async () => {
    console.log(products);
    const Mows = [];

    products.map(function (product) {
      if (product.deleteFlag == false) {
        const prod = {
          id: product._id,
          title: product.title,
          status: product.status,
          stock: product.stock,
          collection: product.collectionId.name,
          brand: product.brandId.name,
        };
        Mows.push(prod);
      } else {
      }
    });

    setRows(Mows);
  }, [products]);

  return (
    <div style={{ width: "100%" }}>
      <Card style={{ height: "100%" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, justifyContent: "flex-start", padding: 20 }}>
            <h1 style={{ fontSize: 24 }}>Products</h1>
          </div>
          <div style={{ justifyContent: "flex-end", padding: 20 }}>
            <Link to="/addproduct">
              <Button
                variant="outlined"
                style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
              >
                Add Product
              </Button>
            </Link>
          </div>
        </div>
        <ThemeProvider theme={theme}>
          <MUIDataTable data={newRows} columns={columns} options={options} />
        </ThemeProvider>
      </Card>
    </div>
  );
};
export default Products;
