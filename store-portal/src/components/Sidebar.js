import React from 'react'
import { Link, useHistory } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link to = "/" >
        <div className="brand-link">
          
          <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">Store Name</span>
        </div>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="https://avatars.githubusercontent.com/u/73606371?s=400&u=076780db136b05617c6f04bb3477fdcff8d6f0b8&v=4" className="img-circle elevation-2" alt="User Image" />
          </div>
          <div className="info">
            <Link to = "/" >
              <div className="d-block">Ahmed Ateeq</div>
            </Link>
          </div>
        </div>
        {/* SidebarSearch Form */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
            <li className="nav-item">
              <div className="nav-link">                
                <i className="nav-icon fas fa-edit" />
                <p>
                  Products
                  <i className="fas fa-angle-left right" />
                </p>
              </div>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to = "/products" >
                      <i className="far fa-circle nav-icon" />
                      <p>All Products</p>
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to = "/">
                      <i className="far fa-circle nav-icon" />
                      <p>Inventory</p>
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to = "/">
                      <i className="far fa-circle nav-icon" />
                      <p>Transfers</p>
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to = "/collections">
                      <i className="far fa-circle nav-icon" />
                      <p>Collections</p>
                    </Link>
                  </div>
                </li>
              </ul>
            </li>


            {/* now for orders */}
            <li className="nav-item">
              <div className="nav-link">
                
                  <i className="nav-icon fas fa-edit" />
                  <p>
                    Orders
                    <i className="fas fa-angle-left right" />
                  </p>
                
              </div>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to = "/">
                      <i className="far fa-circle nav-icon" />
                      <p>All Orders</p>
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to = "/">
                      <i className="far fa-circle nav-icon" />
                      <p>Drafts</p>
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to = "/">
                      <i className="far fa-circle nav-icon" />
                      <p>Abandoned Checkouts</p>
                    </Link>
                  </div>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <div className="nav-link">
                <Link to = "/">
                  <i className="nav-icon far fa-image" />
                  <p>
                    Customers
                  </p>
                </Link>
              </div>
            </li>

            
            <li className="nav-item">
              <div className="nav-link">
                  <i className="nav-icon fas fa-chart-pie" />
                  <p>
                    Analytics
                    <i className="right fas fa-angle-left" />
                  </p>
              </div>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to = "/">
                      <i className="far fa-circle nav-icon" />
                      <p>Dashboard</p>
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to = "/">
                      <i className="far fa-circle nav-icon" />
                      <p>Reports</p>
                    </Link>
                  </div>
                </li>
              </ul>
            </li>


            <li className="nav-item">
              <div className="nav-link">
                <Link to = "/">
                  <i className="nav-icon far fa-image" />
                  <p>
                    Discounts
                  </p>
                </Link>
              </div>
            </li>


           
            <li className="nav-header">Sales Channel</li>
            <li className="nav-item">
              <div className="nav-link">
                <Link to = "/">
                  <i className="nav-icon fas fa-table" />
                  <p>
                    Online Store
                  </p>
                </Link>
              </div>
            </li>
            
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>

  )
}

export default Sidebar
