import styles from "../../styles/Login.module.css";
import { useState, useEffect} from "react";
const CheckoutDetails = (props) => {
    const [cart, setCart] = useState({products:[]})

    // this function gets the products from the cart
    const getProductsInCart = () => {
        let cs = localStorage.getItem("cart");

        if (!cs) {
            setEmpty(true);
            return;
        } else {
            cs = JSON.parse(cs)
            setCart(cs)        
        }
    }
    useEffect(() => {
        getProductsInCart();
      }, []);
    const handleClick = () => {
        props.buttonClick();
    }
  return (
    <div class="col-12 col-md-6 col-lg-5 ml-lg-auto">
      <div class="order-details-confirmation">
        <div class="cart-page-heading">
          <h5>Your Order</h5>
          <p>The Details</p>
        </div>

        <ul class="order-details-form mb-4">
          <li>
            <span>Product</span> <span>Total</span>
          </li>
          {cart.products.map((item) => {
              return (
                <li>
                    <span>{item.title} x {item.qty}</span> <span>${item.price*item.qty}</span>
                </li>
              )
          })}
          
          <li>
            <span>Subtotal</span> <span>${cart.total}</span>
          </li>
          <li>
            <span>Shipping</span> <span>Free</span>
          </li>
          <li>
            <span>Total</span> <span>${cart.total}</span>
          </li>
        </ul>

        <div id="accordion" role="tablist" class="mb-4">
          <div class="card">
            <div class="card-header" role="tab" id="headingOne">
              <h6 class="mb-0">
                <a
                  data-toggle="collapse"
                  href="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  <i class="fa fa-circle-o mr-3"></i>Paypal
                </a>
              </h6>
            </div>

            <div
              id="collapseOne"
              class="collapse"
              role="tabpanel"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div class="card-body">
                <p>Paypal</p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" role="tab" id="headingTwo">
              <h6 class="mb-0">
                <a
                  class="collapsed"
                  data-toggle="collapse"
                  href="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <i class="fa fa-circle-o mr-3"></i>cash on delievery
                </a>
              </h6>
            </div>
            <div
              id="collapseTwo"
              class="collapse"
              role="tabpanel"
              aria-labelledby="headingTwo"
              data-parent="#accordion"
            >
              <div class="card-body">
                <p>Cash On Delivery</p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" role="tab" id="headingThree">
              <h6 class="mb-0">
                <a
                  class="collapsed"
                  data-toggle="collapse"
                  href="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <i class="fa fa-circle-o mr-3"></i>credit card
                </a>
              </h6>
            </div>
            <div
              id="collapseThree"
              class="collapse"
              role="tabpanel"
              aria-labelledby="headingThree"
              data-parent="#accordion"
            >
              <div class="card-body">
                <p>Credit Card</p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" role="tab" id="headingFour">
              <h6 class="mb-0">
                <a
                  class="collapsed"
                  data-toggle="collapse"
                  href="#collapseFour"
                  aria-expanded="true"
                  aria-controls="collapseFour"
                >
                  <i class="fa fa-circle-o mr-3"></i>direct bank transfer
                </a>
              </h6>
            </div>
          </div>
        </div>
        <button onClick = {handleClick} className={`${styles.login} mt-3`} type="submit">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutDetails;
