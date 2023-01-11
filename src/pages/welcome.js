import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Link} from "react-router-dom";
import sherman from "../assets/Sherman.png";
import logo from '../assets/ogrouplogo.png'

function Welcome(props) {

    const handleClick = (event) => {
        event.preventDefault();
        localStorage.clear();
        toast("Local storage cleared");
    }

  return (
    <div>
        <ToastContainer
                            position="top-center"
                            autoClose={2000}
                            hideProgressBar={true}
                            newestOnTop={true}
                            closeOnClick
                            rtl={false}
                            pauseOnHover
                            theme="colored"
                            className="text-center"
                            limit={3}
                        />
        <div className="container introcard">
            <div className="row">
                <div className="col mx-auto">
                <img src={sherman} alt="Sherman" className="mx-auto d-block battalion-image" style={{height:"200px"}}/>
                {/*<img src={logo} alt="O Group Logo" className="mx-auto d-block battalion-image" style={{marginBottom:"30px"}}/>*/}
                <h5>A quick reference designed to help new players learn <em>'O' Group</em></h5>
                <h5>
                    <ul>
                        <li><Link to="/selectunits"> Select units</Link></li>
                        <li>See their <Link to="/shooting">shooting</Link> stats</li>
                        <li>See their <Link to="/movement">movement</Link> stats</li>
                    </ul>
                </h5>

                <p style={{marginBottom:"0px"}}><small>This is an open source project. You can contribute on <a href="https://github.com/petecurran/ogroupqrs" target="_blank">github</a>.</small></p>
                <p><small>Units selected are stored in your browser's local storage. Should you ever need to do so you can <a href="#" onClick={handleClick}>clear local storage</a> to reset the app.</small></p>
                
                </div>
            </div>
        </div>
    </div>
  );
}

export default Welcome;