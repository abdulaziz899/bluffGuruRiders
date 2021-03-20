import React, { useContext } from 'react';
import "./Home.css";
import { useEffect } from 'react';
import FakeData from "../../FakeData/FakeData.json"
import Travel from '../Travel/Travel';
import backgroundImg from "../../images/Bg.png"
import { userContext } from '../../App';

const Home = () => {
    const [traveling,setTraveling]=useContext(userContext);
    useEffect(() => {
        setTraveling(FakeData);
    }, [])
    return (
                <div style={{backgroundSize:"cover",width:"100%",height:"150vh" ,backgroundPosition :"center",backgroundRepeat:'no-repeat', backgroundImage: `url(${backgroundImg })`}} className="travelContainer">
                     {
                            traveling.map(data=><Travel key={data.name}  data={data}></Travel>)
                    }
                </div>
        
    );
};

export default Home;