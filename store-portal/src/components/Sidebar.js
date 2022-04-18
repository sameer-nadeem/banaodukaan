import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import StorefrontIcon from '@mui/icons-material/Storefront';

const Sidebar = () => {
  const PRODUCT = 0
  const CUSTOMER = 1
  const [active, setActive] = useState(null)
  const [
    productNavigation,
    setProductNavigation
  ] =
    useState({
      allProducts: false,
      inventory: false,
      transfers: false,
      brands: false,
      collections: false
    })
  const [customerNav, setCustomerNav] = useState({ allCustomers: false })
  const resetNavState = () => {
    setProductNavigation({
      allProducts: false,
      inventory: false,
      transfers: false,
      brands: false,
      collections: false
    })
    setCustomerNav({ allCustomers: false })
  }
  const location = useLocation()
  useEffect(() => {
    const path = location.pathname.split('/')[2]
    const subpath = location.pathname.split('/')[3]
    resetNavState()
    switch (path) {
      case "products":
      case "collections":
      case "brands":
        setActive(PRODUCT)
        if (subpath === undefined)
          setProductNavigation(p => ({ allProducts: true }))
        if (path === 'collections')
          setProductNavigation(p => ({ collections: true }))
        if (path === 'brands')
          setProductNavigation(p => ({ brands: true }))
        break;
      case "customers":
        setActive(CUSTOMER)
        setCustomerNav({ allCustomers: true })
        break
      default:
        setActive(null)
        break;
    }
  }, [location.pathname])
  return (
    <div className="l-navbar" id="nav-bar">
      <nav className="nav">
        <div>

          <Link to="/admin/" className="nav_logo">
            <StorefrontIcon style={{ color: 'white' }} />
            <span className="nav_logo-name">Banaodukaan</span>
          </Link>
          <div className="nav_list">
            <Link to="/admin/products" onClick={() => setActive(0)} className={`nav_link ${active === PRODUCT && `highlight`}`}>
              <i className='bx bx-grid-alt nav_icon'></i>
              <span className="nav_name">Products</span>
            </Link>
            <div id="product-dropdown" style={active === PRODUCT ? { display: "block" } : { display: "none" }}>
              <Link to="/admin/products" className={`nav_link ${productNavigation.allProducts && `active`} `}>
                {/* <i className='bx bxs-right-arrow '></i> */}
                <i className='bx bx-chevron-right nav_icon'></i>
                <span className="nav_name">All Products</span>
              </Link>
              <Link to="/admin/inventory" className="nav_link">
                <i className='bx bx-chevron-right nav_icon'></i>
                <span className="nav_name">Inventory</span>
              </Link>
              <Link to="/admin/" className="nav_link">
                <i className='bx bx-chevron-right nav_icon'></i>
                <span className="nav_name">Transfers</span>
              </Link>
              <Link to="/admin/collections" className={`nav_link ${productNavigation.collections && `active`} `}>
                <i className='bx bx-chevron-right nav_icon'></i>
                <span className="nav_name">Collections</span>
              </Link>
              <Link to="/admin/brands" className={`nav_link ${productNavigation.brands && `active`} `}>
                <i className='bx bx-chevron-right nav_icon'></i>
                <span className="nav_name">Brands</span>
              </Link>
            </div>
            <Link to="/admin/customers" className={`nav_link ${customerNav.allCustomers && `highlight`}`}>
              <i className='bx bx-user nav_icon'></i>
              <span className="nav_name">Customers</span>
            </Link> <Link to="/admin/orders" className="nav_link">
              <i className='bx bx-message-square-detail nav_icon'>
              </i>
              <span className="nav_name">Orders</span>
            </Link>
            <Link to="/admin/analytics" className="nav_link">
              <i className='bx bx-bookmark nav_icon'></i>
              <span className="nav_name">Analytics</span>
            </Link>
            {/* <Link to="#" className="nav_link">
              <i className='bx bx-folder nav_icon'></i>
              <span className="nav_name">Discount</span>
            </Link> */}
            <Link to="#" className="nav_link">
              <span className="nav_name highlight">Sales Channel</span>
            </Link>
            <Link to="#" className="nav_link">
              <i className='bx bx-bar-chart-alt-2 nav_icon'></i>
              <span className="nav_name">Online Store</span>
            </Link>
          </div>
        </div>
      </nav >
    </div >
  )
}

export default Sidebar
