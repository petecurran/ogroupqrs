import React, { Fragment, useEffect, useRef } from "react";


function MovementContainer(props){

    //Load the battalions from local storage
    const [battalionOne, setBattalionOne] = React.useState(null);
    const [battalionOneLabel, setBattalionOneLabel] = React.useState(null);
    const battalionOneFlag = useRef(false);
    const [battalionTwo, setBattalionTwo] = React.useState(null);
    const [battalionTwoLabel, setBattalionTwoLabel] = React.useState(null);
    const battalionTwoFlag = useRef(false);
    
    //check if we have units saved in local storage
    useEffect(() => {
        //check if battalion one is in local storage
        if (localStorage.getItem("BattalionOne") !== null) {
            setBattalionOne(JSON.parse(localStorage.getItem("BattalionOne")));
            battalionOneFlag.current = true;
        }

        if (localStorage.getItem("BattalionOnebattalionName") !== null) {
            setBattalionOneLabel(JSON.parse(localStorage.getItem("BattalionOnebattalionName")));
        }

        //check if battalion two is in local storage
        if (localStorage.getItem("BattalionTwo") !== null) {
            setBattalionTwo(JSON.parse(localStorage.getItem("BattalionTwo")));
            battalionTwoFlag.current = true;
        }

        if (localStorage.getItem("BattalionTwobattalionName") !== null) {
            setBattalionTwoLabel(JSON.parse(localStorage.getItem("BattalionTwobattalionName")));
        }

    }, []);
    
    return (
        <div>
            <h1>Movement</h1>
            <h1>{battalionOneLabel}</h1>
            {battalionOneFlag.current ? <BattalionMoveDisplay battalion={battalionOne} /> : <p>Select a battalion to see the movement table</p>}
            <h1>{battalionTwoLabel}</h1>
            {battalionTwoFlag.current ? <BattalionMoveDisplay battalion={battalionTwo} /> : <p></p>}

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
                        <th colSpan={3}>Command</th>
                    </tr>
                    <tr>
                        <th>Unit</th>
                        <th>Move</th>
                        <th>Rapid</th>
                    </tr>
                </thead>
                <tbody>
                    {battalion.command.map((commandUnit) => (
                        <Fragment key={commandUnit.unit.name + commandUnit.quality.name}>
                        <tr>
                            <td>{commandUnit.unit.name}</td>
                            <td>{commandUnit.unit.move}</td>
                            <td>{commandUnit.unit.rapidmove}</td>
                        </tr>
                        {commandUnit.unit.specialrules !== "" ?
                        <tr>
                            <td colSpan={3}>Special rules:{commandUnit.unit.specialrules}</td>
                        </tr>
                        : null}
                        </Fragment>
                    ))}
                    <tr>
                        <td colSpan={3}><strong>Rapid move: </strong>Roll 3D6 and use two highest scores. Reroll any ones.</td>    
                    </tr>                    
                </tbody>
                <thead>
                    <tr>
                        <th colSpan={3}>Infantry</th>
                    </tr>
                    <tr>
                        <th>Unit</th>
                        <th>Move</th>
                        <th>Rapid</th>
                    </tr>
                </thead>
                <tbody>
                    {battalion.infantry.map((infantryUnit) => (
                        <Fragment key={infantryUnit.unit.name + infantryUnit.quality.name}>
                        <tr>
                            <td>{infantryUnit.unit.name}</td>
                            <td>{infantryUnit.unit.move}</td>
                            <td>{infantryUnit.unit.rapidmove}</td>
                        </tr>
                        {infantryUnit.unit.specialrules !== "" ?
                        <tr>
                            <td colSpan={3}><strong>Special rules: </strong>{infantryUnit.unit.specialrules}</td>
                        </tr>
                        : null}
                        </Fragment>
                    ))}
                </tbody>
                <thead>
                    <tr>
                        <th colSpan={3}>Armour</th>
                    </tr>
                    <tr>
                        <th>Unit</th>
                        <th>Move</th>
                        <th>Rapid</th>
                    </tr>
                </thead>
                <tbody>
                    {battalion.armour.map((armourUnit) => (
                        <Fragment key={armourUnit.unit.name + armourUnit.quality.name}>
                        <tr>
                            <td>{armourUnit.unit.name}</td>
                            <td>{armourUnit.unit.move}</td>
                            <td>{armourUnit.unit.rapidmove}</td>
                        </tr>
                        {armourUnit.unit.specialrules !== "" ?
                        <tr>
                            <td colSpan={3}><strong>Special rules: </strong>{armourUnit.unit.specialrules}</td>
                        </tr>
                        : null}
                        </Fragment>
                    ))}
                </tbody>
                <thead>
                    <tr>
                        <th colSpan={3}>Guns</th>
                    </tr>
                    <tr>
                        <th>Unit</th>
                        <th>Move</th>
                        <th>Rapid</th>
                    </tr>
                </thead>
                <tbody>
                    {battalion.guns.map((gunUnit) => (
                        <Fragment key={gunUnit.unit.name + gunUnit.quality.name}>
                        <tr>
                            <td>{gunUnit.unit.name}</td>
                            <td>{gunUnit.unit.move}</td>
                            <td>{gunUnit.unit.rapidmove}</td>
                        </tr>
                        {gunUnit.unit.specialrules !== "" ?
                        <tr>
                            <td colSpan={3}><strong>Special rules: </strong>{gunUnit.unit.specialrules}</td>
                        </tr>
                        : null}
                        </Fragment>
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