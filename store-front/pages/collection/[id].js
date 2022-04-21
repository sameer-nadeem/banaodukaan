import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useURL from "../../utils/useURL";
import ProductCards from "../../components/shop/ProductCards";
import { useSelector } from "react-redux";

const Collection = () => {
  const router = useRouter();
  const url = useURL();
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(0);
  const { id } = router.query;
  const filters = useSelector((state) => state.filters);
  const getProduct = async () => {
    try {
      const url = useURL();
      //   const res = await axios.get(`${url}/api/product`);
      const res = await axios.get(
        `${url}/api/product?c_id=${filters.collection}&b_id=${filters.brand}&p_up=${filters.priceUpper}&p_lo=${filters.priceLower}&sortby=${filters.sortBy}`
      );

      const FilteredProducts = res.data.products.filter(
        (product) => product.collectionId._id === id
      );
      setProduct(FilteredProducts);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div
        class="breadcumb_area bg-img"
        style={{ backgroundImage: "url(img/bg-img/breadcumb.jpg)" }}
      >
        <div class="container h-100">
          <div class="row h-100 align-items-center">
            <div class="col-12">
              <div class="page-title text-center">
                <h2>
                  {product.length != 0
                    ? product[0].collectionId.name
                    : "Collection"}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="shop_grid_area section-padding-80">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-4 col-lg-3">{/* <Categories /> */}</div>

            <div class="col-12 col-md-8 col-lg-9">
              <div class="shop_grid_product_area">
                <div class="row">
                  <div class="col-12">
                    <div class="product-topbar d-flex align-items-center justify-content-between">
                      <div class="total-products">
                        <p>
                          <span>{count}</span> products found
                        </p>
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

                <ProductCards collectionProducts={product} counter={setCount} />
              </div>
              {/* <nav aria-label="navigation">
                <ul class="pagination mt-50 mb-70">
                  <li class="page-item">
                    <a class="page-link" href="#">
                      <i class="fa fa-angle-left"></i>
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      ...
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      21
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      <i class="fa fa-angle-right"></i>
                    </a>
                  </li>
                </ul>
              </nav> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Collection;
