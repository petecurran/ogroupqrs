import React, { Fragment, useEffect, useRef } from "react";
import carrier from '../assets/carrier.png';
import panzer from '../assets/panzerIV.png';


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
        <div className="container-sm">
            <div className="row">
                <div className="col-md-6"> 
                    <img src={carrier} alt="battalion A carrier" className="mx-auto d-block battalion-image"/>
                    <div className="bg-light shadow">
                    {battalionOneFlag.current ?
                    <>
                    <h4 className="Amovementheader">Movement - {battalionOneLabel}</h4>
                    <ul>
                    <li><strong>Standard move:</strong> choose tactical bound and roll 2D6.</li>
                    <li><strong>Rapid move:</strong> Roll 3D6 and use two highest scores. Reroll any 1s.</li>
                    <li><strong>Suppressed units</strong> may not move.</li>
                    <li><strong>Hesitant units</strong> ay not move closer to enemy in LOS.</li>
                    </ul>
                    
                    <BattalionMoveDisplay battalion={battalionOne} idprefix="A" /> 
                    </>
                    : <p>Select a battalion to see the movement table</p>}
                    </div>
                </div>
                <div className="col-md-6">
                    <img src={panzer} alt="battalion B panzer" className="mx-auto d-block battalion-image"/>
                    <div className="bg-light shadow">
                        {battalionTwoFlag.current ? 
                        <>
                        <h4 className="Bmovementheader">Movement - {battalionTwoLabel}</h4>
                        <ul>
                            <li><strong>Standard move:</strong> choose tactical bound and roll 2D6.</li>
                            <li><strong>Rapid move:</strong> Roll 3D6 and use two highest scores. Reroll any 1s.</li>
                            <li><strong>Suppressed units</strong> may not move.</li>
                            <li><strong>Hesitant units</strong> ay not move closer to enemy in LOS.</li>
                        </ul>
                        <BattalionMoveDisplay battalion={battalionTwo} idprefix="B"/> 
                        </>
                        : <p></p>}
                    </div>
                </div>
            </div>
        </div>
    )  
}

function BattalionMoveDisplay(props){
    const battalion = props.battalion;
    const idprefix = props.idprefix;

    return(
        <div>
            <div className="accordion accordion-flush" id={idprefix+"movementaccordion"}>
                
                <div className="accordion-item">
                    <h4 className="accordion-header" id={idprefix+"movementheadingone"}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#"+idprefix+"movementcollapseone"} aria-expanded="false" aria-controls={idprefix+"movementcollapseone"}>
                            Command
                        </button>
                    </h4>
                    <div id={idprefix+"movementcollapseone"} className="accordion-collapse collapse" aria-labelledby={idprefix+"movementheadingone"} data-bs-parent={"#"+idprefix+"movementaccordion"}>
                        <div className="accordion-body p-0">
                        <table className="table">
                            <thead className="text-light">
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
                                        <td className="text-center">{commandUnit.unit.rapidmove}</td>
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
                    <h4 className="accordion-header" id={idprefix+"movementheadingtwo"}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#"+idprefix+"movementcollapsetwo"} aria-expanded="false" aria-controls={idprefix+"movementcollapsetwo"}>
                            Infantry
                        </button>
                    </h4>
                        <div id={idprefix+"movementcollapsetwo"} className="accordion-collapse collapse" aria-labelledby={idprefix+"movementheadingtwo"} data-bs-parent={"#"+idprefix+"movementaccordion"}>
                            <table className="table">
                                <thead className="text-light">
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
                    <h4 className="accordion-header" id={idprefix+"movementheadingthree"}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#"+idprefix+"movementcollapsethree"} aria-expanded="false" aria-controls={idprefix+"movementcollapsethree"}>
                            Armour
                        </button>
                    </h4>
                    <div id={idprefix+"movementcollapsethree"} className="accordion-collapse collapse" aria-labelledby={idprefix+"movementheadingthree"} data-bs-parent={"#"+idprefix+"movementaccordion"}>
                        <table className="table">
                            <thead className="text-light">
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
                    <h4 className="accordion-header" id={idprefix+"movementheadingfour"}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#"+idprefix+"movementcollapsefour"} aria-expanded="false" aria-controls={idprefix+"movementcollapsefour"}>
                            Guns
                        </button>
                    </h4>
                    <div id={idprefix+"movementcollapsefour"} className="accordion-collapse collapse" aria-labelledby={idprefix+"movementheadingfour"} data-bs-parent={"#"+idprefix+"movementaccordion"}>
                        <table className="table">
                            <thead className="text-light">
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

export default MovementContainer;