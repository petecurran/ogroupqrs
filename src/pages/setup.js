import UnitSelection from "./unitselection";
import tiger from "../assets/tigerplaceholder.png";
import tetrarch from "../assets/tetrarchplaceholder.png";

function Setup(props){

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={tiger} alt="tiger" className="mx-auto d-block battalion-image"/>
                    <UnitSelection order={"BattalionOne"}/>
                </div>
                <div className="col-md-6">
                    <img src={tetrarch} alt="tetrarch" className="mx-auto d-block battalion-image"/>
                    <UnitSelection order={"BattalionTwo"}/>
                </div>
            </div>
        </div>
    );
}

export default Setup;
