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
        if (selectedBattalion == battalionOneLabel) {
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
            <div className={idprefix+"artilleryaccordion"}>



            </div>




        </div>
    )


}

export default ArtilleryContainer;