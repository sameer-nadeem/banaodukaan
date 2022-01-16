import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import MUIDataTable from "mui-datatables";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import axios from "axios";
const StoresTable = () => {

  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const [stores, setStores] = useState([]);
  const [newRows, setRows] = useState([]);

  const getStores = async () => {
    try {
      const res = await axios.get(`/api/merchant/store`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("stores list: ", res);
      let list = res.data.stores;
      console.log(list)
      setStores(list);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteStore = async (id) => {
    try {
      await axios.delete(`/api/store/${id}`, {
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

  ];

  const options = {
    filterType: "checkbox",
    pagination: true,
    onRowsDelete: (rowData, newTable) => {
      // console.log(rowData.data)
      for (let i = 0; i < rowData.data.length; i++) {
        let idx = rowData.data[i].dataIndex;
        let id = newRows[idx].id;
        deleteStore(id);
      }
      setTimeout(function () {
        getStores();
      }, 200);
    },
    onRowClick: (rowData) => {
      console.log(rowData);
      window.location.href = `http://${rowData[1]}.bdstaging.com:3000/admin`
      // history(`${rowData[1]}.bdstaging.com:5000/admin`);
    },
  };

  useEffect(() => {
    //Runs only on the first render
    getStores();
  }, []);

  useEffect(() => {
    console.log(stores);
    const cleanedStores = [];

    stores.forEach(function (store) {
      const stor = {
        id: store._id,
        title: store.title,
        products: store.products,
        orders: store.orders,
        complaints: store.complaints,
      };
      cleanedStores.push(stor);
    });

    setRows(cleanedStores);
  }, [stores]);

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable data={newRows} columns={columns} options={options} />
    </ThemeProvider>
  );
};

export default StoresTable;
