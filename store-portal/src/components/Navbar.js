import React from 'react'
import { Link } from 'react-router-dom'
import { accounts } from "../urls.json"
import { useSelector } from "react-redux";
const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <header
      className="header"
      id="header"
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: '#345DA7'
      }}>
      <div style={{ width: "100%" }}>
        <div className="header_toggle">
          <i className='bx bx-menu' id="header-toggle"></i>
        </div>
        <Link to="" onClick={() => window.location.href = accounts} className='ml-auto float-end' 
          style = {{color: 'white', fontWeight: '700'}}>
            {user?.firstName + ' ' + user?.lastName}</Link>
      </div>
    </header >
  )
}

export default Navbar
