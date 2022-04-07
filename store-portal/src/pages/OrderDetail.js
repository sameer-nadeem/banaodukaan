import { useState, useEffect } from "react";
import axios from "axios";
import { uri } from "../api.json";
import { useParams, useHistory } from "react-router-dom";
import Alert from "../components/Alerts/Alert";
import { Button } from "@material-ui/core";
import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const OrderDetail = () => {
  const history = useHistory();
  const { id: orderId } = useParams();
  const [status, setStatus] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState(0);
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState('')
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  const handleClose = () => {
    setShow(false);
    if (alertType === 'success') {
      history.push("/admin/orders");
    }
  };
  const handleShow = () => setShow(true);
  const onChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const updateOrder = async (event) => {
    event.preventDefault();
    if (
      status === ""
    ) {

      handleShow();
      setAlertTitle("Error")
      setAlertMessage("Please Select Status")
      setAlertType("failure")
      return;
    } else {
      event.preventDefault();
      const data = {
        status: status
      };

      try {
        console.log('over here', orderId)
        await axios.put(`${uri}/merchant/order/${orderId}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleShow();
        setAlertTitle("Success")
        setAlertMessage("Order Status Set Successfully!")
        setAlertType("success")
      } catch (err) {
        console.log(err);
      }
    }
  };


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
        setProducts(res.data.order.products);
        setStatus(res.data.order.status)
      } catch (err) {
        console.log(err);
      }
    };
    getOrderById(orderId);
  }, [orderId]);
  return (
    <div>
      <form style={{ paddingTop: 25 }}>
        <div>
          <Alert
            title={alertTitle}
            message={alertMessage}
            show={show}
            variant={alertType === "success" ? "success" : "failure"}
            handleClose={handleClose}
            handleShow={handleShow}
          />
        </div>
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
            {products.map((index, product) => {
              return (
                <>
                  <div className="mb-3" style={{ paddingTop: 25 }}>
                    <label
                      className="form-label"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      Product Name
                    </label>
                    <input
                      className="form-control"
                      value={products[product].product.title}
                      style={{ backgroundColor: "white", color: "black" }}
                      // onChange={onChangeTitle}
                      required
                    />
                  </div>
                  <div className="mb-3" style={{}}>
                    <label
                      className="form-label"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      Product Quantity
                    </label>
                    <input
                      className="form-control"
                      value={products[product].qty}
                      style={{ backgroundColor: "white", color: "black" }}
                      // onChange={onChangeTitle}
                      required
                    />
                  </div>
                  <div className="row">
                    <AliceCarousel>
                      {products[product].product.image !== []
                        ? products[product].product.image.map((paths) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={(
                                  `http://${window.location.hostname}:5000` +
                                  paths
                                ).replace(/\\+\b/g, "/")}
                                className="d-block w-50 center"
                                alt="..."
                              />
                            </div>
                          );
                        })
                        : null}
                    </AliceCarousel>
                  </div>
                </>
              );
            })}
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
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                    Status
                  </label>
                  <select
                    className="form-select"
                    style={{ backgroundColor: "white", color: "black" }}
                    onChange={onChangeStatus}
                    required
                  >
                    <option>Select Status</option>
                    <option value={true}>Delivered</option>
                    <option value={false}>In Transit</option>
                  </select>
                </div>
              </div>
            </div>
            <Button
              variant="outlined"
              style={{ width: "18%", backgroundColor: "#3B8AC4", color: "#FFFFFF", boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', fontWeight: 500 }}
              onClick={(e) => updateOrder(e)}
            >
              Set Status
            </Button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default OrderDetail;
