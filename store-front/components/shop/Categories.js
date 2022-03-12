import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useURL from "../../utils/useURL";

const Categories = () => {
    const [collections, setCollections] = useState([]);
    const [brands, setBrands] = useState([])

    const getCollections = async () => {
        try {
            const url = useURL()
            const res = await axios.get(`${url}/api/collection`)
            console.log(res.data.collections)
            setCollections(res.data.collections)
        } catch (err) {
            console.log(err)
        }
    }

    const getBrands = async () => {
        try {
            const url = useURL()
            const res = await axios.get(`${url}/api/brand`)
            console.log("brands here", res.data.brands)
            setBrands(res.data.brands)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getCollections();
        getBrands();
    }, [])

    return (
        <div class="shop_sidebar_area">

            <div class="widget catagory mb-50">
                <h6 class="widget-title mb-30">Collections</h6>

                <div class="catagories-menu">
                    <ul id="menu-content2" class="menu-content collapse show">
                        {
                            collections.map((collection, index) => {
                                return (
                                    <div>
                                        <li data-toggle="collapse" data-target="#clothing">
                                            <a href="#">{collection.name}</a>
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
                                    </div>
                                )

                            })
                        }
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

            <div class="widget brands mb-50">
                <p class="widget-title2 mb-30">Brands</p>
                <div class="widget-desc">
                    <ul>
                        {
                            brands.map((brand, index) => {
                                return (
                                    <div>
                                        <li><a href="#">{brand.name}</a></li>
                                    </div>
                                )
                            })
                        }
                    </ul>



                </div>
            </div>
        </div>
    )
}

export default Categories;
