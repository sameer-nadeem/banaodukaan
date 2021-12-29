import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import MUIDataTable from "mui-datatables";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { uri } from "../../api.json";

const CollectionsTable = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const history = useHistory();

  const columns = ["Id", "Title"];

  const [collections, setCollections] = useState([]);
  const [newRows, setRows] = useState([]);

  const getCollections = async () => {
    axios
      .get(`${uri}/collection`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("collections here", res.data.collections);
        let list = res.data.collections;
        setCollections(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCollection = async (id) => {
    axios
      .delete(`${uri}/collection/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const options = {
    filterType: "checkbox",
    pagination: false,
    onRowsDelete: (rowData, newTable) => {
      for (let i = 0; i < rowData.data.length; i++) {
        let idx = rowData.data[i].dataIndex;
        let id = newRows[idx][0];
        deleteCollection(id);
      }
      setTimeout(function () {
        getCollections();
      }, 200);
    },
    onRowClick: (rowData) => {
      history.push(`/admin/collection/${rowData[0]}`);
    },
  };

  useEffect(() => {
    //Runs only on the first render
    getCollections();
  }, []);

  useEffect(() => {
    console.log(collections);
    const cleanedCollections = [];

    collections.forEach(function (collection) {
      const coll = [collection._id, collection.name];
      cleanedCollections.push(coll);
    });

    setRows(cleanedCollections);
  }, [collections]);

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable data={newRows} columns={columns} options={options} />
    </ThemeProvider>
  );
};

export default CollectionsTable;
