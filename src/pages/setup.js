import UnitSelection from "./unitselection";

function Setup(props){

    return(
        <div>
            <h1>Attacker</h1>
            <UnitSelection order={"BattalionOne"}/>
            <h1>Defender</h1>
            <UnitSelection order={"BattalionTwo"}/>
        </div>
    );
}

export default Setup;
