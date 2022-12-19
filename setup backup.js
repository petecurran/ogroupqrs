import { useState, useEffect, useRef, Suspense } from 'react';

import quality from '../data/quality.json';

//import the battalions available
import british from '../data/britishcore.json';
import german from '../data/germancore.json';

function Setup(props){

//list of available battalions
const battalionsAvailable = useRef(["British", "German"])
const units = useRef(null);
const [battalionFlag, setBattalionFlag] = useState(false);
//state to hold the chosen battalion. Default to the first battalion in the list
const [chosenBattalion, setChosenBattalion] = useState(battalionsAvailable.current[0]);

//function to handle the battalion select
const handleBattalionSelect = (event) => {
    //get the selected battalion
    setChosenBattalion(event.target.value);
}

const handleBattalionButton = () => {
    //set the battalion flag to true
    setBattalionFlag(true);

    //load the correct battalion json
    switch (chosenBattalion) {
        case "British":
            units.current = british;
            break;
        case "German":
            units.current = german;
            break;
    }
}

    return (
        <div>
            <h1>Select a Battalion:</h1>
            <select onChange={handleBattalionSelect}>
                {battalionsAvailable.current.map((battalion) => (
                    <option key={battalion} value={battalion}>{battalion}</option>
                ))}
            </select>

            <button onClick={handleBattalionButton}>Select</button>

            {/*if the battalion is selected, show the battalion setup component*/}
            {battalionFlag === true && 
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <BattalionSetup units={units.current}/>
                </Suspense>
            </div>
        }
            
        </div>
    )
}


function BattalionSetup(props) {

    const units = props.units;

    //states to hold the selected units
    const [selectedCommand, setSelectedCommand] = useState([]);
    const [selectedInfantry, setSelectedInfantry] = useState([]);
    const [selectedArmour, setSelectedArmour] = useState([]);

    //Load all of the default units from the json
    useEffect(() => {
        //load the infantry units
        //look through all of the infantry units in units prop
        units.infantry.forEach((infantryUnit) => {
            //if default is true, add the unit to the selectedInfantry state
            if (infantryUnit.default === "true") {
                setSelectedInfantry([...selectedInfantry, {unit: infantryUnit, quality: quality.qualities[0]}]);
            }
        })
        //Load the command units
        //look through all of the command units in units.json
        units.command.forEach((command) => {
            //if default is true, add the unit to the selectedCommand state
            if (command.default === "true") {
                setSelectedCommand([...selectedCommand, {unit: command, quality: quality.qualities[0]}]);
            }
        })
        //Load the armour units
        //look through all of the armour units in units.json
        units.armour.forEach((armour) => {
            //if default is true, add the unit to the selectedArmour state
            if (armour.default === "true") {
                setSelectedArmour([...selectedArmour, {unit: armour, quality: quality.qualities[0]}]);
            }
        })
    }, []);




    //Function to accept the selected unit from the UnitSelect component
    const handleSelectedUnits = (unit, type) => {
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
        }
    }


    return (
        <div>
            
            <UnitSelect type="infantry" units={units} storeUnit={handleSelectedUnits} selectedInfantry={selectedInfantry}/>
            <UnitSelect type="armour" units={units} storeUnit={handleSelectedUnits} selectedArmour={selectedArmour}/>

            <h1>Selected Infantry</h1>
            <ul>
                {selectedInfantry.map((item) => (
                    //key is a composite of the unit and quality names
                    <li key={item.unit.name + item.quality.name}>{item.unit.name} - {item.quality.name}</li>
                ))}
            </ul>

            <h1>Selected Armour</h1>
            <ul>
                {selectedArmour.map((item) => (
                    //key is a composite of the unit and quality names
                    <li key={item.unit.name + item.quality.name}>{item.unit.name} - {item.quality.name}</li>
                ))}
            </ul>
        </div>
    )
}

//react component to select units from a json
function UnitSelect(props) {

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
            setSelectedUnit({unit: units.infantry[0], quality: quality.qualities[0]})
        } else if (props.type === "armour") {
            setUnitList(units.armour);
            setSelectedUnit({unit: units.armour[0], quality: quality.qualities[0]})
        }
        
        setQualityList(quality.qualities);
    }, [props.type, units.armour, units.infantry]);

    const handleUnitChange = (event) => {
        //Read the select value and update the selectedUnit.
        const id = event.target.value;
        const item = unitList.find((unit) => unit.id === id);
        setSelectedUnit({...selectedUnit, unit:item});
    }

    const handleQualityChange = (event) => {
        //Read the select value and update the selectedUnit.
        const id = event.target.value;
        const item = qualityList.find((level) => level.id === id);
        setSelectedUnit({...selectedUnit, quality:item});
    }

    const saveUnit = () => {
        //Pass the selected unit and quality to the parent component
        props.storeUnit(selectedUnit,props.type);
   
    }
    
    return (
        <div>
            
            <h1>Select {props.type}</h1>

            <select onChange={handleUnitChange}>
                {unitList.map((unit) => (
                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                ))}
            </select>
            <select onChange={handleQualityChange}>
                {qualityList.map((level) => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                ))}
            </select>

            {/*Sends the selected unit and quality to the parent component*/}
            <button onClick={() => {
                saveUnit();
            }}>Add unit</button>

        </div>
    );
}



export default Setup;