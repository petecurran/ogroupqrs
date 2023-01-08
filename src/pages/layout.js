import {Outlet, Link} from "react-router-dom"
import { useEffect, Suspense } from "react";
import logo from '../assets/ogrouplogo.png'
import Footer from '../components/footer.js'

function Layout(){

    useEffect(() => {
        // Get the navbar element
        const navbar = document.querySelector('.navbar-collapse');
    
        // Add click listener to navbar links
        document.querySelectorAll('.navbar-nav a').forEach(link => {
          link.addEventListener('click', () => {
            // Hide the navbar when a link is clicked
            navbar.classList.remove('show');
          });
        });
      }, []);

    return (
        <div className="page-container">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"><img src={logo} style={{width:120 +'px'}} alt="ogrouplogo"/></Link>
                    <button 
                        className="navbar-toggler" type="button" 
                        data-bs-toggle="collapse" data-bs-target="#mainNav" 
                        aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mainNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/selectunits" className="nav-link">Select units</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/movement" className="nav-link">Movement</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/shooting" className="nav-link">Shooting</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="content-container">
                <Suspense fallback={<div></div>}>
                <Outlet />
                </Suspense>
            </div>
            <Footer/>
        </div>
    )
};

export default Layout;