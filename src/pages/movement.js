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
            <h4>Movement - {battalionOneLabel}</h4>
            //put some general moves here
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
            <div className="accordion" id="movementaccordion">
                <div className="accordion-item">
                    <h4 className="accordion-header" id="movementheadingone">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#movementcollapseone" aria-expanded="false" aria-controls="movementcollapseone">
                            Command
                        </button>
                    </h4>
                    <div id="movementcollapseone" className="accordion-collapse collapse" aria-labelledby="movementheadingone" data-bs-parent="#movementaccordion">
                        <div className="accordion-body p-0">
                        <table className="table">
                            <thead>
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
                            </tbody>
                         </table>
                         </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h4 className="accordion-header" id="movementheadingtwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#movementcollapsetwo" aria-expanded="false" aria-controls="movementcollapsetwo">
                            Infantry
                        </button>
                    </h4>
                        <div id="movementcollapsetwo" className="accordion-collapse collapse" aria-labelledby="movementheadingtwo" data-bs-parent="#movementaccordion">
                            <table className="table">
                                <thead>
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
                            </table>
                        </div>
                </div>
                <div className="accordion-item">
                    <h4 className="accordion-header" id="movementheadingthree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#movementcollapsethree" aria-expanded="false" aria-controls="movementcollapsethree">
                            Armour
                        </button>
                    </h4>
                    <div id="movementcollapsethree" className="accordion-collapse collapse" aria-labelledby="movementheadingthree" data-bs-parent="#movementaccordion">
                        <table className="table">
                            <thead>
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
                        </table>
                    </div>
                </div>
                <div className="accordion-item">
                    <h4 className="accordion-header" id="movementheadingfour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#movementcollapsefour" aria-expanded="false" aria-controls="movementcollapsefour">
                            Guns
                        </button>
                    </h4>
                    <div id="movementcollapsefour" className="accordion-collapse collapse" aria-labelledby="movementheadingfour" data-bs-parent="#movementaccordion">
                        <table className="table">
                            <thead>
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
                </div>
            </div>
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