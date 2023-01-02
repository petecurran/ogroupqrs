import React, {useEffect, useRef, useState, Fragment} from 'react';
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
        <div className="container-sm">
            <div className="row">
                <div className="col-md-6">
                    {battalionOneFlag.current ? <ShootingUnitSelect battalion={battalionOne} opposingBattalion={battalionTwo} label={battalionOneLabel} idprefix={"A"} opposingBattalionFlag={battalionTwoFlag.current}/> : <p>Select a battalion to see the shooting table</p>}
                </div>
                <div className="col-md-6">
                    {battalionTwoFlag.current ? <ShootingUnitSelect battalion={battalionTwo} opposingBattalion={battalionOne} label={battalionTwoLabel} idprefix={"B"} opposingBattalionFlag={battalionOneFlag.current}/> : <></>}
                </div>
            </div>
        </div>
    )  
}

function WeaponDisplay(props){

    //set the id prefix for the table
    const idprefix = props.idprefix;

    //get the weapon from the props
    const weapon = props.weapon;

    return(
        <div className="bg-light">
            <table className="table table-striped">
                <thead>
                    <tr className={idprefix +"smallarmsheader align-middle"}>
                        <th>Weapon</th>
                        <th>Firepower<br/> per section</th>
                        <th>Range</th>
                        <th>Elevated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center">
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
                        <td colSpan={4}>Calculate the number of dice to roll. Each 4+ is a hit.</td>
                    </tr>
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
                </tbody>

                <MoraleDisplay idprefix={idprefix}/>

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

    //set the state for the target select
    const [armourTarget, setArmourTarget] = useState(null);

    //variables to hold the modifiers of the target
    const rawFrontModifier = useRef(0);
    const rawFlankModifier = useRef(0);

    //set the state for the modifiers
    const [frontModifier, setFrontModifier] = useState(0);
    const [flankModifier, setFlankModifier] = useState(0);

    const handleTargetSelect = (event) => {

        if (event.target.value === ""){
            setArmourTarget(null);
            setFrontModifier(0);
            setFlankModifier(0);
            return;
        }

        //find the target in opposingBattalion
        const target = props.opposingBattalion.armour.find((unit) => unit.unit.id === event.target.value);
        setArmourTarget(target);

        //set the raw modifiers
        rawFrontModifier.current = target.unit.frontarmour;
        rawFlankModifier.current = target.unit.flankarmour;

        //calculate the modifiers
        calcModifiers();

    }

    //calculate the modifiers whenever the target or unit changes
    useEffect(() => {
        calcModifiers();
    }, [armourTarget, atweapon])

    //function to calculate the range modifiers
    const RangeModifiersDisplay = (props) => {
        const gunType = props.gunType;
        const specialrules = props.specialrules;
        let poor = false;

        //Check if the word 'poor' is in a lowecase version of the specialrules
        if (specialrules.toLowerCase().includes("poor")){
            poor = true;
        }


        if (gunType === "lowvelocity"){
            return (
                <>
                    <tr>
                        <th colSpan={3} className={idprefix +"atshootingmodifier"}>Elevated: 30" - 40"</th>
                        <td>-1</td>
                    </tr>
                    <tr>
                        <th colSpan={4} className={idprefix +"atshootingmodifier text-center"}>Elevated: 40" - 50" Not allowed</th>
                    </tr>
                </>
            )
        } else if (gunType === "superior" && poor === false){
            return(
                <>
                    <tr>
                        <th colSpan={4} className={idprefix +"atshootingmodifier text-center"}>Elevated: 40" - 50" -1 to hit.</th>
                    </tr>
                </>
            );
        } else if (gunType === "superior" && poor === true){
            return(
                <>
                    <tr>
                        <th colSpan={4} className={idprefix +"atshootingmodifier text-center"}>Elevated: 40" - 50" Not allowed.</th>
                    </tr>
                </>
            );
        
        } else if (gunType === "standard" && poor === false){
            return(
                <>
                    <tr>
                        <th colSpan={4} className={idprefix +"atshootingmodifier text-center"}>Elevated: 40" - 50" -1 to hit & -1 firepower.</th>
                    </tr>
                </>
            );
        } else if (gunType === "standard" && poor === true){
            return(
                <>
                    <tr>
                        <th colSpan={4} className={idprefix +"atshootingmodifier text-center"}>Elevated: 40" - 50" Not allowed.</th>
                    </tr>
                </>
            );
        } else {
            return <></>
        }
    }



    const calcModifiers = () =>{

        //get the firepower of the selected at weapon as an integer
        const firepower = parseInt(atweapon.firepower);

        //calculate the front modifier
        const frontMod = firepower - parseInt(rawFrontModifier.current);        
        //if the modifier is positive, create a string with a + before it
        if ((frontMod * -1) > 0){
            setFrontModifier("+" + (frontMod * -1));
        } else {
            setFrontModifier(frontMod * -1);
        }

        //calculate the flank modifier
        const flankMod = firepower - parseInt(rawFlankModifier.current);        
        //if the modifier is positive, create a string with a + before it
        if ((flankMod * -1) > 0){
            setFlankModifier("+" + (flankMod * -1));
        } else {
            setFlankModifier(flankMod * -1);
        }  

    }


    return(
        <div className="accordion accordion-flush" id={idprefix + "ataccordion"}>
            <div className="accordion-item">
                <h4 className="accordion-header" id={idprefix + "atheadingOne"}>
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#" + idprefix + "atcollapseOne"} aria-expanded="true" aria-controls={idprefix + "atcollapseOne"}>
                        Roll to hit
                    </button>
                </h4>
                <div id={idprefix + "atcollapseOne"} className="accordion-collapse collapse show" aria-labelledby={idprefix + "atheadingOne"} data-bs-parent={"#" + idprefix + "ataccordion"}>
                    <div className="accordion-body p-0">

                        <table className="table">
                            <thead>
                                {/*Empty so the body below works*/}
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={4} className="text-center">Roll 2D6 per section firing. 7+ after modifiers is a hit.</td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr className="align-middle">
                                    <th colSpan={2}>Gun type</th>
                                    <th className="text-center">Range</th>
                                    <th className="text-center">Elevated</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>{atweapon.name}</td>
                                    <td className="text-center">{atweapon.battlerange}</td>
                                    <td className="text-center">{atweapon.elevatedrange}</td>
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
                                <RangeModifiersDisplay gunType={atweapon.type} specialrules={atweapon.specialrules}/>

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
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h4 className="accordion-header" id={idprefix + "atheadingTwo"}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#" + idprefix + "atcollapseTwo"} aria-expanded="false" aria-controls={idprefix + "atcollapseTwo"}>
                        Roll to penetrate
                    </button>
                </h4>
                <div id={idprefix + "atcollapseTwo"} className="accordion-collapse collapse" aria-labelledby={idprefix + "atheadingTwo"} data-bs-parent={"#" + idprefix + "ataccordion"}>
                    <div className="accordion-body p-0">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th colSpan={4} className="text-center">Roll to penetrate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={4} className="text-center">Roll 2D6 and add the relevant modifier below.</td>
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
                                    <td className="text-center">{atweapon.firepower}</td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan={2}>Target</th>
                                    <th>Front armour</th>
                                    <th>Flank armour</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Check if there's an opposing battalion and render advice if not*/}
                                {props.opposingBattalionFlag && props.opposingBattalion.armour.length > 0 ?
                                    <>
                                    <tr>
                                        <th colSpan={2}>
                                            <select id={idprefix + "targetarmourselect"} onChange={handleTargetSelect}>
                                                <option value="">Select a target</option>
                                                {props.opposingBattalion.armour.map((armour, index) => <option key={index} value={armour.unit.id}>{armour.unit.name}</option>)}
                                            </select>
                                        </th>
                                        <td className="text-center">
                                            {armourTarget ? <>{armourTarget.unit.frontarmour}</> : null}
                                        </td>
                                        <td className="text-center">
                                            {armourTarget ? <>{armourTarget.unit.flankarmour}</> : null}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colSpan={2}>Modifiers:</th>
                                        <td className="text-center">{armourTarget ? <>{frontModifier}</> : null}</td>
                                        <td className="text-center">{armourTarget ? <>{flankModifier}</> : null}</td>
                                    </tr>
                                    </>
                                    :
                                    <tr>
                                        <td colSpan={4} className="bg-warning text-center">Add tanks to the opposing battalion to see them here.</td>
                                    </tr>}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h4 className="accordion-header" id={idprefix + "atheadingThree"}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#" + idprefix + "atcollapseThree"} aria-expanded="false" aria-controls={idprefix + "atcollapseThree"}>
                        Roll for damage
                    </button>
                </h4>
                <div id={idprefix + "atcollapseThree"} className="accordion-collapse collapse" aria-labelledby={idprefix + "atheadingThree"} data-bs-parent={"#" + idprefix + "ataccordion"}>
                    <div className="accordion-body p-0">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th colSpan={4} className="text-center">Roll for damage</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={4} className="text-center">Double six: 1 shock is worst result possible. <br/> Double 1: 1 shock minium result.</td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan={2}>Result</th>
                                    <th>Spotted</th>
                                    <th>Obscured</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th colSpan={2}>9+</th>
                                    <td>No effect</td>
                                    <td>No effect</td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>8</th>
                                    <td>1 shock</td>
                                    <td>No effect</td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>7</th>
                                    <td>2 shock</td>
                                    <td>1 shock</td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>6-5</th>
                                    <td>Damaged</td>
                                    <td>1 shock</td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>4 or less</th>
                                    <td>Knocked out</td>
                                    <td>2 shock</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
   
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
    const [weapon, setWeapon] = useState(null);
    const [atweapon,setATWeapon] =useState(null)

    //hold whether we're looking at infantry or antitank
    const [fireType, setFireType] = useState("infantry");

    //set the weapon based on the select box below
    function handleWeapon(event){

        //Clear on a blank selection
        if (event.target.value === ""){
            setWeapon(null);
            setATWeapon(null);
            return;
        }

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

        //If the unit is in the artillery list
        if (battalion.guns.find(unit => unit.unit.name === event.target.value)){
            setWeapon(weapons.find(weapon => weapon.id === battalion.guns.find(unit => unit.unit.name === event.target.value).unit.weaponcode))
            setATWeapon(atweapons.find(atweapon => atweapon.id === battalion.guns.find(unit => unit.unit.name === event.target.value).unit.antitankcode))
        }

    }

    return(
        <div className={idprefix + "smallarmsshootingtable shadow"}>
            
            <div id={idprefix + "shootingheader"}>
                <h4>Shooting - {props.label}</h4>
                <h6>
                    <select onChange={handleWeapon} id={idprefix+"shootingunitselector"}>
                    <option key="0" value="">Select unit</option>
                    {battalion.infantry.map((unit, index) => {
                        return <option key={"infantry"+index} value={unit.unit.name} >{unit.unit.name}</option>
                    })}
                    {battalion.armour.map((unit, index) => {
                        return <option key={"armour"+index} value={unit.unit.name}>{unit.unit.name}</option>
                    })}
                    {battalion.guns.map((unit, index) => {
                        return <option key={"guns"+index} value={unit.unit.name}>{unit.unit.name}</option>
                    })}
                    </select>
                </h6>
            </div>

            
            
            {weapon === null || atweapon === null ? 
            <div>
            </div> 
            :
            <>
            <div id={idprefix + "fireselector"}>
                <button id="infantrybutton" onClick={() => setFireType("infantry")}>Small arms</button>
                <button id="antitankbutton" onClick={() => setFireType("antitank")}>Anti-tank</button>
            </div>
            {fireType ==="infantry" ?
            <WeaponDisplay idprefix={idprefix} battalion={battalion} weapon={weapon}/>
            : <AntiTankDisplay idprefix={idprefix} battalion={battalion} opposingBattalion={props.opposingBattalion} opposingBattalionFlag={props.opposingBattalionFlag} weapon={weapon} atweapon={atweapon}/>} 
            </>
            }

        </div>
    )


}

function MoraleDisplay(props){
    const idprefix = props.idprefix;

    return(
        <Fragment>
            <thead className={idprefix +"smallarmsheader"}>
                    <tr>
                        <th colSpan={4}>Morale tests</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={4}>Target rolls 1D6 to test for each successful hit.</td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th colSpan={2}>Target quality</th>
                        <th>Spotted</th>
                        <th>Obscured</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th colSpan={2}>Veteran</th>
                        <td>3+</td>
                        <td>3+</td>
                    </tr>
                    <tr>
                        <td colSpan={4}><em>Veterans save on 4+ in the open.</em></td>
                    </tr>
                    <tr>
                        <th colSpan={2}>Confident</th>
                        <td>4+</td>
                        <td>3+</td>
                    </tr>
                    <tr>
                        <th colSpan={2}>Regular</th>
                        <td>4+</td>
                        <td>3+</td>
                    </tr>
                    <tr>
                        <th colSpan={2}>Green</th>
                        <td>5+</td>
                        <td>3+</td>
                    </tr>
                    <tr>
                        <th colSpan={2}>Combat Patrol</th>
                        <td>-</td>
                        <td>3+</td>
                    </tr>
                    <tr>
                        <th colSpan={2}>Company Commander / Forward Observer</th>
                        <td>2+</td>
                        <td>2+</td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th colSpan={4}>Results</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={4}>
                            Each failed roll adds 1 shock. If the target has 3 shock it is now suppressed.
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th colSpan={4}>Excess shock</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th colSpan={2}>
                            Every 2 excess Shock
                        </th>
                        <td colSpan={2}>
                            1 KIA
                        </td>
                    </tr>
                    <tr>
                        <th colSpan={2}>
                            1 excess Shock
                        </th>
                        <td colSpan={2}>
                            1 KIA on 5+
                        </td>
                    </tr>
                    <tr>
                        <th colSpan={2}>
                            Attached support weapon
                        </th>
                        <td colSpan={2}>
                            KIA on 1-2
                        </td>
                    </tr>
                </tbody>

        </Fragment>
    )
}


export default ShootingContainer;