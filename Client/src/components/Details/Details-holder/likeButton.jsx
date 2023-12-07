import usePersistedState from "../../../hooks/usePersistedState.js";
import {useNavigate} from "react-router-dom";

export default function Buttons({ userId ,product }){
    const navigate = useNavigate();
    const callHandle = () => {
        window.location.href = `tel:${product.phoneNumber}`;
    };
    const emailHandle = () => {
        window.location.href = `mailto:${product.email}`;
    };
    const registerHandle = () => {
        alert("Please register to get access to this function")
        navigate(`/register`);
    };

    if (userId !== undefined){
        return(
            <div id="con">
                <button id="callnow" onClick={callHandle} className="button">Call now</button>
                <button id="edit" onClick={emailHandle} className="button">Email</button>
            </div>
        )
    }
    else{
        return(
            <div id="con">
                <button id="callnow" onClick={registerHandle} className="button">Call now</button>
                <button id="edit" onClick={registerHandle} className="button">Email</button>
            </div>
            )
    }

}