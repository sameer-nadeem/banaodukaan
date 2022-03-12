import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import useURL from "../../utils/useURL";

const CollectionsCards = () => {
    const [collections, setCollections] = useState([])
    const url = useURL()
    const router = useRouter();
    const handleClick = (e, id) => {
        e.preventDefault()
        router.push({
            pathname: '/collection/' + id,
        })
    }
    const getCollections = async () => {
        try {
            const url = useURL()
            const res = await axios.get(`${url}/api/collection`)
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
                            const img_url = `${url + ':5000' + collection.image}`
                            img_url = img_url.replace(/\\+\b/g, '/')
                            return (
                                <div className="col-12 col-sm-6 col-md-4">
                                    <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img" style={{ backgroundImage: `url(${img_url})` }}>
                                        <div className="catagory-content">
                                            <a onClick={(e) => handleClick(e, collection._id)} style={{ cursor: 'pointer' }}>
                                                {collection.name}
                                            </a>
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
