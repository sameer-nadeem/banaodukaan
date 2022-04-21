import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../actions/auth";
import axios from "axios";
import useURL from "../utils/useURL";

const Navbar = () => {
  const [length, setLength] = useState(0);
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch();
  const [cart, setCart] = useState({products:[]});
  const [storeInfo, setStoreInfo] = useState([])
  const [img, setImg] = useState('')

  const refreshCart = useSelector(state => state.cart.refresh)
  


  const getStore = async () => {
    try {
      const url = useURL();
      const res = await axios.get(`${url}/api/auth/storeinfo`);
      setStoreInfo(res.data.store)
      const img_url = `${url + res.data.store.logo}`
      img_url = img_url.replace(/\\+\b/g, '/')
      setImg(img_url)
    } catch (err) {
      console.log(err);
    }
  };
  function getCart() {
    let cs = localStorage.getItem("cart");
    if (!cs) {
      setLength(0);
    } else {
      cs = JSON.parse(cs)
      setLength(cs.products.length)
      setCart(cs)
    }
  }
  useEffect(() => {
    getCart();
  }, [refreshCart]);


  useEffect(() => {
    getStore();
  }, []);

  return (
    <header className="header_area">
      <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
        <nav className="classy-navbar" id="essenceNav">
          <Link href="/">
            <a className="nav-brand"><img src={img === "" ? "/img/core-img/logo.png" : img} alt="" style={{width: '150px', height: '60px', objectFit: 'cover'}}/></a>
          </Link>
          <div className="classy-navbar-toggler">
            <span className="navbarToggler"><span></span><span></span><span></span></span>
          </div>
          <div className="classy-menu">
            <div className="classycloseIcon">
              <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
            </div>
            <div className="classynav">
              <ul>
                {/* <li><a href="#">Shop</a>
                  <div className="megamenu">
                    <ul className="single-mega cn-col-4">
                      <li className="title">Women's Collection</li>
                      <li><a href="shop.html">Dresses</a></li>
                      <li><a href="shop.html">Blouses &amp; Shirts</a></li>
                      <li><a href="shop.html">T-shirts</a></li>
                      <li><a href="shop.html">Rompers</a></li>
                    </ul>
                    <ul className="single-mega cn-col-4">
                      <li className="title">Men's Collection</li>
                      <li><a href="shop.html">T-Shirts</a></li>
                      <li><a href="shop.html">Polo</a></li>
                      <li><a href="shop.html">Shirts</a></li>
                      <li><a href="shop.html">Jackets</a></li>
                      <li><a href="shop.html">Trench</a></li>
                    </ul>
                    <ul className="single-mega cn-col-4">
                      <li className="title">Kid's Collection</li>
                      <li><a href="shop.html">Dresses</a></li>
                      <li><a href="shop.html">Shirts</a></li>
                      <li><a href="shop.html">T-shirts</a></li>
                      <li><a href="shop.html">Jackets</a></li>
                      <li><a href="shop.html">Trench</a></li>
                    </ul>
                    <div className="single-mega cn-col-4">
                      <img src="/img/bg-img/bg-6.jpg" alt="" />
                    </div>
                  </div>
                </li> */}
                <li><a href="#">Pages</a>
                  <ul className="dropdown">
                    <li><a href="/">Home</a></li>
                    <li><a href="/products">Shop</a></li>
                    {/* <li><a href="single-product-details.html">Product Details</a></li> */}
                    <li><a href="/checkout">Checkout</a></li>
                    {isAuth && <li><a href="/orders">Orders</a></li>}
                    {/* <li><a href="blog.html">Blog</a></li>
                    <li><a href="single-blog.html">Single Blog</a></li>
                    <li><a href="regular-page.html">Regular Page</a></li>
                    <li><a href="contact.html">Contact</a></li> */}
                  </ul>
                </li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="header-meta d-flex clearfix justify-content-end">
          <div className="search-area">
            <form action="#" method="post">
              <input type="search" name="search" id="headerSearch" placeholder="Type for search" />
              <button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
            </form>
          </div>
          {/* <div className="favourite-area">
            <a href="#"><img src="/img/core-img/heart.svg" alt="" /></a>
          </div> */}
          <div className="user-login-info">
            {
              isAuth ? (<div class="dropdown show">
                <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="/img/core-img/user.svg" alt="" /></a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <Link href="/profile">
                    <a className="dropdown">My Profile</a>
                  </Link>
                  <Link href="/">
                    <a className="dropdown" onClick={() => dispatch(logout())}>Logout</a>
                  </Link>
                </div>
              </div>) : (<div class="dropdown show">
                <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="/img/core-img/user.svg" alt="" /></a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <Link href="/login">
                    <a className="dropdown">Log in</a>
                  </Link>
                </div>
              </div>)
            }

          </div>

          <div className="cart-area">
            <a style = {{cursor: 'pointer'}} id="essenceCartBtn"><img src="/img/core-img/bag.svg" alt="" /> <span>{length}</span></a>
          </div>
        </div>

      </div>
    </header>

  );
};

export default Navbar;
