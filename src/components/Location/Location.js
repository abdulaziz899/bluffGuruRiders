import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { userContext } from '../../App';
import "./Location.css"
import peopleIcon from "../../images/peopleicon.png";
import mapImg from "../../images/Map.png";
const Location = () => {
    const [traveling,setTraveling]=useContext(userContext);
    console.log(traveling);
    const {travelingWayName}=useParams();
    console.log("object,",traveling);
    return (
        <div className="container d-flex justify-content-around">
            <div className="w-50 m-1">
                <div className="bg-danger w-100 p-2 text-center">
                    <p>Mirpur 1</p>
                    <p>Dhanmondi</p>
                </div>
                <div className="d-flex justify-content-around w-100 bg-light p-2">
                    <span><img className="peopleIconControl" src={peopleIcon} alt=""/> <b>4</b> </span>
                    <p>$67</p>
                </div>
                <div className="d-flex justify-content-around w-100 bg-light p-2">
                    <span><img className="peopleIconControl" src={peopleIcon} alt=""/> <b>4</b> </span>
                    <p>$67</p>
                </div>
                <div className="d-flex justify-content-around w-100 bg-light p-2">
                    <span><img className="peopleIconControl" src={peopleIcon} alt=""/> <b>4</b> </span>
                    <p>$67</p>
                </div>
                </div>
                <img className="w-75 h-50" src={mapImg} alt=""/>
            </div>
    );
};

export default Location;