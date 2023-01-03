import UnitSelection from "./unitselection";
import brit from "../assets/britcommand.png";
import german from "../assets/germancommand.png";

function Setup(props){

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="imagePlaceholder">
                        <img src={brit} alt="batallion A command" className="mx-auto d-block battalion-image"/>
                    </div>
                    <UnitSelection order={"BattalionOne"}/>
                </div>
                <div className="col-md-6">
                    <div className="imagePlaceholder">
                        <img src={german} alt="batallion A command" className="mx-auto d-block battalion-image"/>
                    </div>
                    <UnitSelection order={"BattalionTwo"}/>
                </div>
            </div>
        </div>
    );
}

export default Setup;
