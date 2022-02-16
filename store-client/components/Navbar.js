import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css'
import MenuIcon from '@mui/icons-material/Menu';
const Navbar = () => {
  return (
    <header
    id="masthead"
    class="site-header header-default cartsy-banner-search-form-hide"
  >
    <div class="cartsy-menu-area">
      <nav id="site-navigation" class="navigation-drawer">
        <div class="cartsy-menu-toggler">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="cartsy-drawer-overlay"></div>
      </nav>
      <div class="site-branding">
        <div class="cartsy-header-logo-wrapper">
          <h2 class="site-title">
            <a
              href="https://cartsy.redq.io/furniture/"
              class="custom-logo-link"
              rel="home"
              aria-current="page"
              ><img
                width="113"
                height="30"
                src="https://d1rn6kzjmi8824.cloudfront.net/wp-content/uploads/sites/4/2020/07/16070044/Furniture.svg"
                class="custom-logo"
                alt="Cartsy Furniture"
            /></a>
          </h2>
        </div>
      </div>
      <div class="cartsy-header-search-form">
        <div class="cartsy-product-search-form position-header">
          <label>
            <span class="hidden-text">Search…</span>
            <span class="cartsy-product-search-form-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.048"
                height="18"
                viewBox="0 0 17.048 18"
              >
                <path
                  data-name="Path 17130"
                  d="M380.321,383.992l3.225,3.218c.167.167.341.329.5.506a.894.894,0,1,1-1.286,1.238c-1.087-1.067-2.179-2.131-3.227-3.236a.924.924,0,0,0-1.325-.222,7.509,7.509,0,1,1-3.3-14.207,7.532,7.532,0,0,1,6,11.936C380.736,383.462,380.552,383.685,380.321,383.992Zm-5.537.521a5.707,5.707,0,1,0-5.675-5.72A5.675,5.675,0,0,0,374.784,384.513Z"
                  transform="translate(-367.297 -371.285)"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <input
              class="cartsy-product-search-form-input"
              placeholder="Search..."
              type="search"
              name="cartsy-search-banner-form-input"
            />
          </label>
        </div>
      </div>
      <div class="cartsy-menu-right-col">
        <div class="cartsy-header-search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18.942"
            height="20"
            viewBox="0 0 18.942 20"
          >
            <g
              id="Group_5362"
              data-name="Group 5362"
              transform="translate(-643 -40)"
            >
              <g
                id="Group_5327"
                data-name="Group 5327"
                transform="translate(643 40)"
              >
                <path
                  data-name="Path 17130"
                  d="M381.768,385.4l3.583,3.576c.186.186.378.366.552.562a.993.993,0,1,1-1.429,1.375c-1.208-1.186-2.422-2.367-3.585-3.6a1.026,1.026,0,0,0-1.473-.246,8.343,8.343,0,1,1-3.671-15.785,8.369,8.369,0,0,1,6.663,13.262C382.229,384.815,382.025,385.063,381.768,385.4Zm-6.152.579a6.342,6.342,0,1,0-6.306-6.355A6.305,6.305,0,0,0,375.615,385.983Z"
                  transform="translate(-367.297 -371.285)"
                  fill="currentColor"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <a
          class="cartsy-join-us-btn"
          href="https://cartsy.redq.io/furniture/my-account/"
        >
          My Accounz
        </a>

        <div class="cartsy-mini-cart-on-desktop">
          <div class="cartsy-mini-cart-widget two">
            <div class="cartsy-mini-cart-overlay"></div>
            <ul id="site-header-cart" class="site-header-cart menu">
              <li class="cartsy-mini-cart-dropdown-btn">
                <div class="menu-cart-area header-cart-counter">
                  <div class="cart-item-badge">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <path
                        id="shopping-bag"
                        d="M5,4H19a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4ZM2,5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3V19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3Zm10,7C9.239,12,7,9.314,7,6H9c0,2.566,1.669,4,3,4s3-1.434,3-4h2C17,9.314,14.761,12,12,12Z"
                        transform="translate(-2 -2)"
                        fill="currentColor"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="count"> 10 </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
  );
};

export default Navbar;
