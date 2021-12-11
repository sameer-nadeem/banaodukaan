import { useEffect, useState } from "react";
import { Card, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Link, useHistory } from "react-router-dom";
import { uri } from "../api.json";

const Collections = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const history = useHistory();

  const columns = ["Id", "Title", "Description"];

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
      const coll = [collection._id, collection.name, collection.description];
      cleanedCollections.push(coll);
    });

    setRows(cleanedCollections);
  }, [collections]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Card style={{ height: "100%" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, justifyContent: "flex-start", padding: 20 }}>
            <h1 style={{ fontSize: 24 }}>Collections</h1>
          </div>
          <div style={{ justifyContent: "flex-end", padding: 20 }}>
            <Link to="/admin/collections/new">
              <Button
                variant="outlined"
                style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
              >
                Create Collections
              </Button>
            </Link>
          </div>
        </div>
        <div style={{ padding: "2%" }}>
          <ThemeProvider theme={theme}>
            <MUIDataTable data={newRows} columns={columns} options={options} />
          </ThemeProvider>
        </div>
      </Card>
    </div>
  );
};
export default Collections;
