import React, { useEffect, useState } from 'react'
import { ThemeProvider } from "@mui/styles";
import MUIDataTable from "mui-datatables";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { uri } from "../../api.json";

const BrandsTable = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const history = useHistory();

  const columns = ["Id", "Title", "Description"];

  const [brands, setBrands] = useState([]);
  const [newRows, setRows] = useState([]);

  const getBrands = async () => {
    try {
      const res = await axios.get(`${uri}/brand`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log("collections here", res.data.brands);
      setBrands(res.data.brands);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBrand = async (id) => {

    try {
      await axios
        .delete(`${uri}/brand/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
    } catch (err) {
      console.log(err);
    }
  };


  const options = {
    filterType: "checkbox",
    pagination: false,
    onRowsDelete: (rowData, newTable) => {
      for (let i = 0; i < rowData.data.length; i++) {
        let idx = rowData.data[i].dataIndex;
        let id = newRows[idx][0];
        deleteBrand(id);
      }
      setTimeout(function () {
        getBrands();
      }, 200);
    },
    onRowClick: (rowData) => {
      history.push(`/admin/brand/${rowData[0]}`);
    },
  };

  useEffect(() => {
    //Runs only on the first render
    getBrands();
  }, []);

  useEffect(() => {
    console.log(brands);
    const cleanedBrands = [];

    brands.forEach(function (brand) {
      const coll = [brand._id, brand.name, brand.description];
      cleanedBrands.push(coll);
    });

    setRows(cleanedBrands);
  }, [brands]);


  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable data={newRows} columns={columns} options={options} />
    </ThemeProvider>
  )
}

export default BrandsTable
