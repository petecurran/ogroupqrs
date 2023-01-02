import React from 'react';
import britmortar from '../assets/britmortar.png';

const NotSelected = (props) => {
  return (
    <div className="container notselectedcontainer">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <img src={britmortar} alt="british mortar" className="mx-auto d-block battalion-image"/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1>Select units to see the {props.type} table here.</h1>
        </div>
      </div>
    </div>
  );
};

export default NotSelected;