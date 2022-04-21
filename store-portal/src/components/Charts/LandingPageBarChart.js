import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";


const LandingPageBarChart = () => {
  const [dates, setDates] = useState([])
  const [total, setTotal] = useState([])
  const [background, setBackground] = useState([])
  const [border, setBorder] = useState([])

  const getSales = async () => {
    try {
      const res = await axios.get(`/api/analytics/sales-data`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      let date = []
      let transaction = []
      let color = []
      let bcolor = []
      res.data.sales.forEach(sale => {
        date.push(sale._id)
        transaction.push(sale.sales)
        color.push('#4BB4DE')
        bcolor.push('white')
      });
      setDates(date)
      setTotal(transaction)
      setBackground(color)
      setBorder(bcolor)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    //Runs only on the first render
    getSales();
  }, []);
  return (
    <div style={{ paddingRight: 15, maxWidth: "98%" }}>
      <Bar
        data={{
          // Name of the variables on x-axies for each bar
          labels: dates,
          datasets: [
            {
              // Data or value of your each variable
              data: total,
              // Color of each bar
              backgroundColor: background,
              // Border color of each bar
              borderColor: border,
              borderWidth: 0.5,
            },
          ],
        }}
        // Height of graph
        height={400}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  // The y-axis value will start from zero
                  beginAtZero: true,
                },
              },
            ],
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "Sales",
              color: "#4BB4DE",
              font: {
                size: 26,
                weight: "600",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default LandingPageBarChart;
