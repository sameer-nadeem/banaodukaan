import { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LandingPageBarChart from "../components/Charts/LandingPageBarChart";
import LandingPagePieChart from "../components/Charts/LandingPagePieChart";
import axios from "axios";

const Landing = () => {
  const [inTransit, setInTransit] = useState(0)
  const [delivered, setDelivered] = useState(0)
  const [ordersCount, setOrdersCount] = useState(0)

  const getOrders = async () => {
    try {
      const res = await axios.get(`/api/analytics/order-info`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setting orders into orders array here
      let count = 0
      res.data.orders.forEach(order => {
        order._id ? setDelivered(order.sales) : setInTransit(order.sales)
        count = count + order.sales
      })
      setOrdersCount(count);
    } catch (err) {
      console.log(err);
    }

  }
  useEffect(() => {
    //Runs only on the first render
    getOrders();
  }, []);
  return (
    <div className="container" style={{ marginTop: 100 }}>
      <div className="row">
        <div className="col">
          <Card
            style={{
              background: "#4BB4DE",
              height: "100%",
              borderRadius: 30,
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{ flex: 1, justifyContent: "flex-start", padding: 30 }}
              >
                <div className="row">
                  <div className="col-2">
                    <ShoppingCartOutlinedIcon
                      style={{ color: "white", fontSize: 35 }}
                    />
                  </div>
                  <div className="col-2">
                    <h1
                      style={{
                        fontSize: 26,
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        marginTop: 2,
                      }}
                    >
                      {ordersCount}
                    </h1>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-8 .col-sm-6">
                    <h1
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        marginTop: 2,
                      }}
                    >
                      Number of Orders
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="col">
          <Card
            style={{
              background: "#4BB4DE",
              height: "100%",
              borderRadius: 30,
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{ flex: 1, justifyContent: "flex-start", padding: 35 }}
              >
                <div className="row">
                  <div className="col-2">
                    <CheckCircleOutlineOutlinedIcon
                      style={{ color: "white", fontSize: 35 }}
                    />
                  </div>
                  <div className="col-2">
                    <h1
                      style={{
                        fontSize: 26,
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        marginTop: 2,
                      }}
                    >
                      {delivered}
                    </h1>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-8 .col-sm-6">
                    <h1
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        marginTop: 2,
                      }}
                    >
                      Delivered Orders
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="col">
          <Card
            style={{
              background: "#4BB4DE",
              height: "100%",
              borderRadius: 30,
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{ flex: 1, justifyContent: "flex-start", padding: 35 }}
              >
                <div className="row">
                  <div className="col-2">
                    <LocalShippingOutlinedIcon
                      style={{ color: "white", fontSize: 35 }}
                    />
                  </div>
                  <div className="col-2">
                    <h1
                      style={{
                        fontSize: 26,
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        marginTop: 2,
                      }}
                    >
                      {inTransit}
                    </h1>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-8 .col-sm-6">
                    <h1
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        marginTop: 2,
                      }}
                    >
                      Orders in Transit
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div className="row">
          <div className="col-sm-8">
            <Card
              style={{
                background: "#f5f5f5",
                height: "100%",
                borderRadius: 30,
              }}
            >
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: 15,
                    height: "100%",
                  }}
                >
                  {/* add chart heere */}
                  <div style={{ padding: 15 }}>
                    <LandingPageBarChart />
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-sm-4 align-content-space-between">
            <Card
              style={{
                background: "#f5f5f5",
                height: "100%",
                borderRadius: 30,
              }}
            >
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: 15,
                  }}
                >
                  <div style={{ padding: 15 }}>
                    <LandingPagePieChart />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
