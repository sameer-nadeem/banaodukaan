import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import useURL from "../../utils/useURL";
import ProductCards from '../../components/shop/ProductCards';


const Collection = () => {
    const router = useRouter()
    const url = useURL();
    const [product, setProduct] = useState([]);
    const { id } = router.query
    const getProduct = async () => {

        try {
            const url = useURL()
            const res = await axios.get(`${url}:5000/api/product`)
            const FilteredProducts = res.data.products.filter(product => product.collectionId._id === id)
            setProduct(FilteredProducts)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getProduct();
    }, [])

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
                            {/* <Categories /> */}
                        </div>

                        <div class="col-12 col-md-8 col-lg-9">
                            <div class="shop_grid_product_area">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="product-topbar d-flex align-items-center justify-content-between">
                                            <div class="total-products">
                                                <p><span>10</span> products found</p>
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

                                <ProductCards collectionProducts={product} />
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

export default Collection
