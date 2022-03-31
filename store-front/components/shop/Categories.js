import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useURL from "../../utils/useURL";
import { useSelector, useDispatch } from 'react-redux'
import { setCollectionFltr, setBrandFltr, setPlowerFltr, setPupperFltr, clearFilters } from '../../actions/filter'
const Categories = () => {
    const [collections, setCollections] = useState([]);
    const [brands, setBrands] = useState([])
    const filters = useSelector(state => state.filters)
    const dispatch = useDispatch()
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
                <button onClick={() => dispatch(clearFilters())} className='btn btn-link'><h4 className='widget-title mb-30'>Clear</h4></button>
                <h6 class="widget-title2 mb-30">Collections</h6>

                <div class="catagories-menu">
                    <ul id="menu-content2" class="menu-content collapse show">
                        <div>
                            <ul >
                                {
                                    collections.map((collection, index) => {
                                        return (
                                            <div>
                                                <li >
                                                    <button type="button" className='btn btn-link' onClick={
                                                        () => dispatch(setCollectionFltr(collection._id))
                                                    }>
                                                        {collection.name}
                                                    </button>
                                                </li>
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </ul>
                </div >
            </div >

            {/* <div class="widget price mb-50">
                <p class="widget-title2 mb-30">Price range</p>

                <div class="widget-desc">
                    <div className='row'>
                        <div className='col-6'>
                            <input className='form-control' onChange={(e) => dispatch(setPlowerFltr(parseFloat(e.target.value)))} value={filters.priceLower} type='number'></input>
                        </div>

                        <div className='col-6'>
                            <input className='form-control' onChange={(e) => dispatch(setPupperFltr(parseFloat(e.target.value)))} value={filters.priceUpper} type={'number'}></input>
                        </div>
                    </div>
                </div>
            </div> */}

            <div class="widget brands mb-50">
                <p class="widget-title2 mb-30">Brands</p>
                <div class="widget-desc">
                    <ul>
                        {
                            brands.map((brand, index) => {
                                return (
                                    <div>
                                        <li><button type='button' className="btn btn-link" onClick={() => dispatch(setBrandFltr(brand._id))}>{brand.name}</button></li>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Categories;
