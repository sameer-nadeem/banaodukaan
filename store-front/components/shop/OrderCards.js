import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import useURL from "../../utils/useURL";
const OrderCards = () => {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState();

  const getOrders = async () => {
    try {
      const url = useURL();
      const res = await axios.get(`${url}/api/customer/orders/${user._id}`);
      console.log("get orders", res.data.orders);
      setOrders(res.data.orders);
    } catch (err) {
      console.log("error", err);
    }
  };
  useEffect(() => {
    getOrders();
  }, [user]);
  return (
    <div>
      {orders !== undefined && orders.map((order, orderIndex) => (
        <div>
          <div style={{ padding: 40 }}>
            <div>
              <div
                class="order-details-confirmation"
                style={{ width: "80%", marginLeft: "10%" }}
              >
                <div class="cart-page-heading">
                  <h5>Your Order</h5>
                  <p>The Details</p>
                </div>

                <ul class="order-details-form mb-4">
                  <li>
                    <span>Product</span> <span>Total</span>
                  </li>
                  {order.products.map((product,productId) => (
                    <li>
                    <span>{product.product.title} x {product.qty}</span> <span>{product.product.price * product.qty}</span>
                    </li>
                  ))}
                  
                  <li>
                    <span>Subtotal</span> <span>{order.total}</span>
                  </li>
                  <li>
                    <span>Shipping</span> <span>Free</span>
                  </li>
                  <li>
                    <span>Total</span> <span>{order.total}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCards;
