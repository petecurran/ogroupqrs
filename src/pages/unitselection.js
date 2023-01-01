import { useState, useEffect, useRef, Suspense, Fragment } from 'react';

import quality from '../data/quality.json';

//import the battalions available
import british from '../data/britishcore.json';
import german from '../data/germancore.json';

function UnitSelection (props){

    //list of available battalions
    const battalionsAvailable = useRef(["British", "German"])
    //placeholder for json data
    const units = useRef(null);
    //Flag to check whether the battalion has been selected
    const [battalionFlag, setBattalionFlag] = useState(false);

    //Flag to check whether the battalion has been loaded
    const [battalionLoaded, setBattalionLoaded] = useState(false);
    
    //allows a different default battalion for each instance
    const displayBattalion = useRef(null)
    
    if (props.order === "BattalionOne") {
        displayBattalion.current = battalionsAvailable.current[0];
    } else {
        displayBattalion.current = battalionsAvailable.current[1];
    };

    //state to hold the chosen battalion. Default to the first battalion in the list
    const [chosenBattalion, setChosenBattalion] = useState(null);

    //holds the units for the battalion
    const [selectedCommand, setSelectedCommand] = useState([]);
    const [selectedInfantry, setSelectedInfantry] = useState([]);
    const [selectedArmour, setSelectedArmour] = useState([]);
    const [selectedGuns, setSelectedGuns] = useState([]);

    //update local storage when the selected units change
    useEffect(() => {
        
        //only update local storage if the battalion has been selected
        if (battalionFlag) {
            //update the local storage
            //Store the battalion type in local storage
            localStorage.setItem(props.order + "battalionName", JSON.stringify(chosenBattalion));
            //Store the battalion in local storage
            localStorage.setItem(props.order, JSON.stringify({command: selectedCommand, infantry: selectedInfantry, armour: selectedArmour, guns: selectedGuns}));
        }
    }, [selectedCommand, selectedInfantry, selectedArmour, selectedGuns, props.order]);

    //check if there is a battalion in local storage
    useEffect(() => {
        //check if there is a battalion in local storage
        if (localStorage.getItem(props.order) !== null) {
            
            if (localStorage.getItem(props.order + "battalionName") !== null) {
                //get the battalion name from local storage
                let battalionName = JSON.parse(localStorage.getItem(props.order + "battalionName"));
                //set the chosen battalion
                setChosenBattalion(battalionName);
                
                if (battalionName === "British") {
                    units.current = british;
                } else if (battalionName === "German") {
                    units.current = german;
                }

            }
            
            //get the battalion from local storage
            let battalion = JSON.parse(localStorage.getItem(props.order));

            //set the selected units
            setSelectedCommand(battalion.command);
            setSelectedInfantry(battalion.infantry);
            setSelectedArmour(battalion.armour);
            setSelectedGuns(battalion.guns);

            //flag that we've loaded the battalion
            setBattalionLoaded(true);

        }
    }, [props.order]);

    //check if the battalion has been loaded
    useEffect(() => {
        //check if the battalion has been loaded
        if (battalionLoaded) {
            //flag that the battalion has been selected
            setBattalionFlag(true);
        }
    }, [battalionLoaded]);

    const clearBattalion = () => {
        localStorage.removeItem(props.order+"battalionName");
        localStorage.removeItem(props.order);
        setChosenBattalion(null);
        setBattalionFlag(false);
    }

    //function to handle the battalion select
    const handleBattalionSelect = (event) => {
        //get the selected battalion
        setChosenBattalion(event.target.value);
    }

    //Add the default units to the battalion
    const addDefaultUnits = () => {
        //temp array to hold the units
        let tempUnits = [];        
        
        //load the infantry units
        //look through all of the infantry units in units prop
        units.current.infantry.forEach((infantryUnit) => {
            //if default is true, add the unit to the selectedInfantry state
            if (infantryUnit.default === "true") {
                //add the unit to the temp array
                tempUnits.push({unit: infantryUnit, quality: quality.qualities[0]});
            }
        })
        //add the temp array to the selectedInfantry state
        setSelectedInfantry(tempUnits);

        //reset the temp array
        tempUnits = [];        

        //Load the command units
        //look through all of the command units in units.json
        units.current.command.forEach((commandUnit) => {
            //if default is true, add the unit to the selectedCommand state
            if (commandUnit.default === "true") {
                //add the unit to the temp array
                tempUnits.push({unit: commandUnit, quality: quality.qualities[0]});
            }
        })

        //add the temp array to the selectedCommand state
        setSelectedCommand(tempUnits);

        //reset the temp array
        tempUnits = [];
        
        //Load the armour units
        //look through all of the armour units in units.json
        units.current.armour.forEach((armourUnit) => {
            //if default is true, add the unit to the selectedArmour state
            if (armourUnit.default === "true") {
                //add the unit to the temp array
                tempUnits.push({unit: armourUnit, quality: quality.qualities[0]});
            }
        })

        //add the temp array to the selectedArmour state
        setSelectedArmour(tempUnits);

        tempUnits = [];
        
        //Load the gun units
        //look through all of the armour units in units.json
        units.current.guns.forEach((gunUnit) => {
            //if default is true, add the unit to the selectedArmour state
            if (gunUnit.default === "true") {
                //add the unit to the temp array
                tempUnits.push({unit: gunUnit, quality: quality.qualities[0]});
            }
        })

        //add the temp array to the selectedArmour state
        setSelectedGuns(tempUnits);
    }

    const handleBattalionButton = () => {
        if (chosenBattalion === null){
            return;
        }


        //load the correct battalion json
        switch (chosenBattalion) {
            case "British":
                units.current = british;
                break;
            case "German":
                units.current = german;
                break;
            default:
                units.current = british;
                break;
        }
    
        //clear local storage
        localStorage.removeItem(props.order+"battalionName");
        localStorage.removeItem(props.order);
    
        //set the battalion flag to true
        setBattalionFlag(true);

        //Clear the selected units
        setSelectedCommand([]);
        setSelectedInfantry([]);
        setSelectedArmour([]);
        setSelectedGuns([]);

        //add the default units to the battalion
        addDefaultUnits();

    }

    const handleSelectedUnits = (unit,type) => {
        if (type === "infantry") {

            //check if the unit and quality are already selected
            const found = selectedInfantry.find((item) => item.unit.id === unit.unit.id && item.quality.id === unit.quality.id);
            if (found) {
                alert("Unit already added");
                return;
            }
            //add the new unit to the selectedInfantry state
            setSelectedInfantry([...selectedInfantry,unit]);

        } else if (type === "armour") {
            //check if the unit and quality are already selected
            const found = selectedArmour.find((item) => item.unit.id === unit.unit.id && item.quality.id === unit.quality.id);
            if (found) {
                alert("Unit already added");
                return;
            }
            //add the new unit to the selectedArmour state
            setSelectedArmour([...selectedArmour,unit]);
        } else if (type === "command"){
            //check if the unit and quality are already selected
            const found = selectedCommand.find((item) => item.unit.id === unit.unit.id && item.quality.id === unit.quality.id);
            if (found) {
                alert("Unit already added");
                return;
            }
            //add the new unit to the selectedCommand state
            setSelectedCommand([...selectedCommand,unit]);
        } else if (type === "guns"){
            //check if the unit and quality are already selected
            const found = selectedGuns.find((item) => item.unit.id === unit.unit.id && item.quality.id === unit.quality.id);
            if (found) {
                alert("Unit already added");
                return;
            }
            //add the new unit to the selectedCommand state
            setSelectedGuns([...selectedGuns,unit]);
        }
     
    
    } 


    return(
        <div className={props.order + "unitselection shadow"}>
            <div className="battalionheader">          
                {battalionFlag === false ?

                <select onChange={handleBattalionSelect} id="battalionheaderselect" defaultValue={displayBattalion}>
                    <option key="0" value="notchosen">Select Battalion</option>
                    {battalionsAvailable.current.map((battalion) => (
                        <option key={battalion} value={battalion}>{battalion}</option>
                    ))}
                </select>

                : <h4>{chosenBattalion}</h4>}
                
                
                <div className="btn-group">
                    {battalionFlag === false && <button onClick={handleBattalionButton}>Select</button>}
   
                    {battalionFlag === true && <button onClick={clearBattalion}>Clear</button>}

                </div>

            </div>

            {/*if the battalion is selected, show the battalion setup component*/}
            {battalionFlag === true && 
            <div className="container-fluid p-0">
                <Suspense fallback={<div>Loading...</div>}>
                    <table className="table table-striped">
                    <UnitSelect units={units.current} type="command" handleSelectedUnits={handleSelectedUnits}/>
                    <UnitSelect units={units.current} type="infantry" handleSelectedUnits={handleSelectedUnits}/>
                    <UnitSelect units={units.current} type="armour" handleSelectedUnits={handleSelectedUnits}/>
                    <UnitSelect units={units.current} type="guns" handleSelectedUnits={handleSelectedUnits}/>
                    </table>
                    
                    <UnitDisplay selectedCommand={selectedCommand} selectedInfantry={selectedInfantry} selectedArmour={selectedArmour} selectedGuns={selectedGuns}/>
                </Suspense>
            </div>
            }
        </div>

    );
}

