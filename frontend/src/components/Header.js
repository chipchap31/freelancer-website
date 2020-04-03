import React from 'react';
import { Link } from 'react-router-dom';

function Header(){
    return (
        <>
        <aside className='bg-grey'>
            <div className='container d-flex justify-content-end text-underline '>
            <Link className='text-small text-underline text-white' to='/login'>client login</Link>
            </div>
        </aside>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className='container'>
            <Link className="navbar-brand" to='/'>Navbar</Link>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to='/'>Home</Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to='/'>Home</Link>
                  </li>
                
               
                </ul>
                <Link className="btn btn-primary" to='/hire-me'>Hire me</Link>
        
            </div>
            </div>
            
            </nav>
            </>
    )
}

export default Header;