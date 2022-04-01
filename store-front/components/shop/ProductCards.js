import React, { useEffect, useState } from "react";
import axios from "axios";
import useURL from "../../utils/useURL";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux'
const ProductCards = (props) => {
  const [cart, setCart] = useState({ products: [] });
  const [isEmpty, setEmpty] = useState(false);
  const [total, setTotal] = useState(0);
  const filters = useSelector(state => state.filters)
  const [products, setProducts] = useState([]);
  const url = useURL();
  const router = useRouter();
  const handleClick = (e, id) => {
    e.preventDefault();
    router.push({
      pathname: "/product/" + id,
    });
  };

  const getProducts = async () => {
    try {
      const url = useURL();
      const res = await axios.get(`${url}/api/product?c_id=${filters.collection}&b_id=${filters.brand}&p_up=${filters.priceUpper}&p_lo=${filters.priceLower}&sortby=${filters.sortBy}`);
      console.log("products, ", res.data.products);
      setProducts(res.data.products);
      props.counter(res.data.products.length);
    } catch (err) {
      console.log("errrrrrrr", err);
    }
  };
  useEffect(() => {
    if (props.collectionProducts !== undefined) {
      setProducts(props.collectionProducts);
      props.counter(props.collectionProducts.length);
    } else {
      getProducts();
    }
  }, [props, filters]);

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
  }, []);

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
    console.log("cart", cart1);
  }

  return (
    <div class="row">
      {products.map((product, index) => {
        return (
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="single-product-wrapper">
              <div class="product-img">
                <img src={`${url + product.image[0]}`} alt="" />
                <img class="hover-img" src={product.image.length >1 ? `${url + product.image[1]}` : ""} alt="" />

                {/* <div class="product-badge offer-badge">
                  <span>-30%</span>
                </div> */}
                {/* <div class="product-favourite">
                  <a href="#" class="favme fa fa-heart"></a>
                </div> */}
              </div>

              <div class="product-description">
                <span>topshop</span>
                <a
                  onClick={(e) => handleClick(e, product._id)}
                  style={{ cursor: "pointer" }}
                >
                  <h6>{product.title}</h6>
                </a>
                <p class="product-price">
                  {/* <span class="old-price">Rs.{product.price}</span> Rs. */}
                  Rs. {product.price}
                </p>

                <div class="hover-content">
                  <div class="add-to-cart-btn">
                    <a
                      onClick={(e) => addProductToCart(product)}
                      class="btn essence-btn"
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default ProductCards;
