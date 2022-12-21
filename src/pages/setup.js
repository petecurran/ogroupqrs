import UnitSelection from "./unitselection";

function Setup(props){

    return(
        <div>
            <UnitSelection order={"BattalionOne"}/>
            <UnitSelection order={"BattalionTwo"}/>
        </div>
    );
}

export default Setup;
