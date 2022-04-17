import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const LandingPagePieChart = () => {
  const [brands, setBrands] = useState(0)
  const [counts, setCounts] = useState(0)
  const getBrandSales = async () => {
    try {
      const res = await axios.get(`/api/analytics/brand-sales`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      let brand = Object.keys(res.data.BrandSales)
      let count = Object.values(res.data.BrandSales)
      setBrands(brand)
      setCounts(count)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    //Runs only on the first render
    getBrandSales();
  }, []);
  return (
    <div>
      <Pie
        data={{
          labels: brands,
          datasets: [
            {
              label: "My First Dataset",
              data: counts,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(170, 255, 0)",
                "rgb(180, 0, 255)"
              ],
              borderColor: ["white", "white", "white", "white", "white"],
              hoverOffset: 4,
            },
          ],
        }}
        options={{
          plugins: {
            // legend: {
            //   display: false,
            // },
            title: {
              display: true,
              text: "Brand Sales",
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

export default LandingPagePieChart;
