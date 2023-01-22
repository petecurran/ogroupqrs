import React, {useState, useEffect, useRef} from 'react';
import NotSelected from '../components/notselected.js';
import artilleryData from '../data/artillery.json';
import britmortar from '../assets/britmortar.png';


const ArtilleryContainer = () => {

    const [battalionOneLabel, setBattalionOneLabel] = useState(null);
    const [battalionTwoLabel, setBattalionTwoLabel] = useState(null);
    const [selectedBattalion, setSelectedBattalion] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const idprefix = useRef(null)
 

    useEffect(() => {
        //load the battalion names from local storage
        if (localStorage.getItem("BattalionOnebattalionName") != null) {
            setBattalionOneLabel(JSON.parse(localStorage.getItem("BattalionOnebattalionName")));
            setSelectedBattalion(JSON.parse(localStorage.getItem("BattalionOnebattalionName")))
            //default to A as the id prefix
            idprefix.current = "A"
        }
        if (localStorage.getItem("BattalionTwobattalionName") != null) {
            setBattalionTwoLabel(JSON.parse(localStorage.getItem("BattalionTwobattalionName")));
            //if the user has only selected batallion B, set the id prefix to B, and set the battalion name
            if (idprefix.current == null) {
                setSelectedBattalion(JSON.parse(localStorage.getItem("BattalionTwobattalionName")))
                idprefix.current = "B"
            }
        }

        //set the loaded state to true
        setLoaded(true);
    }, [])

    const swapBattalion = () => {
        //swap the selected battalion
        if (selectedBattalion === battalionOneLabel) {
            setSelectedBattalion(battalionTwoLabel);
            idprefix.current = "B"
        } else {
            setSelectedBattalion(battalionOneLabel);
            idprefix.current = "A"
        }
    }


    //if no battalion is selected, display the not selected component
    if (battalionOneLabel == null && battalionTwoLabel == null && loaded === true) {
        return (
            <NotSelected type="artillery"/>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {loaded === true &&
                    <>
                        <div className="imagePlaceholder">
                            <img src={britmortar} alt="mortars" className="mx-auto d-block battalion-image"/>
                        </div>
                        <ArtilleryAccordion idprefix={idprefix.current} selectedBattalion={selectedBattalion} battalionOneLabel={battalionOneLabel} battalionTwoLabel={battalionTwoLabel} swapBattalion={swapBattalion}/>
                    </>
                    }
                </div>
            </div>
        </div>
    );
    }

const ArtilleryAccordion = (props) => {
    const idprefix = props.idprefix;
    const selectedBattalion = props.selectedBattalion;
    const battalionOneLabel = props.battalionOneLabel;
    const battalionTwoLabel = props.battalionTwoLabel;
    const swapBattalion = props.swapBattalion;

    const [artillery, setArtillery] = useState(null);
    const [showArtillery, setShowArtillery] = useState(null);

    const handleArtillerySelect = (event) => {
        setArtillery(event.target.value);
        if (event.target.value !== "notchosen" && event.target.value !== "battalion") {
            setShowArtillery("show")
        } else {
            setShowArtillery("")
        }
    }
    

    return (

        <div className="shadow">
            <div className={idprefix + "artilleryheader"}>
                <h4 className="artillerybattaliontitle">Artillery - {selectedBattalion}</h4>

                {battalionOneLabel != null && battalionTwoLabel != null &&
                    <button className="battalionswap" onClick={swapBattalion}>
                        Swap
                    </button>
                }
            </div>
            <div className="artilleryintro">
                <p>Choose a spotter with line of sight to the target</p> 
                <ul className="artilleryintro">
                    <li><strong>Range:</strong> 30"</li>
                    <li><strong>Elevated range:</strong> 50"</li>
                </ul>
            </div>
            <div className="accordion accordion-flush" id={idprefix+"artilleryaccordion"}>
                <div className="accordion-item">
                    <p className="accordion-header" id={idprefix+"artilleryheadingone"}>
                        <select className="artilleryselect" onChange={(event) => handleArtillerySelect(event)}>
                            <option key="0" value="notchosen">Select artillery</option>
                            <option key="1" value="battalion">Battalion mortars</option>
                            <option key="2" value="regimental">Regimental artillery</option>
                            <option key="3" value="divisional">Divisional artillery</option>
                        </select>
                    </p>
                    <div id={idprefix+"artillerycollapseone"} className={`accordion-collapse collapse ${showArtillery}`}  aria-labelledby={idprefix+"artilleryheadingone"} data-bs-parent={"#"+idprefix+"artilleryaccordion"}>
                        <div className="accordion-body p-0">
                            {RollForArtillery(artillery,idprefix, battalionOneLabel,battalionTwoLabel)}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h4 className="accordion-header" id={idprefix+"artilleryheadingtwo"}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#"+idprefix+"artillerycollapsetwo"} aria-expanded="false" aria-controls={idprefix+"artillerycollapsetwo"}>
                            Roll for accuracy
                        </button>
                    </h4>
                    <div id={idprefix+"artillerycollapsetwo"} className="accordion-collapse collapse" aria-labelledby={idprefix+"artilleryheadingtwo"} data-bs-parent={"#"+idprefix+"artilleryaccordion"}>
                        <div className="accordion-body p-0">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <td colSpan={4} className="text-center">Roll 2D6 and add the modifiers below:</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th colSpan={3}>Same aim point as last turn:</th>
                                        <td>+1</td>
                                    </tr>
                                    <tr>
                                        <th colSpan={3}>Spotter is commander or recon:</th>
                                        <td>-1</td>
                                    </tr>
                                    <tr>
                                        <th colSpan={3}>Aim point is a section at over 30":</th>
                                        <td>-1</td>
                                    </tr>
                                    <tr>
                                        <th colSpan={3}>JABO target in the open:</th>
                                        <td>+1</td>
                                    </tr>
                                    <tr>
                                        <th colSpan={3}>JABO target in buildings / woods:</th>
                                        <td>-1</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className={idprefix+"artilleryaccuracytable table table-striped"}>
                                <thead>
                                    <tr>
                                        <th colSpan={4}>Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>10+</th>
                                        <td colSpan={3}>Critical hit!</td>
                                    </tr>
                                    <tr>
                                        <th>7+</th>
                                        <td colSpan={3}>Zeroed in!</td>
                                    </tr>
                                    <tr>
                                        <th>6-3</th>
                                        <td colSpan={3}>Harassing!</td>
                                    </tr>
                                    <tr>
                                        <th>2 or less</th>
                                        <td colSpan={3}>Danger close!<br/>Roll 3D6" and move aim point the total score towards the nearest friendly section. Harassing fire.</td>
                                    </tr>
                                    {artillery === "battalion" ?
                                        <tr className="text-center">
                                            <td colSpan={4}>Any unmodified score of 4 or less: battalion mortars low on ammo.</td>
                                        </tr>
                                        :
                                        null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h4 className="accordion-header" id={idprefix+"artilleryheadingthree"}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#"+idprefix+"artillerycollapsethree"} aria-expanded="false" aria-controls={idprefix+"artillerycollapsethree"}>
                            Roll for hits
                        </button>
                    </h4>
                    <div id={idprefix+"artillerycollapsethree"} className="accordion-collapse collapse" aria-labelledby={idprefix+"artilleryheadingthree"} data-bs-parent={"#"+idprefix+"artilleryaccordion"}>
                        <div className="accordion-body px-0 py-0">
                            {RollForHits(idprefix)}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h4 className="accordion-header" id={idprefix+"artilleryheadingfour"}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#"+idprefix+"artillerycollapsefour"} aria-expanded="false" aria-controls={idprefix+"artillerycollapsefour"}>
                           Morale tests
                        </button>
                    </h4>
                    <div id={idprefix+"artillerycollapsefour"} className="accordion-collapse collapse" aria-labelledby={idprefix+"artilleryheadingfour"} data-bs-parent={"#"+idprefix+"artilleryaccordion"}>
                        <div className="accordion-body px-0 py-0">
                            {MoraleDisplay(idprefix)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

const RollForArtillery = (artillery, idprefix, battalionOneLabel, battalionTwoLabel) => {

    const regimentalSixRoll = (idprefix, battalionOneLabel, battalionTwoLabel) => {
        if (idprefix === "A"){
            if (battalionOneLabel === "US late war") {
                return (
                    <>
                        <td>Medium battery mission!<br/>If the spotter was a Company Commander, use battalion mortars.</td>
                    </>
                )
            } else if (battalionOneLabel === "German late war") {
                return (
                    <>
                        <td>Battalion mortars.</td>
                    </>
                )
            } else if (battalionOneLabel === "British late war") {
                return (
                    <>
                        <td>Medium battery mission!<br/>If the spotter was a Company Commander, use battalion mortars.</td>
                    </>
                )
            } else {
                return(<>
                <td></td>
                </>)
            }
        } else if(idprefix === "B") {
            if (battalionTwoLabel === "US late war") {
                return (
                    <>
                        <td>Medium battery mission!<br/>If the spotter was a Company Commander, use battalion mortars.</td>
                    </>
                )
            } else if (battalionTwoLabel === "German late war") {
                return (
                    <>
                        <td>Battalion mortars.</td>
                    </>
                )
            } else if (battalionTwoLabel === "British late war") {
                return (
                    <>
                        <td>Medium battery mission!<br/>If the spotter was a Company Commander, use battalion mortars.</td>
                    </>
                )
            } else {
                return(<>
                <td></td>
                </>)
            }
        }


    }

    const divisionalTenRoll = (idprefix, battalionOneLabel, battalionTwoLabel) => {
        if (idprefix === "A"){
            if (battalionOneLabel === "US late war") {
                return (
                    <>
                        <td>Time on Target! Heavy battery mission. Target unit takes 1 shock. A double 6 in any attack adds 1 shock.</td>
                    </>
                )
            } else if (battalionOneLabel === "German late war") {
                return (
                    <>
                        <td>Rockets!</td>
                    </>
                )
            } else if (battalionOneLabel === "British late war") {
                return (
                    <>
                        <td>Mike Mission! Heavy battery mission with 2 rerolls per attack.</td>
                    </>
                )
            } else {
                return(<>
                <td></td>
                </>)
            }
        } else if(idprefix === "B") {
            if (battalionTwoLabel === "US late war") {
                return (
                    <>
                        <td>Time on Target! Heavy battery mission. Target unit takes 1 shock. A double 6 in any attack adds 1 shock.</td>
                    </>
                )
            } else if (battalionTwoLabel === "German late war") {
                return (
                    <>
                        <td>Rockets!</td>
                    </>
                )
            } else if (battalionTwoLabel === "British late war") {
                return (
                    <>
                        <td>Mike Mission! Heavy battery mission with 2 rerolls per attack.</td>
                    </>
                )
            } else {
                return(<>
                <td></td>
                </>)
            }
        }
    }
    
    const divisionalSevenRoll = (idprefix, battalionOneLabel, battalionTwoLabel) => {
        if (idprefix === "A"){
            if (battalionOneLabel === "British late war" || battalionOneLabel === "US late war") {
                return (
                    <>
                        <td>If spotter is FO: Medium battery mission! Else as per 6 below.</td>
                    </>
                )
            } else {
                return(<>
                <td>No support received.</td>
                </>)
            }
        } else if(idprefix === "B") {
            if (battalionTwoLabel === "British late war" || battalionTwoLabel === "US late war") {
                return (
                    <>
                        <td>If spotter is FO: Medium battery mission! Else as per 6 below.</td>
                    </>
                )
            } else {
                return(<>
                <td>No support received.</td>
                </>)
            }
        }
    }


    if (artillery === "regimental") {
        return (
            <div>
            <table className={idprefix+"artilleryarrivaltable table table-striped"}>
                    <thead>
                        <tr>
                            <td className="text-center" colSpan={4}>
                                Roll 2D6 and consult the table below.<br />An artillery mission is only consumed on success.
                            </td>
                        </tr>
                        <tr>
                            <th>Score</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>12</th>
                            <td>Roll on the Divisional table. 7 or less = Medium battery fire mission.</td>
                        </tr>
                        <tr>
                            <th>7-11</th>
                            <td>Medium battery fire mission.</td>
                        </tr>
                        <tr>
                            <th>6</th>
                            {regimentalSixRoll(idprefix, battalionOneLabel, battalionTwoLabel)}
                        </tr>
                        <tr>
                            <th>5 or less</th>
                            <td>"No, that's map section three, not four!" No support received.</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    } else if (artillery === "divisional") {
        return (
            <div>
                <table className={idprefix+"artilleryarrivaltable table table-striped"}>
                    <thead>
                        <tr>
                            <td className="text-center" colSpan={4}>
                                Roll 2D6.<br />An artillery mission is only consumed on success.
                            </td>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th>Score</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>12</th>
                            <td>Jabos! 3 attacks</td>
                        </tr>
                        <tr>
                            <th>10-11</th>
                            {divisionalTenRoll(idprefix, battalionOneLabel, battalionTwoLabel)}
                        </tr>
                        <tr>
                            <th>8-9</th>
                            <td>Heavy battery fire mission</td>
                        </tr>
                        <tr>
                            <th>7</th>
                            {divisionalSevenRoll(idprefix, battalionOneLabel, battalionTwoLabel)}
                        </tr>
                        <tr>
                            <th>6 or less</th>
                            <td>"It's the radios Sir... we haven't been able to make contact!" No support received.</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

const RollForHits = (idprefix) => {
    
    const [artilleryID, setArtilleryID] = useState("notselected");
    const [unit,setUnit] = useState({
        "id": "",
        "name": "",
        "firepower": "",
        "radius": "",
        "specialrules": ""
    });

    useEffect (() => {

        if (artilleryID === "notselected") {
            setUnit(
                {
                    "id": "",
                    "name": "",
                    "firepower": "",
                    "radius": "",
                    "specialrules": ""
            }
            )
            return;
        }
        //fetch the data from artillery for the value selected
        artilleryData.artillery.forEach((item)=>{
            if (artilleryID === item.id) {
                setUnit({
                    "id": item.id,
                    "name": item.name,
                    "firepower": item.firepower,
                    "radius": item.radius,
                    "specialrules": item.specialrules,
                })
            }
        })

    },[artilleryID])

    return (
        <div>
            <p className={idprefix+"artilleryhitsselector"}>
                <select onChange={(event) => setArtilleryID(event.target.value)}>
                    <option key="0" value="notselected">Select Artillery</option>
                    <option key="1" value="ART01">Battalion Mortars</option>
                    <option key="2" value="ART02">Medium Battery</option>
                    <option key="3" value="ART03">Heavy Battery</option>
                    <option key="4" value="ART04">Heavy Howitzers</option>
                    <option key="5" value="ART05">Rockets</option>
                    <option key="6" value="ART06">Jabos</option>
                </select>
            </p>

            {artilleryID !== "notselected" &&
            <table className={idprefix+"artilleryhitsmodifiers table table-striped"}>
                <thead>
                    <tr>
                        <th>Firepower</th>
                        <td>{unit.firepower}</td>
                        <th>Radius</th>
                        <td>{unit.radius}</td>
                    </tr>
                    <tr>
                        <th>Modifiers</th>
                        <th colSpan={3}>Target is:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>+1D6</th>
                        <td colSpan={3}>Critical hit! +1D6 firepower against each target in beaten zone.<br/>Double 6 = +1 shock on aim point target.</td>
                    </tr>
                    {unit.id !== "ART03" && unit.id !== "ART04" && unit.id !== "ART05" && 
                    <>
                    <tr>
                        <th>-1D6</th>
                        <td colSpan={3}>In buildings or Medium AFV to Late Battle AFV.</td>
                    </tr>
                    </>}
                    <tr>
                        {unit.id === "ART03" || unit.id ==="ART04" ?
                        <th>-1D6</th>
                        :
                        <th>-2D6</th>
                        }
                        <td colSpan={3}>In trench / dug out, or Infantry AFV to Super-heavy AFV.</td>
                    </tr>
                    <tr>
                        <th>-3D6</th>
                        <td colSpan={3}>In pillbox / bunker</td>
                    </tr>
                    {unit.id === "ART01" &&
                    <tr>
                        <td colSpan={4}>Battalion mortars use harrasing fire against all Medium to Super-Heavy AFV targets regardless of accuracy.</td>
                    </tr>
                    }
                </tbody>
            </table>
        }
        </div>
    )

}

const MoraleDisplay = (idprefix) =>{
    return(
        <table className={idprefix +"artillerymoraletests table table-striped"}>
            <thead>
                <tr>
                    <td colSpan={4} className="text-center">Target rolls 1D6 to test for each successful hit.</td>
                </tr>
                <tr>
                    <th colSpan={2}>Target quality</th>
                    <th>Zeroed in</th>
                    <th>Harassing</th>
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
                        <td>4+</td>
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
                    <tr>
                        <td colSpan={4}>Following a regimental or divisional attack, all units in open / cover must retreat or take one additional shock to stay in position.</td>
                    </tr>
                </tbody>

        </table>
    )
}


export default ArtilleryContainer;