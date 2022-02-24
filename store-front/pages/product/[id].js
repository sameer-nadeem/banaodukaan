import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import useURL from "../../utils/useURL";


const Product = () => {
  const router = useRouter()
  const url = useURL();
  const [product, setProduct] = useState([]);
  const { id } = router.query
  const getProduct = async () => {

    try {
        const url = useURL()
        const res = await axios.get(`${url}:5000/api/product/${id}`)
        setProduct(res.data.product)
    } catch (err) {
        console.log(err)
    }
}
  useEffect(() => {
    getProduct();
  }, [])

  return (
    <section class="single_product_details_area d-flex align-items-center">

      <div class="single_product_thumb clearfix">
        <img style={{width: '40%', marginLeft: '30%'}} src={`${url + ':5000' + product.image}`} alt="" />
      </div>

      <div class="single_product_desc clearfix">
        <span>{product.brandId !== undefined && product.brandId.name}</span>
        <a href="cart.html">
          <h2>{product !== undefined && product.title}</h2>
        </a>
        <p class="product-price"><span class="old-price">Rs {product !== undefined && product.price}</span> Rs {product.price}</p>
        <p class="product-desc">{product.description !== undefined && product.description.replace(/<[^>]+>/g, '')}</p>

        <form class="cart-form clearfix" method="post">
          <div class="select-box d-flex mt-50 mb-30">
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
          </div>
          <div class="cart-fav-box d-flex align-items-center">
            <button type="submit" name="addtocart" value="5" class="btn essence-btn">Add to cart</button>
            <div class="product-favourite ml-4">
              <a href="#" class="favme fa fa-heart"></a>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Product
