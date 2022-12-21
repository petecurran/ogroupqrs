import React, {useEffect, useRef, useState} from 'react';
import infantryweapons from '../data/infantryweapons.json';


function ShootingContainer(props){
    
    //Load the battalions from local storage
    const [battalionOne, setBattalionOne] = useState(null);
    const [battalionOneLabel, setBattalionOneLabel] = useState(null);
    const battalionOneFlag = useRef(false);
    const [battalionTwo, setBattalionTwo] = useState(null);
    const [battalionTwoLabel, setBattalionTwoLabel] = useState(null);
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
            <h1>Shooting</h1>
            <h1>{battalionOneLabel}</h1>
            {battalionOneFlag.current ? <WeaponDisplay battalion={battalionOne}/> : <p>Select a battalion to see the movement table</p>}
            <h1>{battalionTwoLabel}</h1>
        </div>
    )  
}

function WeaponDisplay(props){

    //load the weapons from the json
    const weapons = infantryweapons.weapons;
    //make the battalion easier to work with
    const battalion = props.battalion;

    //set the default value for the weapon
    const [weapon, setWeapon] = useState(weapons.find(weapon => weapon.id === "W01"));


    //set the weapon based on the select box below
    function handleWeapon(event){
        //search weapons for the weapon code
        setWeapon(weapons.find(weapon => weapon.id === event.target.value))
    }

    return(
        <div>
            <select onChange={handleWeapon}>
                {battalion.infantry.map((unit, index) => {
                    return <option key={index} value={unit.unit.weaponcode}>{unit.unit.name}</option>
                })}
            </select>


            <table className="table">
                <thead>
                    <tr>
                        <th>Weapon</th>
                        <th>Firepower</th>
                        <th>Range</th>
                        <th>Elevated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{weapon.name}</td>
                        <td>{weapon.firepower}</td>
                        <td>{weapon.battlerange}</td>
                        <td>{weapon.elevatedrange}</td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th colSpan={4}>Firing unit modifiers</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th colSpan={3}>Close range {weapon.type === "infantry" ? <span>0-6"</span> : <span>0-10"</span>}</th>
                        {weapon.assault === "true" ? <td>+2D6</td> : <td>+1D6</td>}
                    </tr>
                    <tr>
                        <th colSpan={3}>Will move / Moved / Failed opportunity fire</th>
                        <td>-2D6</td>
                    </tr>
                    <tr>
                        <th colSpan={3}>Shock / Damaged / Rallied (-1D6 for each)</th>
                        <td>-1D6</td>
                    </tr>
                    
                    <tr>                                       
                        <th colSpan={3}>Green infantry</th>
                        <td>-1D6</td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th colSpan={4}>Target modifiers</th>
                    </tr>
                    <tr>
                        <td colSpan={4}>Roll a spotting die if target is in cover or buildings.<br/>1-3 obscured, 4-6 spotted.</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th colSpan={3}>Target in cover</th>
                        <td>SD</td>
                    </tr>
                    <tr>
                        <th colSpan={3}>In buildings or trench</th>
                        <td>{weapon.he === "true" ? <span>-1D6</span> : <span>-2D6</span>}</td>
                    </tr>
                    <tr>
                        <th colSpan={3}>Combat patrol</th>
                        <td>-2D6</td>
                    </tr>
                    
                    <tr>                                       
                        <th colSpan={3}>In a bunker</th>
                        <td>-3D6</td>
                    </tr>
                    <tr>
                        <td colSpan={4}>Special rules</td>
                    </tr>
                </tbody>

            </table>
        </div>
    );
}

export default ShootingContainer;