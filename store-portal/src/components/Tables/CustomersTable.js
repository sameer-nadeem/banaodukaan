import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import MUIDataTable from "mui-datatables";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { uri } from "../../api.json";

const CustomersTable = () => {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    const history = useHistory();
    const [customers, setCustomers] = useState([]);
    const [newRows, setRows] = useState([]);
    const columns = ["Id", "FirstName", "Phone Number"];

    const getCustomers = async () => {
        try {
          const res = await axios.get(`${uri}/customer`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log("customers: ", res);
          let list = res.data.customers;
          setCustomers(list);
        } catch (err) {
          console.log(err);
        }
    };

    const deleteCustomer = async (id) => {
        try {
          await axios.delete(`${uri}/customer/${id}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (err) {
          console.log(err);
        }
    };

    useEffect(() => {
        //Runs only on the first render
        getCustomers();
    }, []);

    const options = {
        filterType: "checkbox",
        pagination: false,
        onRowsDelete: (rowData, newTable) => {
            for (let i = 0; i < rowData.data.length; i++) {
                let idx = rowData.data[i].dataIndex;
                let id = newRows[idx][0];
                console.log("delete - id ", id)
                deleteCustomer(id);
            }
            setTimeout(function () {
            getCustomers();
            }, 200);
        },
        // onRowClick: (rowData) => {
        //   history.push(`/admin/customer/${rowData[0]}`);
        // },
    };


    useEffect(() => {
        console.log(customers);
        const cleanedProducts = [];
        
        try {
            customers.forEach(function (customer) {
                const coll = [customer._id, customer.userId.firstName, customer.phone];
                cleanedProducts.push(coll);
            });
            setRows(cleanedProducts);
        }
        catch{
            setRows(cleanedProducts)
        }
      }, [customers]);

    return (
    <ThemeProvider theme={theme}>
      <MUIDataTable data={newRows} columns={columns} options = {options} />
    </ThemeProvider>
    );
};

export default CustomersTable;