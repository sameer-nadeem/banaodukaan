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
  return (
    <div>
      <Pie
        data={{
          labels: ["Armani", "Zara", "Hopscotch"],
          datasets: [
            {
              label: "My First Dataset",
              data: [300, 50, 100],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              borderColor: ["white", "white", "white"],
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
