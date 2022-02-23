import React, { useState } from 'react';
import Link from 'next/link'
const Navbar = () => {
  return (
    <header className="header_area">
      <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
        <nav className="classy-navbar" id="essenceNav">
          <Link href="/">
            <a className="nav-brand"><img src="/img/core-img/logo.png" alt="" /></a>
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
                <li><a href="#">Shop</a>
                  <div className="megamenu">
                    <ul className="single-mega cn-col-4">
                      <li className="title">Women's Collection</li>
                      <li><a href="shop.html">Dresses</a></li>
                      <li><a href="shop.html">Blouses &amp; Shirts</a></li>
                      <li><a href="shop.html">T-shirts</a></li>
                      <li><a href="shop.html">Rompers</a></li>
                      <li><a href="shop.html">Bras &amp; Panties</a></li>
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
                </li>
                <li><a href="#">Pages</a>
                  <ul className="dropdown">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="shop.html">Shop</a></li>
                    <li><a href="single-product-details.html">Product Details</a></li>
                    <li><a href="checkout.html">Checkout</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="single-blog.html">Single Blog</a></li>
                    <li><a href="regular-page.html">Regular Page</a></li>
                    <li><a href="contact.html">Contact</a></li>
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
            <Link href="/login">
              <a><img src="/img/core-img/user.svg" alt="" /></a>
            </Link>
          </div>

          <div className="cart-area">
            <a href="#" id="essenceCartBtn"><img src="/img/core-img/bag.svg" alt="" /> <span>3</span></a>
          </div>
        </div>

      </div>
    </header>

  );
};

export default Navbar;
