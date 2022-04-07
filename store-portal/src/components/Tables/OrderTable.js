import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import MUIDataTable from "mui-datatables";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { uri } from "../../api.json";

const OrderTable = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const history = useHistory();

  const [orders, setOrders] = useState([]);
  const [newRows, setRows] = useState([]);

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`${uri}/merchant/order/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getOrders = async () => {
    try {
      const res = await axios.get(`${uri}/merchant/order`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setting orders into orders array here
      console.log("orders", res.data.orders);
      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //Runs only on the first render
    getOrders();
  }, []);

  useEffect(() => {
    const cleanedOrders = [];
    orders.forEach(function (order) {
      let quantity = 0;
      order.products.forEach(function (prod) {
        quantity += prod.qty;
      });
      const ord = {
        id: order._id,
        date: order.date,
        customerName: order.fullName,
        address: order.address,
        status: order.isDelivered ? 'Delivered' : 'In Transit',
        quantity: quantity,
        total: order.total,
      };
      cleanedOrders.push(ord);
    });
    setRows(cleanedOrders);
    console.log("cleaned orders", cleanedOrders);
  }, [orders]);

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "customerName",
      label: "Customer Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "address",
      label: "Address",
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
      name: "quantity",
      label: "Quantity",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "total",
      label: "Total",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
  const options = {
    filterType: "checkbox",
    pagination: false,
    onRowsDelete: (rowData, newTable) => {
      for (let i = 0; i < rowData.data.length; i++) {
        let idx = rowData.data[i].dataIndex;
        let id = newRows[idx].id;
        deleteOrder(id);
      }
      setTimeout(function () {
        getOrders();
      }, 200);
    },
    onRowClick: (rowData) => {
      console.log("clicked", rowData[0]);
      history.push(`/admin/order/${rowData[0]}`);
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable data={newRows} columns={columns} options={options} />
    </ThemeProvider>
  );
};

export default OrderTable;
