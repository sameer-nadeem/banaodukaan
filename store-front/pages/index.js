import Head from 'next/head'
import axios from "axios";
import BrandStrip from '../components/BrandStrip'
import CollectionsCards from '../components/collectionCards/CollectionsCards'
import useURL from "../utils/useURL";
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [storeInfo, setStoreInfo] = useState([])
  const [img, setImg] = useState('')
  const getStore = async () => {
    try {
      const url = useURL();
      const res = await axios.get(`${url}/api/auth/storeinfo`);
      setStoreInfo(res.data.store)
      const img_url = `${url + res.data.store.cover}`
      img_url = img_url.replace(/\\+\b/g, '/')
      setImg(img_url)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getStore();
  }, []);
  return (
    <>
      <section className="welcome_area bg-img background-overlay" style={{ backgroundImage: img === "" ? "url(img/bg-img/bg-1.jpg)" : `url(${img})`}}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="hero-content">
                <h6>Zara</h6>
                <h2>BanaoDukaan</h2>
                <a href="/products" className="btn essence-btn">view products</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CollectionsCards />

      {/* <div className="top_catagory_area section-padding-80 clearfix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 col-md-4">
              <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img" style={{ backgroundImage: "url(img/bg-img/bg-2.jpg)" }}>
                <div className="catagory-content">
                  <a href="#">Clothing</a>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img" style={{ backgroundImage: "url(img/bg-img/bg-3.jpg)" }}>
                <div className="catagory-content">
                  <a href="#">Shoes</a>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img" style={{ backgroundImage: "url(img/bg-img/bg-4.jpg)" }}>
                <div className="catagory-content">
                  <a href="#">Accessories</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
{/* 
      <div className="cta-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cta-content bg-img background-overlay" style={{ backgroundImage: "url(img/bg-img/bg-5.jpg)" }}>
                <div className="h-100 d-flex align-items-center justify-content-end">
                  <div className="cta--text">
                    <h6>-60%</h6>
                    <h2>Global Sale</h2>
                    <a href="#" className="btn essence-btn">Buy Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="new_arrivals_area section-padding-80 clearfix">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading text-center">
                <h2>Popular Products</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
            </div>
          </div>
        </div>
      </section> */}

      <BrandStrip />
    </>
  )
}
