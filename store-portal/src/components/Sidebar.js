import React from 'react'

const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="/" className="brand-link">
        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
        <span className="brand-text font-weight-light">Store Name</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="https://avatars.githubusercontent.com/u/73606371?s=400&u=076780db136b05617c6f04bb3477fdcff8d6f0b8&v=4" className="img-circle elevation-2" alt="User Image" />
          </div>
          <div className="info">
            <a href="/" className="d-block">Ahmed Ateeq</a>
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
              <a href="/products" className="nav-link">
                <i className="nav-icon fas fa-edit" />
                <p>
                  Products
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/products" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>All Products</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Inventory</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Transfers</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/collections" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Collections</p>
                  </a>
                </li>
              </ul>
            </li>


            {/* now for orders */}
            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-edit" />
                <p>
                  Orders
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>All Orders</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Drafts</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Abandoned Checkouts</p>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="nav-icon far fa-image" />
                <p>
                  Customers
                </p>
              </a>
            </li>

            
            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-chart-pie" />
                <p>
                  Analytics
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Dashboard</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Reports</p>
                  </a>
                </li>
              </ul>
            </li>


            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="nav-icon far fa-image" />
                <p>
                  Discounts
                </p>
              </a>
            </li>


           
            <li className="nav-header">Sales Channel</li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-table" />
                <p>
                  Online Store
                </p>
              </a>
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