function UnitSelect(props){

    const units = props.units;

    //state to hold the units from the json
    const [unitList, setUnitList] = useState([]);
    //steate to hold the quality from the json
    const [qualityList, setQualityList] = useState([]);

    //hold the currently selected unit and quality
    const [selectedUnit, setSelectedUnit] = useState({unit: "", quality: ""});

    //load the units json into the unitList state
    useEffect(() => {
        if (props.type === "infantry") {
            setUnitList(units.infantry);
            //set the default unit and quality
            setSelectedUnit({unit: units.infantry[0], quality: quality.qualities[0]})
        } else if (props.type === "armour") {
            setUnitList(units.armour);
            //set the default unit and quality
            setSelectedUnit({unit: units.armour[0], quality: quality.qualities[0]})
        } else if(props.type === "command") {
            setUnitList(units.command);
            //set the default unit and quality
            setSelectedUnit({unit: units.command[0], quality: quality.qualities[0]})
        } else if(props.type === "guns") {
            setUnitList(units.guns);
            //set the default unit and quality
            setSelectedUnit({unit: units.guns[0], quality: quality.qualities[0]})
        }
        //load the quality json into the qualityList state
        setQualityList(quality.qualities);
    }, []);
    
    //Handle the unit select change
    const handleUnitChange = (event) => {
        //Read the select value and update the selectedUnit.
        const id = event.target.value;
        const item = unitList.find((unit) => unit.id === id);
        setSelectedUnit({...selectedUnit, unit:item});
    }

    //Handle the quality select change
    const handleQualityChange = (event) => {
        //Read the select value and update the selectedUnit.
        const id = event.target.value;
        const item = qualityList.find((level) => level.id === id);
        setSelectedUnit({...selectedUnit, quality:item});
    }

    const handleAddUnit = () => {
        //send the selected unit and quality to the parent component
        props.handleSelectedUnits(selectedUnit,props.type);
    }

    return (
                    <Fragment>
                        <thead>
                            <tr>
                                <th colSpan={3}>Select {props.type}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="unitselectcol1">
                                    <select onChange={handleUnitChange} className="unitselectdropdown">
                                        {unitList.map((unit) => (
                                            <option key={unit.id} value={unit.id}>{unit.name}</option>
                                        ))}
                                    </select>
                                </td>
                                <td id="unitselectcol2">
                                    <select onChange={handleQualityChange} className="qualitydropdown">
                                        {qualityList.map((level) => (
                                            <option key={level.id} value={level.id}>{level.name}</option>
                                        ))}
                                    </select>
                                </td>
                                <td id="unitselectcol3">
                                    <button onClick={handleAddUnit}>Add</button>
                                </td>
                            </tr>
                        </tbody>
                    </Fragment>
    );
}

