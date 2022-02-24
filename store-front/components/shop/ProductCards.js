import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useURL from "../../utils/useURL";
import { useRouter } from 'next/router'

const ProductCards = () => {
    const [products, setProducts] = useState([]);
    const url = useURL();
    const router = useRouter();
    const handleClick = (e, id) => {
        e.preventDefault()
        router.push({
            pathname: '/product/'+ id,
        })
    }
    const getProducts = async () => {
        try {
            const url = useURL()
            const res = await axios.get(`${url}:5000/api/product`)
            console.log('products, ', res.data.products)
            setProducts(res.data.products)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div class="row">
            {
                products.map((product, index) => {
                    return (
                        <div class="col-12 col-sm-6 col-lg-4">
                            <div class="single-product-wrapper">
                                <div class="product-img">
                                    <img src={`${url + ':5000' + product.image}`} alt="" />
                                    <img class="hover-img" src={product.image} alt="" />

                                    <div class="product-badge offer-badge">
                                        <span>-30%</span>
                                    </div>
                                    <div class="product-favourite">
                                        <a href="#" class="favme fa fa-heart"></a>
                                    </div>
                                </div>

                                <div class="product-description">
                                    <span>topshop</span>
                                    <a onClick={(e) => handleClick(e, product._id)} style={{ cursor: 'pointer' }}>
                                        <h6>{product.title}</h6>
                                    </a>
                                    <p class="product-price"><span class="old-price">Rs.{product.price}</span> Rs.{product.price}</p>

                                    <div class="hover-content">
                                        <div class="add-to-cart-btn">
                                            <a href="#" class="btn essence-btn">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })
            }

            {/* 
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
            </div> */}

        </div>
    )
}

export default ProductCards;
