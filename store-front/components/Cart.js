import React, { useEffect, useState } from "react";
import useURL from "../utils/useURL";


var product = [
  {
    id: 3,
    title: "Gaming Mouse",
    imageURL:
      "https://m.media-amazon.com/images/I/51S6IQ2lGwL._AC_UY327_FMwebp_QL65_.jpg",
    price: 49.5,
  },
  {
    id: 1,
    title: "Gaming Chair",
    imageURL:
      "https://m.media-amazon.com/images/I/61HEqHMkRhL._AC_UL480_FMwebp_QL65_.jpg",
    price: 149.0,
  },
];

const Cart = () => {
  const [cart, setCart] = useState({products:[]});
  const [isEmpty, setEmpty] = useState(false);
  const [total, setTotal] = useState(0);
  const url = useURL();

  function updateCart () {
    let cs = localStorage.getItem("cart");

    if (!cs) {
      setEmpty(true);
      return;
    } else {
      console.log(cs);
      cs = JSON.parse(cs)
      setCart(cs);
      console.log('cart' , cart)
    }
  }

  useEffect(() => {
    updateCart();
  }, []);

  
  useEffect(()=>{

  },total)

  function calculateTotal(){

    
    
      console.log('cart in total' , cart)

      let sum = 0;
      for(const product of cart.products){
        sum = sum + product.price*product.qty
     
      }
      console.log(sum)

      setTotal(sum)
    

  }

  function addProductToCart(product) {

    console.log('we are in add to cart')
    let cs = '{}'
    if(typeof window !== 'undefined'){
      cs = localStorage.getItem("cart");
    }
    let cart1;
    let isAdded = false;

    if (!cs) {
      console.log("new cart");
      cart1 = {
        products: [
          {
            id: product.id,
            qty: 1,
            title: product.title,
            price: product.price,
            url: product.imageURL,
          },
        ],
        total : product.price
      };
    } else {
      console.log("cart already present");
      cart1 = JSON.parse(cs);

      console.log('cart1', cart1)
      cart1.products = cart1.products.map((ci) => {
        if (ci.id == product.id) {
          console.log("item already present");
          isAdded = true;
          return {
            id: ci.id,
            qty: ci.qty + 1,
            title: ci.title,
            price: ci.price,
            url: ci.url,
          };
        }

        return {
          id: ci.id,
          qty: ci.qty,
          title: ci.title,
          price: ci.price,
          url: ci.url,
        };
      });

      if (!isAdded) {
        console.log("newItem");
        cart1.products.push({
          id: product.id,
          qty: 1,
          title: product.title,
          price: product.price,
          url: product.imageURL,
        });

        if(cart.total === undefined){
          cart1.total =  product.price
        }
        else{
          cart1.total = cart1.total + product.price

        }
      }
      else{
        if(cart.total === undefined){
          cart1.total =  product.price
        }
        else{
          cart1.total = cart1.total + product.price

        }

      }
      
    }
    localStorage.setItem("cart", JSON.stringify(cart1));
    console.log("cart", cart1);
  }

  function removeFromCart(id) {
    console.log("we are in remove cart");

    const cs = localStorage.getItem("cart");
    let cart = JSON.parse(cs);
    let toRemove = false;
    let found  = false
    let newTotal ;

    for (const product of cart.products) {
      if (product._id === id) {
        if (product.qty >= 2) {
          found =  true
          console.log("item found");
          product.qty--;
          cart.total = cart.total - product.price
        } else {
          toRemove = true;
          newTotal = cart.total - product.price
          break;
        }
      }
    }

    if (toRemove === true) {
      const newCart = cart.products.filter((product) => {
        return product._id !== id;
      });
      cart = {
        products: newCart,
        total : newTotal
      };
    }
    

    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart)
  }

   

  return (
    <>
      <div className="cart-bg-overlay"></div>
      <div className="right-side-cart-area">
        <div className="cart-button">
          <a href="#" id="rightSideCart">
            <img src="/img/core-img/bag.svg" alt="" /> <span>3</span>
          </a>
        </div>

        <div className="cart-content d-flex">
          <div className="cart-list">
            {console.log('cart map',cart.products)}
            { 
            cart.products.map((item) => {
              {console.log(item)}
              return(
              <div className="single-cart-item">
                <a href="#" className="product-image">
                  <img
                    src={`${url + ':5000' + item.url}`}
                    className="cart-thumb"
                    alt=""
                  />
                  <div className="cart-item-desc">
                    <span className="product-remove">
                      <i onClick = {()=> {removeFromCart(item._id); }}  className="fa fa-close" aria-hidden="true"></i>
                    </span>
                    <span className="badge">{item.title}</span>
                    {/* <h6>{item.brand}</h6> */}
                    <p className="size">Quantity:  {item.qty}</p>
                    <p className="price">$ {item.price}</p>
                  </div>
                </a>
              </div>
              )
            })
          } 

        
          </div>

          <div className="cart-amount-summary">
            <h2>Summary</h2>
            <ul className="summary-table">
              <li>
                <span>subtotal:</span> <span>${cart.total}</span>
              </li>
              <li>
                <span>delivery:</span> <span>Free</span>
              </li>
              <li>
                <span>discount:</span> <span>0%</span>
              </li>
              <li>
                <span>total:</span> <span>${cart.total}</span>
              </li>
            </ul>
            <div className="checkout-btn mt-100">
              <a  href="checkout.html" className="btn essence-btn">
                check out
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
