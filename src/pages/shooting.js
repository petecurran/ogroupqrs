import React, {useEffect, useRef, useState} from 'react';
import infantryweapons from '../data/infantryweapons.json';
import antitankweapons from '../data/antitankweapons.json';


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
            {battalionOneFlag.current ? <ShootingUnitSelect battalion={battalionOne} label={battalionOneLabel} idprefix={"A"}/> : <p>Select a battalion to see the movement table</p>}
        </div>
    )  
}

function WeaponDisplay(props){

    //set the id prefix for the table
    const idprefix = props.idprefix;

    //get the weapon from the props
    const weapon = props.weapon;

    return(
        <div>

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
                        <th colSpan={3} className={idprefix +"shootingmodifier"}>Close range {weapon.type === "infantry" ? <span>0-6"</span> : <span>0-10"</span>}</th>
                        {weapon.assault === "true" ? <td>+2D6</td> : <td>+1D6</td>}
                    </tr>
                    <tr>
                        <th colSpan={3} className={idprefix +"shootingmodifier"}>Will move / Moved / Failed opportunity fire</th>
                        <td>-2D6</td>
                    </tr>
                    <tr>
                        <th colSpan={3} className={idprefix +"shootingmodifier"}>Shock / Damaged / Rallied (-1D6 for each)</th>
                        <td>-1D6</td>
                    </tr>
                    
                    <tr>                                       
                        <th colSpan={3} className={idprefix +"shootingmodifier"}>Green infantry</th>
                        <td>-1D6</td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th colSpan={4}>Target modifiers</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={4}>Roll a spotting die if target is in cover or buildings.<br/>1-3 obscured, 4-6 spotted.</td>
                    </tr>
                    <tr>
                        <th colSpan={3} className={idprefix +"shootingmodifier"}>Target in cover</th>
                        <td>SD</td>
                    </tr>
                    <tr>
                        <th colSpan={3} className={idprefix +"shootingmodifier"}>In buildings or trench</th>
                        <td>{weapon.he === "true" ? <span>-1D6</span> : <span>-2D6</span>}</td>
                    </tr>
                    <tr>
                        <th colSpan={3} className={idprefix +"shootingmodifier"}>Combat patrol</th>
                        <td>-2D6</td>
                    </tr>
                    
                    <tr>                                       
                        <th colSpan={3} className={idprefix +"shootingmodifier"}>In a bunker</th>
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

function AntiTankDisplay(props){
    //set the id prefix for the table
    const idprefix = props.idprefix;

    //get the weapon from the props
    const weapon = props.weapon;
    const atweapon = props.atweapon

    return(
        <div>
        {weapon.name}
        {atweapon.name}

        <table className="table">
            <thead>
                <tr>
                    <th colSpan={4} className="text-center">Roll to hit</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={4} className="text-center">Try to roll a 7, dummy!</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th>Gun type</th>
                    <th className="text-center">Battle<br/> 0-30"</th>
                    <th className="text-center">Elevated<br/> 30-40"</th>
                    <th className="text-center">Elevated<br/> 40-50"</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Light</td>
                    <td className="text-center">-1D6</td>
                    <td className="text-center">-2D6</td>
                    <td className="text-center">-3D6</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th colSpan={4} className="text-center">To hit modifiers</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th colSpan={4} className={idprefix +"atshootingmodifier text-center"}>Close: target within 10" +1 to hit, +1 firepower</th>
                </tr>
                <tr>
                    <th colSpan={3} className={idprefix +"atshootingmodifier"}>Firing unit is veteran</th>
                    <td>+1</td>
                </tr>
                <tr>
                    <th colSpan={3} className={idprefix +"atshootingmodifier"}>Shock / damaged / rallied (-1 for each)</th>
                    <td>-1</td>
                </tr>
                <tr>
                    <th colSpan={3} className={idprefix +"atshootingmodifier"}>Fire moved / will move</th>
                    <td>-1</td>
                </tr>
                <tr>
                    <th colSpan={3} className={idprefix +"atshootingmodifier"}>Failed opportunity fire</th>
                    <td>-1</td>
                </tr>
                <tr>
                    <th colSpan={3} className={idprefix +"atshootingmodifier"}>Target dug-in</th>
                    <td>-1</td>
                </tr>
                <tr>
                    <th colSpan={3} className={idprefix +"atshootingmodifier"}>Target is low profile / recon (ignore if close range)</th>
                    <td>SD</td>
                </tr>
                <tr>
                    <th colSpan={3} className={idprefix +"atshootingmodifier"}>Target is in cover / hull down</th>
                    <td>SD</td>
                </tr>
                <tr>
                    <th colSpan={3} className={idprefix +"atshootingmodifier"}>Poor AFV vs. any target in the open (ignore if close range)</th>
                    <td>SD</td>
                </tr>
            </tbody>
        </table>

        <table className="table">
            <thead>
                <tr>
                    <th colSpan={4} className="text-center">Roll to penetrate</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={4} className="text-center">Explain modifiers</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th colSpan={3}>Gun type</th>
                    <th>Firepower</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={3}>{atweapon.name}</td>
                    <td>99</td>
                </tr>
            </tbody>
        </table>


        </div>
    )
}


function ShootingUnitSelect(props){
    //set the id prefix for the table
    const idprefix = props.idprefix;

    //load the weapons from the json
    const weapons = infantryweapons.weapons;
    const atweapons = antitankweapons.weapons;
    //make the battalion easier to work with
    const battalion = props.battalion;

    //set the default value for the weapon (rifle)
    const [weapon, setWeapon] = useState(weapons.find(weapon => weapon.id === "W01"));
    const [atweapon,setATWeapon] =useState(atweapons.find(atweapon => atweapon.id === "AT01"))

    //hold whether we're looking at infantry or antitank
    const [fireType, setFireType] = useState("infantry");

    //set the weapon based on the select box below
    function handleWeapon(event){

        //Find the unit we're referencing
        //If the unit is in the infantry list
        if (battalion.infantry.find(unit => unit.unit.name === event.target.value)){
            setWeapon(weapons.find(weapon => weapon.id === battalion.infantry.find(unit => unit.unit.name === event.target.value).unit.weaponcode))
            setATWeapon(atweapons.find(atweapon => atweapon.id === battalion.infantry.find(unit => unit.unit.name === event.target.value).unit.antitankcode))
        }

        //If the unit is in the armour list
        if (battalion.armour.find(unit => unit.unit.name === event.target.value)){
            setWeapon(weapons.find(weapon => weapon.id === battalion.armour.find(unit => unit.unit.name === event.target.value).unit.weaponcode))
            setATWeapon(atweapons.find(atweapon => atweapon.id === battalion.armour.find(unit => unit.unit.name === event.target.value).unit.antitankcode))
        }
    }

    return(
        <div className={idprefix + "smallarmsshootingtable"}>
            
            <div id={idprefix + "shootingheader"}>
                <h4>Shooting - {props.label}</h4>
                <h6>Unit:
                    <select onChange={handleWeapon}>
                    <option key="0" value="notchosen">Select unit</option>
                    {battalion.infantry.map((unit, index) => {
                        return <option key={"infantry"+index} value={unit.unit.name} >{unit.unit.name}</option>
                    })}
                    {battalion.armour.map((unit, index) => {
                        return <option key={"armour"+index} value={unit.unit.name}>{unit.unit.name}</option>
                    })}
                    </select>
                </h6>
            </div>

            <div id={idprefix + "fireselector"}>
                <button id="infantrybutton" onClick={() => setFireType("infantry")}>Small arms</button>
                <button id="antitankbutton" onClick={() => setFireType("antitank")}>Anti-tank</button>
            </div>
            
            {fireType ==="infantry" ?
            <WeaponDisplay idprefix={idprefix} battalion={battalion} weapon={weapon}/>
            : <AntiTankDisplay idprefix={idprefix} battalion={battalion} weapon={weapon} atweapon={atweapon}/> }


        </div>
    )


}




export default ShootingContainer;