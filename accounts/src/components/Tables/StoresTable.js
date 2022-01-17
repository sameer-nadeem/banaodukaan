import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@material-ui/core";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

const StoresTable = () => {

  const [stores, setStores] = useState([]);
  // const [newRows, setRows] = useState([]);

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

  // const deleteStore = async (id) => {
  //   try {
  //     await axios.delete(`/api/store/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const columns = [
  //   {
  //     name: "id",
  //     label: "ID",
  //     options: {
  //       filter: true,
  //       sort: false,
  //     },
  //   },
  //   {
  //     name: "title",
  //     label: "Title",
  //     options: {
  //       filter: true,
  //       sort: false,
  //     },
  //   },

  // ];

  // const options = {
  //   filterType: "checkbox",
  //   pagination: true,
  //   onRowsDelete: (rowData, newTable) => {
  //     // console.log(rowData.data)
  //     for (let i = 0; i < rowData.data.length; i++) {
  //       let idx = rowData.data[i].dataIndex;
  //       let id = newRows[idx].id;
  //       deleteStore(id);
  //     }
  //     setTimeout(function () {
  //       getStores();
  //     }, 200);
  //   },
  //   onRowClick: (rowData) => {
  //     console.log(rowData);
  //     window.location.href = `http://${rowData[1]}.bdstaging.com:3000/admin`
  //     // history(`${rowData[1]}.bdstaging.com:5000/admin`);
  //   },
  // };

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

    // setRows(cleanedStores);
  }, [stores]);

  // const history = useNavigate();

  const handleClick = (storeName) => {
    window.location.href = `http://${storeName}.bdstaging.com:3000/admin`
  }

  return (
    <div style={{ margin: 45 }}>
      {
        stores.map((eachStore => (
          <div className="row" key={eachStore._id}>
            <div className="col-10">
              <Card >
                <CardActionArea key={eachStore._id} onClick={() => handleClick(eachStore.title)}>
                  <div style={{ padding: 20 }}>
                    <Grid container direction="row" alignItems="center">
                      <Grid item xs={1}>
                        <StorefrontIcon />
                      </Grid>
                      <Grid item xs={10}>
                        <h1 style={{
                          fontSize: "1.0rem",
                          fontWeight: "600",
                          marginLeft: 20,
                          marginTop: 5,

                        }}>
                          {eachStore.title}.banaodukaan.com/admin
                        </h1>
                      </Grid>
                      <Grid item alignContent='flex-end'>
                        <KeyboardArrowRightIcon />
                      </Grid>
                    </Grid>
                  </div>
                </CardActionArea>
              </Card>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="col justify-content-center d-flex align-items-center">
              <Link style={{ textDecoration: "none", display: "inline", color: "black" }}
                to={`/my-stores/${eachStore._id}`}>
                <i style={{ fontSize: "20px" }} className="fas fa-edit"></i>
              </Link>
            </div>
          </div>
        )))
      }

    </div >
  );
};

export default StoresTable;
