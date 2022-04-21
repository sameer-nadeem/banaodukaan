import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { uri } from "../api.json";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';

import { Bar } from 'react-chartjs-2';

    
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
    );



const AnalyticsPage = () => {

    const [salesProd, setSalesProd] = useState({});
    const [salesBrand, setSalesBrand] = useState({});

    const getAnalytics = async () => {
        try {
            const res = await axios.get(`${uri}/analytics/orders`, {
            headers: {
                "Content-Type": "application/json",
            },
            });
            setSalesProd(res.data.ordersSales)
            setSalesBrand(res.data.BrandSales)
            
        } catch (err) {
            console.log(err);
        }
    };

    const getSalesbyDate = async () => {
        try {
            const res = await axios.get(`${uri}/analytics/sales-data`, {
            headers: {
                "Content-Type": "application/json",
            },
            });

            const bes = await axios.get(`${uri}/analytics/order-info`, {
                headers: {
                    "Content-Type": "application/json",
                },
                });


                const fes = await axios.get(`${uri}/analytics/brand-sales`, {
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
        getAnalytics()
        getSalesbyDate()
    }, []);
    








    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
                <div className="card" style={{ padding: 40, paddingTop: 25, width: '85%', backgroundColor: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }} >
                        <div className = 'row'>
                        <h1>Analytics</h1>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }} >
                        <div className = 'row'>
                        <h3 style={{marginTop: 25}}>Product Sales</h3>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }} className ='row'>
                        < Bar 
                            data= {{
                                // labels: ['Today','Yesterday', '2days Ago', '3days Ago', '4days Ago'],
                                datasets: [{
                                    label: '# of Orders',
                                    data: salesProd,
                                    backgroundColor: '#4bb4de'
                                }]
                            }} 
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }} >
                        <div className = 'row'>
                        <h3 style={{marginTop: 25}}>Brand Sales</h3>
                        </div>
                    </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }} className ='row'>
                        < Bar 
                            data= {{
                                // labels: ['Today','Yesterday', '2days Ago', '3days Ago', '4days Ago'],
                                datasets: [{
                                    label: '# of Orders',
                                    data: salesBrand,
                                    backgroundColor: '#4bb4de'
                                }]
                            }} 
                            />
                        </div>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsPage
