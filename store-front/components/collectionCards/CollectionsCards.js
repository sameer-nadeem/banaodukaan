import React, { useEffect, useState } from 'react'

import axios from 'axios'
import useURL from "../../utils/useURL";

const CollectionsCards = () => {
    const [collections, setCollections] = useState([])
    const getCollections = async () => {
        try {
            const url = useURL()
            const res = await axios.get(`${url}:5000/api/collection`)
            console.log(res.data.collections)
            setCollections(res.data.collections)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getCollections()
    }, [])


    return (
        <div className="top_catagory_area section-padding-80 clearfix">
            <div className="container">
                <div className="row justify-content-center">
                    {
                        collections.map((collection, index) => {
                            return (
                                <div className="col-12 col-sm-6 col-md-4">
                                    <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img" style={{ backgroundImage: "url(img/bg-img/bg-2.jpg)" }}>
                                        <div className="catagory-content">
                                            <a href="#">{collection.name}</a>
                                        </div>
                                    </div>
                                </div>
                            )

                        })
                    }
                </div>
            </div>
        </div>

    )
}
export default CollectionsCards;