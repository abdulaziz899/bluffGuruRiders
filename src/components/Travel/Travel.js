import { useState } from 'react';
import { useHistory } from 'react-router';
import "./Travel.css";

const Travel = (props) => {
    console.log(props);
    const [cart,setCart]=useState(props.data)
        const {name,img} =props.data;
        let history = useHistory();
        const handleTraveling=(travelingWayName)=>{
            history.push(`/destination/${travelingWayName}`);
            setCart();
            console.log("new ans",cart);
        }
    return (
        <div className="travelDetailsContainer">
            <div onClick={()=>handleTraveling(name)} className="travelDetails">
                <img src={img} alt=""/>
                <h2>{name}</h2>
            </div>
        </div>
    );
};

export default Travel;