import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import MUIDataTable from "mui-datatables";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { uri } from "../../api.json";

const ProductsTable = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [newRows, setRows] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${uri}/product`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      let list = res.data.products;
      setProducts(list);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${uri}/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
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
      name: "image",
      label: "Picture",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (p) => <img alt="" width="75px" src={p}></img>,
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
      console.log(rowData);
      history.push(`/admin/product/${rowData[0]}`);
    },
  };

  useEffect(() => {
    //Runs only on the first render
    getProducts();
  }, []);

  useEffect(() => {
    console.log(products);
    const cleanedProducts = [];

    products.forEach(function (product) {
      const prod = {
        id: product._id,
        title: product.title,
        status: product.status,
        stock: product.stock,
        collection: product.collectionId.name,
        brand: product.brandId.name,
        image: product.image,
      };
      cleanedProducts.push(prod);
    });

    setRows(cleanedProducts);
  }, [products]);

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable data={newRows} columns={columns} options={options} />
    </ThemeProvider>
  );
};

export default ProductsTable;