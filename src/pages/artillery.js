import React, {useState, useEffect, useRef} from 'react';
import NotSelected from '../components/notselected.js';

const ArtilleryContainer = () => {

    const [battalionOneLabel, setBattalionOneLabel] = useState(null);
    const [battalionTwoLabel, setBattalionTwoLabel] = useState(null);
    const [selectedBattalion, setSelectedBattalion] = useState(null);
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
    if (battalionOneLabel == null && battalionTwoLabel == null) {
        return (
            <NotSelected type="artillery"/>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <ArtilleryAccordion idprefix={idprefix.current} selectedBattalion={selectedBattalion} battalionOneLabel={battalionOneLabel} battalionTwoLabel={battalionTwoLabel} swapBattalion={swapBattalion}/>
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
                    <h4 className="accordion-header" id={idprefix+"artilleryheadingone"}>
                        <select className="artilleryselect" onChange={(event) => handleArtillerySelect(event)}>
                            <option key="0" value="notchosen">Select artillery</option>
                            <option key="1" value="battalion">Battalion mortars</option>
                            <option key="2" value="regimental">Regimental artillery</option>
                            <option key="3" value="divisional">Divisional artillery</option>
                        </select>
                    </h4>
                    <div id={idprefix+"artillerycollapseone"} className={`accordion-collapse collapse ${showArtillery}`}  aria-labelledby={idprefix+"artilleryheadingone"} data-bs-parent={"#"+idprefix+"artilleryaccordion"}>
                        <div className="accordion-body p-0">
                            {RollForArtillery(artillery,idprefix)}
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
                                        <th colSpan={4}>Roll 2D6</th>
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
                        </div>
                    </div>
                </div>




            </div>




        </div>
    )


}

const RollForArtillery = (artillery,idprefix) => {
    if (artillery === "regimental") {
        return (
            <div>
            <table className="table">
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center" colSpan={4}>
                                Roll 2D6.<br />An artillery mission is only consumed on success.
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>Score</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>12</td>
                            <td>Roll on the Divisional table. 7 or less = Medium battery fire mission.</td>
                        </tr>
                        <tr>
                            <td>7-11</td>
                            <td>Medium battery fire mission.</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>NATION SPECIFIC</td>
                        </tr>
                        <tr>
                            <td>5 or less</td>
                            <td>"No, that's map section three, not four!" No support received.</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    } else if (artillery === "divisional") {
        return (
            <div>
                <table className="table">
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center" colSpan={4}>
                                Roll 2D6.<br />An artillery mission is only consumed on success.
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>Score</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>12</td>
                            <td>Jabos! 3 attacks</td>
                        </tr>
                        <tr>
                            <td>10-11</td>
                            <td>NATION SPECIFIC</td>
                        </tr>
                        <tr>
                            <td>8-9</td>
                            <td>Heavy battery fire mission</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>NATION SPECIFIC</td>
                        </tr>
                        <tr>
                            <td>6 or less</td>
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

export default ArtilleryContainer;