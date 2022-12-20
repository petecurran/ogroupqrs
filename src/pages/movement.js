import React, { useEffect, useRef } from "react";


function MovementContainer(props){

    //Load the battalions from local storage
    const [battalionOne, setBattalionOne] = React.useState(null);
    const battalionOneFlag = useRef(false);
    const [battalionTwo, setBattalionTwo] = React.useState(null);
    const battalionTwoFlag = useRef(false);
    
    //check if we have units saved in local storage
    useEffect(() => {
        //check if battalion one is in local storage
        if (localStorage.getItem("BattalionOne") !== null) {
            setBattalionOne(JSON.parse(localStorage.getItem("BattalionOne")));
            battalionOneFlag.current = true;
            console.log(localStorage.getItem("BattalionOne"))
        }

        //check if battalion two is in local storage
        if (localStorage.getItem("BattalionTwo") !== null) {
            setBattalionTwo(JSON.parse(localStorage.getItem("BattalionTwo")));
            battalionTwoFlag.current = true;
        }

    }, []);
    
    return (
        <div>
            <h1>Movement</h1>
            {battalionOneFlag.current ? <BattalionMoveDisplay battalion={battalionOne} /> : <p>Select a battalion to see the movement table</p>}

        </div>
    )  
}

function BattalionMoveDisplay(props){
    const battalion = props.battalion;

    return(
        <div>
           <table className="table">
                <thead>
                    <tr>
                        <th colSpan={2}>Command</th>
                    </tr>
                    <tr>
                        <th>Unit</th>
                        <th>Move</th>
                    </tr>
                </thead>
                <tbody>
                    {battalion.command.map((commandUnit) => (
                        <>
                        <tr>
                            <td>{commandUnit.unit.name}</td>
                            <td>{commandUnit.unit.move}</td>
                        </tr>
                        {commandUnit.unit.specialrules !== "" ?
                        <>
                        <tr>
                            <td colSpan={2}>Special rules:{commandUnit.unit.specialrules}</td>
                        </tr>
                        </>
                        : null}
                        </>
                    ))}                    
                </tbody>
                <thead>
                    <tr>
                        <th colSpan={2}>Infantry</th>
                    </tr>
                    <tr>
                        <th>Unit</th>
                        <th>Move</th>
                    </tr>
                </thead>
                <tbody>
                    {battalion.infantry.map((infantryUnit) => (
                        <>
                        <tr>
                            <td>{infantryUnit.unit.name}</td>
                            <td>{infantryUnit.unit.move}</td>
                        </tr>
                        {infantryUnit.unit.specialrules !== "" ?
                        <>
                        <tr>
                            <td colSpan={2}>Special rules:{infantryUnit.unit.specialrules}</td>
                        </tr>
                        </>
                        : null}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


function UnitMoveDisplay(props){
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Unit</th>
                        <th>Move</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Unit 1</td>
                        <td>Move 1</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Special rules: lots and lots and lots and lots and lots and lots</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )  
}

export default MovementContainer;