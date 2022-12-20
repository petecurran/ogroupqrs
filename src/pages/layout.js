import {Outlet, Link} from "react-router-dom"
import { useEffect } from "react";

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
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">O Group</Link>
                    <button 
                        className="navbar-toggler" type="button" 
                        data-bs-toggle="collapse" data-bs-target="#mainNav" 
                        aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mainNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Select units</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/shooting" className="nav-link">Shooting</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/movement" className="nav-link">Movement</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
};

export default Layout;