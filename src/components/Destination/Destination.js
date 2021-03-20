import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import mapImg from "../../images/Map.png";
import peopleIcon from "../../images/peopleicon.png";
import "./Destination.css";
import FakeData from "../../FakeData/FakeData.json"
const Destination = () => {
    const {travelingWayName}=useParams();
    const travelWay=FakeData.find(travel=>travel.name===travelingWayName);
    const [toggle,setToggle]=useState(false)
    const [address,setAddress]=useState({
        PickFrom:"",
        PickTo:""
    })
    // const { register, handleSubmit, watch, errors } = useForm();
    const handleSubmit = (e) =>{
        if (address.PickFrom && address.PickTo) {
            const newUserInfo={...address};
            setAddress(newUserInfo);
            console.log(newUserInfo);
        }
        e.preventDefault();
    }
    const handleBlur=(e)=>{
    let isFieldValid=true;
    if(e.target.name==="PickFrom"){
      isFieldValid=(e.target.value);
      console.log(isFieldValid)
    }
    if(e.target.name==="PickTo"){
      isFieldValid=(e.target.value)
      console.log(isFieldValid)
    }

   if(isFieldValid){
     const newUserInfo={...address};
     newUserInfo[e.target.name]=e.target.value;
     setAddress(newUserInfo);
     console.log(newUserInfo);
   }
    }
  return (
      <div className="container destinationContainer">
            <div>
              { toggle?<div className=" m-1">
                <div className="bg-danger  p-2 text-center">
                    <p>{address.PickFrom}</p>
                    <p> <b>To</b> </p>
                    <p>{address.PickTo}</p>
                </div>
                <div className=" travelWayControl ">
                    <img src={travelWay.img} alt=""/>
                    <h3>{travelWay.name}</h3>
                    <span><img className="peopleIconControl" src={peopleIcon} alt=""/> <b>4</b> </span>
                    <p>$67</p>
                </div>
                <div className=" travelWayControl ">
                    <img src={travelWay.img} alt=""/>
                    <h3>{travelWay.name}</h3>
                    <span><img className="peopleIconControl" src={peopleIcon} alt=""/> <b>4</b> </span>
                    <p>$67</p>
                </div>
                <div className=" travelWayControl ">
                    <img  src={travelWay.img} alt=""/>
                    <h3>{travelWay.name}</h3>
                    <span><img className="peopleIconControl" src={peopleIcon} alt=""/> <b>4</b> </span>
                    <p>$67</p>
                </div>
                </div>
            : <div>
                <form className="bg-dark w-100 h-25 p-3" onSubmit={handleSubmit}>
                    <p>Pick From</p>
                    <input onBlur={handleBlur} name="PickFrom" required className="w-100"   placeholder="Pick From" /> <br/>
                    <p>Pick To</p>
                    <input onBlur={handleBlur} name="PickTo" required className="w-100"   placeholder="Pick To"/> <br/>
                    <input type="submit" onClick={()=>setToggle(!toggle)} value="submit" name="" id=""/>
                </form>
            </div> }
            </div>
            <div>
                
                <img className="mapControl" src={mapImg} alt=""/>
            </div>
        </div>
    );
};

export default Destination;