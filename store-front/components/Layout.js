import Head from 'next/head'
import Cart from './Cart'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { loadUser } from '../actions/auth'
// import setAuthToken from '../utils/setAuthToken';
// if (typeof window !== 'undefined') {
//   if (localStorage.customerToken)
//     setAuthToken();
// }
import Navbar from './Navbar'
// import Links from './Links'


export default function Layout({ children }) {
  // const dispatch = useDispatch()
  // const token = useSelector(state => state.auth.token)
  // console.log("token", token)
  // useEffect(() => {
  //   dispatch(loadUser())
  // }, [])

  // useEffect(() => {
  //   setAuthToken()
  // }, [token])

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="description" content="" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Essence - Fashion Ecommerce Template</title>


      </Head>
      <link rel="icon" href="img/core-img/favicon.ico" />
      <link rel="stylesheet" href="/css/core-style.css" />
      <link rel="stylesheet" href="/css/style.css" />
      <Navbar />

      <main>
        <Cart />
        {
          children
        }
      </main>
      <footer className="footer_area clearfix">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="single_widget_area d-flex mb-30">
                <div className="footer-logo mr-50">
                  <a href="#"><img src="/img/core-img/logo2.png" alt="" /></a>
                </div>
                <div className="footer_menu">
                  <ul>
                    <li><a href="shop.html">Shop</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="contact.html">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="single_widget_area mb-30">
                <ul className="footer_widget_menu">
                  <li><a href="#">Order Status</a></li>
                  <li><a href="#">Payment Options</a></li>
                  <li><a href="#">Shipping and Delivery</a></li>
                  <li><a href="#">Guides</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Use</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row align-items-end">
            <div className="col-12 col-md-6">
              <div className="single_widget_area">
                <div className="footer_heading mb-30">
                  <h6>Subscribe</h6>
                </div>
                <div className="subscribtion_form">
                  <form action="#" method="post">
                    <input type="email" name="mail" className="mail" placeholder="Your email here" />
                    <button type="submit" className="submit"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="single_widget_area">
                <div className="footer_social_area">
                  <a href="#" data-toggle="tooltip" data-placement="top" title="Facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href="#" data-toggle="tooltip" data-placement="top" title="Instagram"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                  <a href="#" data-toggle="tooltip" data-placement="top" title="Twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="#" data-toggle="tooltip" data-placement="top" title="Pinterest"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                  <a href="#" data-toggle="tooltip" data-placement="top" title="Youtube"><i className="fa fa-youtube-play" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-12 text-center">
              <p>
                Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
              </p>
            </div>
          </div>

        </div>
      </footer>

      <script src="/js/jquery/jquery-2.2.4.min.js"></script>
      <script src="/js/popper.min.js"></script>
      <script src="/js/bootstrap.min.js"></script>
      <script src="/js/plugins.js"></script>
      <script src="/js/classy-nav.min.js"></script>
      <script src="/js/active.js"></script>

    </>
  )
}

