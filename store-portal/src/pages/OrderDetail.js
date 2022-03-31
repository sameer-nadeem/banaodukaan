import { useState, useEffect } from "react";
import axios from "axios";
import { uri } from "../api.json";
import { useParams, useHistory } from "react-router-dom";
import Alert from "../components/Alerts/Alert";
import { Button } from "@material-ui/core";
import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";

const OrderDetail = () => {
  const history = useHistory();
  const { id: orderId } = useParams();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState(0);
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getOrderById = async (id) => {
      try {
        const res = await axios.get(`${uri}/merchant/order/${id}`);
        console.log("orderdetail", res.data.order);
        setCustomerName(res.data.order.fullName);
        setCustomerEmail(res.data.order.email);
        setCity(res.data.order.city);
        setPostalCode(res.data.order.postalCode);
        setAddress(res.data.order.address);
        setTotal(res.data.order.total);
      } catch (err) {
        console.log(err);
      }
    };
    getOrderById(orderId);
  }, [orderId]);
  return (
    <div>
      <form style={{ paddingTop: 25 }}>
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <div
            className="card form-card"
            style={{
              padding: 40,
              paddingTop: 25,
              width: "85%",
              backgroundColor: "white",
            }}
          >
            <div class="d-flex flex-row">
              <div class="p2" style={{ marginRight: 20 }}>
                <BackspaceRoundedIcon
                  style={{ fill: "#345DA7", cursor: "pointer" }}
                  onClick={() => history.push("/admin/orders")}
                />
              </div>
              <div class="p2">
                <h1
                  style={{ fontSize: 24, fontWeight: "bold", color: "black" }}
                >
                  Order Detail
                </h1>
              </div>
            </div>
            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label
                className="form-label"
                style={{ color: "black", fontWeight: "600" }}
              >
                Customer Name
              </label>
              <input
                className="form-control"
                value={customerName}
                style={{ backgroundColor: "white", color: "black" }}
                // onChange={onChangeTitle}
                required
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                style={{ color: "black", fontWeight: "600" }}
              >
                Customer Email
              </label>
              <input
                className="form-control"
                value={customerEmail}
                style={{ backgroundColor: "white", color: "black" }}
                // onChange={onChangeTitle}
                required
              />
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ color: "black", fontWeight: "600" }}
                  >
                    City
                  </label>
                  <input
                    className="form-control"
                    value={city}
                    type="text"
                    style={{ backgroundColor: "white", color: "black" }}
                    // onChange={onChangePrice}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ color: "black", fontWeight: "600" }}
                  >
                    Postal Code
                  </label>
                  <input
                    className="form-control"
                    value={postalCode}
                    type="number"
                    style={{ backgroundColor: "white", color: "black" }}
                    // onChange={onChangeQuantity}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                style={{ color: "black", fontWeight: "600" }}
              >
                Address
              </label>
              <input
                className="form-control"
                value={address}
                style={{ backgroundColor: "white", color: "black" }}
                // onChange={onChangeTitle}
                required
              />
            </div>
          </div>
        </div>

        {/* code to display products below */}
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <div
            className="card form-card"
            style={{
              padding: 40,
              paddingTop: 25,
              width: "85%",
              backgroundColor: "white",
            }}
          >
            <div className="row">
              <h1 style={{ fontSize: 24, color: "black", fontWeight: "bold" }}>
                Products
              </h1>
            </div>
          </div>
        </div>

        {/* code for showing amount and quantity below */}
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <div
            className="card form-card"
            style={{
              padding: 40,
              paddingTop: 25,
              width: "85%",
              backgroundColor: "white",
            }}
          >
            <div className="row">
              <h1 style={{ fontSize: 24, color: "black", fontWeight: "bold" }}>
                Payment Details
              </h1>
            </div>
            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label
                className="form-label"
                style={{ color: "black", fontWeight: "600" }}
              >
                Total Amount
              </label>
              <input
                className="form-control"
                value={total}
                style={{ backgroundColor: "white", color: "black" }}
                // onChange={onChangeTitle}
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderDetail;
