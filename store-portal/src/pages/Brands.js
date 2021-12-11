import { useEffect, useState } from "react";
import { Card, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Link, useHistory } from "react-router-dom";
import { uri } from "../api.json";

const Brands = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const history = useHistory();

  const columns = ["Id", "Title", "Description"];

  const [brands, setBrands] = useState([]);
  const [newRows, setRows] = useState([]);

  const getBrands = async () => {
    axios
      .get(`${uri}/brand`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("collections here", res.data.brands);
        let list = res.data.brands;
        setBrands(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBrand = async (id) => {
    axios
      .delete(`${uri}/brand/${id}`, {
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
    <div style={{ height: "100%", width: "100%" }}>
      <Card style={{ height: "100%" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, justifyContent: "flex-start", padding: 20 }}>
            <h1 style={{ fontSize: 24 }}>Brands</h1>
          </div>
          <div style={{ justifyContent: "flex-end", padding: 20 }}>
            <Link to="/admin/brands/new">
              <Button
                variant="outlined"
                style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
              >
                Create Brands
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
export default Brands;
