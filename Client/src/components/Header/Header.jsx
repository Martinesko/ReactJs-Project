import { Link } from 'react-router-dom';
import {useContext} from "react";
import AuthContext from "../../contexts/context.js";
import {useNavigate} from "react-router-dom";

export default function Header(){
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    if (userId !== undefined){
       return (
           <header>
               <img onClick={()=>{navigate(`/`)}} src="/images/logo.png" className="img"/>
               <div className="header">
                   <div id="left-side">
                   <Link to={`/`} className="nav-button">Home</Link>
                   <Link to={`/listings`} className="nav-button">Listings</Link>
               </div>
            <nav>

                <div id="user">
                    <Link to="/listings/add" className="nav-button">Create</Link>
                    <Link to="/yourlistings" className="nav-button">Your listings</Link>
                    <Link to="/logout" className="nav-button">Logout</Link>
                </div>
            </nav>
               </div>
        </header>
       )
    }
    else {
        return (
            <header>
                <img onClick={()=>{navigate(`/`)}} src="/images/logo.png" className="img"/>
                <div className="header">
                    <div id="left-side">
                    <Link to={`/listings`} className="nav-button">Listings</Link>
                    </div>
                    <nav>
                    <div id="guest">
                        <Link to="/login" className="nav-button">Login</Link>
                        <Link to="/register" className="nav-button">Register</Link>
                    </div>
                    </nav>
                </div>
            </header>
        );
    }
}