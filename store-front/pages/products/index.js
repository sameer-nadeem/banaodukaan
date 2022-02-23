import React from 'react'

const Products = () => {
  return (
    <>
      <div class="breadcumb_area bg-img" style={{ backgroundImage: "url(img/bg-img/breadcumb.jpg)" }}>
        <div class="container h-100">
          <div class="row h-100 align-items-center">
            <div class="col-12">
              <div class="page-title text-center">
                <h2>dresses</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="shop_grid_area section-padding-80">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-4 col-lg-3">
              <div class="shop_sidebar_area">

                <div class="widget catagory mb-50">
                  <h6 class="widget-title mb-30">Catagories</h6>

                  <div class="catagories-menu">
                    <ul id="menu-content2" class="menu-content collapse show">
                      <li data-toggle="collapse" data-target="#clothing">
                        <a href="#">clothing</a>
                        <ul class="sub-menu collapse show" id="clothing">
                          <li><a href="#">All</a></li>
                          <li><a href="#">Bodysuits</a></li>
                          <li><a href="#">Dresses</a></li>
                          <li><a href="#">Hoodies &amp; Sweats</a></li>
                          <li><a href="#">Jackets &amp; Coats</a></li>
                          <li><a href="#">Jeans</a></li>
                          <li><a href="#">Pants &amp; Leggings</a></li>
                          <li><a href="#">Rompers &amp; Jumpsuits</a></li>
                          <li><a href="#">Shirts &amp; Blouses</a></li>
                          <li><a href="#">Shirts</a></li>
                          <li><a href="#">Sweaters &amp; Knits</a></li>
                        </ul>
                      </li>
                      <li data-toggle="collapse" data-target="#shoes" class="collapsed">
                        <a href="#">shoes</a>
                        <ul class="sub-menu collapse" id="shoes">
                          <li><a href="#">All</a></li>
                          <li><a href="#">Bodysuits</a></li>
                          <li><a href="#">Dresses</a></li>
                          <li><a href="#">Hoodies &amp; Sweats</a></li>
                          <li><a href="#">Jackets &amp; Coats</a></li>
                          <li><a href="#">Jeans</a></li>
                          <li><a href="#">Pants &amp; Leggings</a></li>
                          <li><a href="#">Rompers &amp; Jumpsuits</a></li>
                          <li><a href="#">Shirts &amp; Blouses</a></li>
                          <li><a href="#">Shirts</a></li>
                          <li><a href="#">Sweaters &amp; Knits</a></li>
                        </ul>
                      </li>
                      <li data-toggle="collapse" data-target="#accessories" class="collapsed">
                        <a href="#">accessories</a>
                        <ul class="sub-menu collapse" id="accessories">
                          <li><a href="#">All</a></li>
                          <li><a href="#">Bodysuits</a></li>
                          <li><a href="#">Dresses</a></li>
                          <li><a href="#">Hoodies &amp; Sweats</a></li>
                          <li><a href="#">Jackets &amp; Coats</a></li>
                          <li><a href="#">Jeans</a></li>
                          <li><a href="#">Pants &amp; Leggings</a></li>
                          <li><a href="#">Rompers &amp; Jumpsuits</a></li>
                          <li><a href="#">Shirts &amp; Blouses</a></li>
                          <li><a href="#">Shirts</a></li>
                          <li><a href="#">Sweaters &amp; Knits</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="widget price mb-50">
                  <h6 class="widget-title mb-30">Filter by</h6>
                  <p class="widget-title2 mb-30">Price</p>

                  <div class="widget-desc">
                    <div class="slider-range">
                      <div data-min="49" data-max="360" data-unit="$" class="slider-range-price ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" data-value-min="49" data-value-max="360" data-label-result="Range:">
                        <div class="ui-slider-range ui-widget-header ui-corner-all"></div>
                        <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0"></span>
                        <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0"></span>
                      </div>
                      <div class="range-price">Range: $49.00 - $360.00</div>
                    </div>
                  </div>
                </div>

                <div class="widget color mb-50">
                  <p class="widget-title2 mb-30">Color</p>
                  <div class="widget-desc">
                    <ul class="d-flex">
                      <li><a href="#" class="color1"></a></li>
                      <li><a href="#" class="color2"></a></li>
                      <li><a href="#" class="color3"></a></li>
                      <li><a href="#" class="color4"></a></li>
                      <li><a href="#" class="color5"></a></li>
                      <li><a href="#" class="color6"></a></li>
                      <li><a href="#" class="color7"></a></li>
                      <li><a href="#" class="color8"></a></li>
                      <li><a href="#" class="color9"></a></li>
                      <li><a href="#" class="color10"></a></li>
                    </ul>
                  </div>
                </div>

                <div class="widget brands mb-50">
                  <p class="widget-title2 mb-30">Brands</p>
                  <div class="widget-desc">
                    <ul>
                      <li><a href="#">Asos</a></li>
                      <li><a href="#">Mango</a></li>
                      <li><a href="#">River Island</a></li>
                      <li><a href="#">Topshop</a></li>
                      <li><a href="#">Zara</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-8 col-lg-9">
              <div class="shop_grid_product_area">
                <div class="row">
                  <div class="col-12">
                    <div class="product-topbar d-flex align-items-center justify-content-between">
                      <div class="total-products">
                        <p><span>186</span> products found</p>
                      </div>
                      <div class="product-sorting d-flex">
                        <p>Sort by:</p>
                        <form action="#" method="get">
                          <select name="select" id="sortByselect">
                            <option value="value">Highest Rated</option>
                            <option value="value">Newest</option>
                            <option value="value">Price: $$ - $</option>
                            <option value="value">Price: $ - $$</option>
                          </select>
                          <input type="submit" class="d-none" value="" />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">

                  <div class="col-12 col-sm-6 col-lg-4">
                    <div class="single-product-wrapper">
                      <div class="product-img">
                        <img src="/img/product-img/product-1.jpg" alt="" />
                        <img class="hover-img" src="/img/product-img/product-2.jpg" alt="" />

                        <div class="product-badge offer-badge">
                          <span>-30%</span>
                        </div>
                        <div class="product-favourite">
                          <a href="#" class="favme fa fa-heart"></a>
                        </div>
                      </div>

                      <div class="product-description">
                        <span>topshop</span>
                        <a href="single-product-details.html">
                          <h6>Knot Front Mini Dress</h6>
                        </a>
                        <p class="product-price"><span class="old-price">$75.00</span> $55.00</p>

                        <div class="hover-content">
                          <div class="add-to-cart-btn">
                            <a href="#" class="btn essence-btn">Add to Cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-sm-6 col-lg-4">
                    <div class="single-product-wrapper">
                      <div class="product-img">
                        <img src="/img/product-img/product-2.jpg" alt="" />
                        <img class="hover-img" src="/img/product-img/product-3.jpg" alt="" />

                        <div class="product-favourite">
                          <a href="#" class="favme fa fa-heart"></a>
                        </div>
                      </div>

                      <div class="product-description">
                        <span>topshop</span>
                        <a href="single-product-details.html">
                          <h6>Knot Front Mini Dress</h6>
                        </a>
                        <p class="product-price">$80.00</p>

                        <div class="hover-content">
                          <div class="add-to-cart-btn">
                            <a href="#" class="btn essence-btn">Add to Cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-sm-6 col-lg-4">
                    <div class="single-product-wrapper">
                      <div class="product-img">
                        <img src="/img/product-img/product-3.jpg" alt="" />
                        <img class="hover-img" src="/img/product-img/product-4.jpg" alt="" />

                        <div class="product-badge new-badge">
                          <span>New</span>
                        </div>

                        <div class="product-favourite">
                          <a href="#" class="favme fa fa-heart"></a>
                        </div>
                      </div>

                      <div class="product-description">
                        <span>topshop</span>
                        <a href="single-product-details.html">
                          <h6>Knot Front Mini Dress</h6>
                        </a>
                        <p class="product-price">$80.00</p>

                        <div class="hover-content">
                          <div class="add-to-cart-btn">
                            <a href="#" class="btn essence-btn">Add to Cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-sm-6 col-lg-4">
                    <div class="single-product-wrapper">
                      <div class="product-img">
                        <img src="/img/product-img/product-4.jpg" alt="" />
                        <img class="hover-img" src="/img/product-img/product-5.jpg" alt="" />

                        <div class="product-favourite">
                          <a href="#" class="favme fa fa-heart"></a>
                        </div>
                      </div>

                      <div class="product-description">
                        <span>topshop</span>
                        <a href="single-product-details.html">
                          <h6>Knot Front Mini Dress</h6>
                        </a>
                        <p class="product-price">$80.00</p>

                        <div class="hover-content">
                          <div class="add-to-cart-btn">
                            <a href="#" class="btn essence-btn">Add to Cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-sm-6 col-lg-4">
                    <div class="single-product-wrapper">
                      <div class="product-img">
                        <img src="/img/product-img/product-5.jpg" alt="" />
                        <img class="hover-img" src="/img/product-img/product-6.jpg" alt="" />

                        <div class="product-badge offer-badge">
                          <span>-30%</span>
                        </div>

                        <div class="product-favourite">
                          <a href="#" class="favme fa fa-heart"></a>
                        </div>
                      </div>

                      <div class="product-description">
                        <span>topshop</span>
                        <a href="single-product-details.html">
                          <h6>Knot Front Mini Dress</h6>
                        </a>
                        <p class="product-price"><span class="old-price">$75.00</span> $55.00</p>

                        <div class="hover-content">
                          <div class="add-to-cart-btn">
                            <a href="#" class="btn essence-btn">Add to Cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-sm-6 col-lg-4">
                    <div class="single-product-wrapper">
                      <div class="product-img">
                        <img src="/img/product-img/product-6.jpg" alt="" />
                        <img class="hover-img" src="/img/product-img/product-7.jpg" alt="" />

                        <div class="product-favourite">
                          <a href="#" class="favme fa fa-heart"></a>
                        </div>
                      </div>

                      <div class="product-description">
                        <span>topshop</span>
                        <a href="single-product-details.html">
                          <h6>Knot Front Mini Dress</h6>
                        </a>
                        <p class="product-price">$80.00</p>

                        <div class="hover-content">
                          <div class="add-to-cart-btn">
                            <a href="#" class="btn essence-btn">Add to Cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-sm-6 col-lg-4">
                    <div class="single-product-wrapper">
                      <div class="product-img">
                        <img src="/img/product-img/product-7.jpg" alt="" />
                        <img class="hover-img" src="/img/product-img/product-8.jpg" alt="" />

                        <div class="product-badge new-badge">
                          <span>New</span>
                        </div>

                        <div class="product-favourite">
                          <a href="#" class="favme fa fa-heart"></a>
                        </div>
                      </div>

                      <div class="product-description">
                        <span>topshop</span>
                        <a href="single-product-details.html">
                          <h6>Knot Front Mini Dress</h6>
                        </a>
                        <p class="product-price">$80.00</p>

                        <div class="hover-content">
                          <div class="add-to-cart-btn">
                            <a href="#" class="btn essence-btn">Add to Cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-sm-6 col-lg-4">
                    <div class="single-product-wrapper">
                      <div class="product-img">
                        <img src="/img/product-img/product-8.jpg" alt="" />
                        <img class="hover-img" src="/img/product-img/product-9.jpg" alt="" />

                        <div class="product-favourite">
                          <a href="#" class="favme fa fa-heart"></a>
                        </div>
                      </div>

                      <div class="product-description">
                        <span>topshop</span>
                        <a href="single-product-details.html">
                          <h6>Knot Front Mini Dress</h6>
                        </a>
                        <p class="product-price">$80.00</p>

                        <div class="hover-content">
                          <div class="add-to-cart-btn">
                            <a href="#" class="btn essence-btn">Add to Cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-sm-6 col-lg-4">
                    <div class="single-product-wrapper">
                      <div class="product-img">
                        <img src="/img/product-img/product-9.jpg" alt="" />
                        <img class="hover-img" src="/img/product-img/product-1.jpg" alt="" />

                        <div class="product-favourite">
                          <a href="#" class="favme fa fa-heart"></a>
                        </div>
                      </div>

                      <div class="product-description">
                        <span>topshop</span>
                        <a href="single-product-details.html">
                          <h6>Knot Front Mini Dress</h6>
                        </a>
                        <p class="product-price">$80.00</p>

                        <div class="hover-content">
                          <div class="add-to-cart-btn">
                            <a href="#" class="btn essence-btn">Add to Cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <nav aria-label="navigation">
                <ul class="pagination mt-50 mb-70">
                  <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-left"></i></a></li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item"><a class="page-link" href="#">...</a></li>
                  <li class="page-item"><a class="page-link" href="#">21</a></li>
                  <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-right"></i></a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Products
