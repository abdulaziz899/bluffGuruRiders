import React from 'react';
import RidersLogo from "../../images/Urban Riders.png"
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { userContext } from '../../App';
import { useContext } from 'react';
const Header = () => {
    const [logInUser,setLogInUser]=useContext(userContext);
    console.log(logInUser.success);
    return (
            <Navbar className="navbar" bg="light" variant="dark ">
                <div className="headerContainer">
                    <div >
                        <Navbar.Brand ><img className="riderLogo" src={RidersLogo} alt=""/> </Navbar.Brand>
                    </div>
                    <div className="headerDetails">
                            <p><Link to="/home">Home</Link></p>
                            <p><Link to="/destination">Destination</Link></p>
                            <p><Link to="/blog">Blog</Link></p>
                            <p><Link to="/contact">Contact</Link></p>
                            {logInUser.success ?<span className=" pt-4 text-danger fs-6 ">{logInUser.name} </span>:<p><Link className="bg-success px-4 rounded-pill py-1" to="/login">Login</Link></p>}
                    </div>
                </div>
            </Navbar>
    );
};

export default Header;