import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useURL from "../../utils/useURL";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useSelector, useDispatch } from 'react-redux'

const Product = () => {
  const router = useRouter();
  const url = useURL();
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState([]);
  // const { id } = router.query;
  const [isEmpty, setEmpty] = useState(false);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState({products:[]});


  const refreshCart = useSelector(state => state.cart.refresh)
  const dispatch = useDispatch()
  useEffect(() => {
    if(router.isReady){
         const { id } = router.query;
         console.log("id",id)
        if (!id) return null;
        getProduct(id);
     }
}, [router.isReady]);

  const getProduct = async (id) => {
    try {
      console.log("rsfbisbgfesif",router.query)
      const url = useURL();
      const res = await axios.get(`${url}/api/product/${id}`);
      setProduct(res.data.product);
      setImage(res.data.product.image);
      console.log(res.data.product)
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //   getProduct();
  // }, [refreshCart]);

  useEffect(() => {
    let cs = localStorage.getItem("cart");

    if (!cs) {
      setEmpty(true);
      return;
    } else {
      console.log(cs);
      cs = JSON.parse(cs);
      setCart(cs);
      console.log("cart", cart);
    }
  }, [refreshCart]);


  function addProductToCart(product) {
    console.log("product", product);
    console.log("we are in add to cart");
    let cs = "{}";
    if (typeof window !== "undefined") {
      cs = localStorage.getItem("cart");
    }
    let cart1;
    let isAdded = false;

    if (!cs) {
      console.log("new cart");
      cart1 = {
        products: [
          {
            _id: product._id,
            qty: 1,
            title: product.title,
            price: product.price,
            url: product.image,
          },
        ],
        total: product.price,
      };
    } else {
      console.log("cart already present");
      cart1 = JSON.parse(cs);

      console.log("cart1", cart1);
      cart1.products = cart1.products.map((ci) => {
        if (ci._id == product._id) {
          console.log("item already present");
          isAdded = true;
          return {
            _id: ci._id,
            qty: ci.qty + 1,
            title: ci.title,
            price: ci.price,
            url: ci.url,
          };
        }

        return {
          _id: ci._id,
          qty: ci.qty,
          title: ci.title,
          price: ci.price,
          url: ci.url,
        };
      });

      if (!isAdded) {
        console.log("newItem");
        cart1.products.push({
          _id: product._id,
          qty: 1,
          title: product.title,
          price: product.price,
          url: product.image,
        });

        if (cart.total === undefined) {
          cart1.total = product.price;
        } else {
          cart1.total = cart1.total + product.price;
        }
      } else {
        if (cart.total === undefined) {
          cart1.total = product.price;
        } else {
          cart1.total = cart1.total + product.price;
        }
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart1));
    dispatch({type:"REFRESH_CART"})
    console.log("cart", cart1);
  }

  return (
    <section class="single_product_details_area d-flex align-items-center">
      <div class="single_product_thumb clearfix">
        <AliceCarousel autoPlay>
          {image.map((i) => {
            console.log("umg", i);
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`${url + i}`}
                  alt=""
                  style={{ width: "40%", paddingTop: "5%" }}
                />
              </div>
            );
          })}
        </AliceCarousel>
      </div>

      <div class="single_product_desc clearfix">
        <span>{product.brandId !== undefined && product.brandId.name}</span>
        <a href="cart.html">
          <h2>{product !== undefined && product.title}</h2>
        </a>
        <p class="product-price">Rs {product !== undefined && product.price}</p>
        <p class="product-desc">
          {product.description !== undefined &&
            product.description.replace(/<[^>]+>/g, "")}
        </p>

        <form class="cart-form clearfix" method="post">
          {/* <div class="select-box d-flex mt-50 mb-30">
            <select name="select" id="productSize" class="mr-5">
              <option value="value">Size: XL</option>
              <option value="value">Size: X</option>
              <option value="value">Size: M</option>
              <option value="value">Size: S</option>
            </select>
            <select name="select" id="productColor">
              <option value="value">Color: Black</option>
              <option value="value">Color: White</option>
              <option value="value">Color: Red</option>
              <option value="value">Color: Purple</option>
            </select>
          </div> */}
          <div class="cart-fav-box d-flex align-items-center">
            <button
              type="submit"
              name="addtocart"
              value="5"
              class="btn essence-btn"
              onClick={(e) => addProductToCart(product)}
            >
             
              Add to cart
            </button>
            {/* <div class="product-favourite ml-4">
              <a href="#" class="favme fa fa-heart"></a>
            </div> */}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Product;
