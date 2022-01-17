import React from 'react'
import { Link } from 'react-router-dom'
import { accounts } from "../urls.json"
const Navbar = () => {
  return (
    <header
      className="header"
      id="header"
      style={{
        display: "flex",
        flex: 1
      }}>
      <div style={{ width: "100%" }}>
        <div className="header_toggle">
          <i className='bx bx-menu' id="header-toggle"></i>
        </div>
        <Link onClick={() => window.location.href = accounts} className='ml-auto float-end'>My Account</Link>
      </div>
    </header >
  )
}

export default Navbar
