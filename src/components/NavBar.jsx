import React from 'react'
import { Link, Outlet, } from 'react-router-dom';


function NavBar() {
    return (
        <>

        <div className="navbar">
            <div className="left-nav">
                <h1>Sales Dashboard</h1>
            </div>
            <div className="right-nav">
                <div className="todays-sales">
                    <Link to="/" style={{ textDecoration: 'none', color:'black'}}> Dash1</Link>
                </div>
                <div className="sales-compare">
                    <Link to="/comparison" style={{ textDecoration: 'none', color:'black' }}>Dash2</Link>
                </div>
            </div>
        </div>
        <Outlet/>
        </>
        
    )
}

export default NavBar
