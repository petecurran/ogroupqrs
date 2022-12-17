import { useState, useEffect } from 'react';
import units from '../data/units.json';
import quality from '../data/quality.json'; 

function Setup(props){

//states to hold the selected units
const [selectedInfantry, setSelectedInfantry] = useState([]);
const [selectedArmour, setSelectedArmour] = useState([]);

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
            <UnitSelect type="infantry" storeUnit={handleSelectedUnits} selectedInfantry={selectedInfantry}/>
            <UnitSelect type="armour" storeUnit={handleSelectedUnits} selectedArmour={selectedArmour}/>

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

    //state to hold the units from the json
    const [unitList, setUnitList] = useState([]);
    //steate to hold the quality from the json
    const [qualityList, setQualityList] = useState([]);

    //state to hold the selected units
    const [selectedUnits, setSelectedUnits] = useState([]);

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
    }, []);

    const handleUnitChange = (event) => {
        const id = event.target.value;
        const item = unitList.find((unit) => unit.id === id);
        setSelectedUnit({...selectedUnit, unit:item});
    }

    const handleQualityChange = (event) => {
        const id = event.target.value;
        const item = qualityList.find((level) => level.id === id);
        setSelectedUnit({...selectedUnit, quality:item});
    }

    const saveUnit = () => {
        
        props.storeUnit(selectedUnit,props.type);
   
    }
    
    return (
        <div>
            <h1>{props.type}</h1>

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

            <button onClick={() => {
                saveUnit();
            }}>Add unit</button>

        </div>
    );
}



export default Setup;