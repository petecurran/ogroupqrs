import UnitSelection from "./unitselection";

function Setup(props){

    return(
        <div className="container-sm p-0">
            <div className="row">
                <div className="col-md-6">
                    <UnitSelection order={"BattalionOne"}/>
                </div>
                <div className="col-md-6">
                    <UnitSelection order={"BattalionTwo"}/>
                </div>
            </div>
        </div>
    );
}

export default Setup;