function UnitDisplay(props){
    return(
        <div>
            <table className="table selectedunitsdisplay table-striped">
                <thead>
                    <tr>
                        <th colSpan={2} className="text-center table-dark">Selected Units</th>
                    </tr>
                    <tr className="unittypeheader">
                        <th colSpan={2} >Command</th>
                    </tr>
                </thead>
                <tbody >
                    {props.selectedCommand.map((item, index) => (
                        <tr key={index}>
                            <td colSpan={2}>{item.unit.name}</td>
                        </tr>
                    ))}
                </tbody>
                <thead>
                    <tr className="unittypeheader">
                        <th >Infantry</th>
                        <th>Quality</th>
                    </tr>
                </thead>
                <tbody>
                    {props.selectedInfantry.map((item, index) => (
                        <tr key={index}>
                            <td>{item.unit.name}</td>
                            <td>{item.quality.name}</td>
                        </tr>
                    ))}
                </tbody>

                {props.selectedArmour.length > 0 ? (
                <>
                    <thead>
                        <tr className="unittypeheader">
                            <th>Armour</th>
                            <th>Quality</th>
                        </tr>
                    </thead>                
                    <tbody>
                        {props.selectedArmour.map((item, index) => (
                            <tr key={index}>
                                <td>{item.unit.name}</td>
                                <td>{item.quality.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </>
                ): null}

                {props.selectedGuns.length > 0 ? (
                <>
                    <thead>
                        <tr className="unittypeheader">
                            <th>Guns</th>
                            <th>Quality</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.selectedGuns.map((item, index) => (
                            <tr key={index}>
                                <td>{item.unit.name}</td>
                                <td>{item.quality.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </>
                ): null}
            </table>
        </div>
    );
}

export default UnitSelection;