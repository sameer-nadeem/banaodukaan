import React, { useEffect, useState } from "react";
import Categories from '../../components/shop/Categories'
import ProductCards from '../../components/shop/ProductCards'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux'
import { setSortbyFltr } from '../../actions/filter'

const Products = () => {
  const [count, setCount] = useState(0)
  const [filters, setFilters] = useState({
    collections: null, brand: null, p_less: Number.MAX_VALUE, p_great: 0
  })
  const [sortBy, setSortBy] = React.useState('newest');
  const dispatch = useDispatch()
  const handleChange = (event) => {
    setSortBy(event.target.value);
    dispatch(setSortbyFltr(event.target.value))
  };
  return (
    <>
      <div class="breadcumb_area bg-img" style={{ backgroundImage: "url(img/bg-img/breadcumb.jpg)" }}>
        <div class="container h-100">
          <div class="row h-100 align-items-center">
            <div class="col-12">
              <div class="page-title text-center">
                <h2>Products</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="shop_grid_area section-padding-80">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-4 col-lg-3">
              <Categories />
            </div>

            <div class="col-12 col-md-8 col-lg-9">
              <div class="shop_grid_product_area">
                <div class="row">
                  <div class="col-12">
                    <div class="product-topbar d-flex align-items-center justify-content-between">
                      <div class="total-products">
                        <p><span>{count}</span> products found</p>
                      </div>
                      <FormControl >
                        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={sortBy}
                          label="Sort By"
                          onChange={handleChange}
                        >
                          <MenuItem selected value={'p_desc'}>Price Desc.</MenuItem>
                          <MenuItem value={'p_asc'}>Price Asc.</MenuItem>
                          <MenuItem value={'newest'}>Newest</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>

                <ProductCards counter={setCount} />
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
