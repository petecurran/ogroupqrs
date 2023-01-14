import React, { Fragment, useEffect, useRef, useState } from "react";
import NotSelected from '../components/notselected';
import carrier from '../assets/carrier.png';
import panzer from '../assets/panzerIV.png';


function MovementContainer(props){

    //Load the battalions from local storage
    const [battalionOne, setBattalionOne] = useState(null);
    const [battalionOneLabel, setBattalionOneLabel] = useState(null);
    const battalionOneFlag = useRef(false);
    const [battalionTwo, setBattalionTwo] = useState(null);
    const [battalionTwoLabel, setBattalionTwoLabel] = useState(null);
    const battalionTwoFlag = useRef(false);
    const [loaded, setLoaded] = useState(false);
    
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

        setLoaded(true);

    }, []);
    
    return (
        <div className="container-sm">
            <div className="row">
                <DisplayLoader 
                loaded={loaded} 
                battalionOneFlag={battalionOneFlag.current} 
                battalionTwoFlag={battalionTwoFlag.current} 
                battalionOne={battalionOne} 
                battalionTwo={battalionTwo}
                battalionOneLabel={battalionOneLabel}
                battalionTwoLabel={battalionTwoLabel}                
                />                
            </div>
        </div>
    )  
}

function DisplayLoader (props){
    if (props.loaded != true) {
        return (<></>)
    } else if (props.battalionOneFlag === true) {
        return (
            <>
            <div className="col-md-6">
                <div className="imagePlaceholder">
                    <img src={carrier} alt="battalion A carrier" className="mx-auto d-block battalion-image" />
                </div>
                <div className="shadow">
                    <BattalionMoveDisplay battalion={props.battalionOne} label={props.battalionOneLabel} idprefix="A" />
                </div>
            </div>
            {props.battalionTwoFlag ?
            <div className="col-md-6">
                <div className="imagePlaceholder">
                <img src={panzer} alt="battalion B panzer" className="mx-auto d-block battalion-image" />
                </div>
                <div className="shadow">
                    <BattalionMoveDisplay battalion={props.battalionTwo} label={props.battalionTwoLabel} idprefix="B" />
                </div>
            </div>
            : <></>}
            </>
        )


    } else {
        return(
            <NotSelected type="movement"/>
        )
    }

}

function BattalionMoveDisplay(props){
    const battalion = props.battalion;
    const idprefix = props.idprefix;
    const label = props.label;

    return(
        <div>
            <h4 className={idprefix +"movementheader"}>Movement - {label}</h4>
                    <ul className="movementintro">
                    <li><strong>Standard move:</strong> choose tactical bound and roll 2D6.</li>
                    <li><strong>Rapid move:</strong> Roll 3D6 and use two highest scores. Reroll any 1s.</li>
                    <li><strong>Suppressed units</strong> may not move.</li>
                    <li><strong>Hesitant units</strong> may not move closer to enemy in LOS.</li>
                    </ul>
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

                {battalion.armour.length > 0 ?

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

                : null}

                {battalion.guns.length > 0 ?

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

                : null}
            </div>
        </div>
    )
}

export default MovementContainer;