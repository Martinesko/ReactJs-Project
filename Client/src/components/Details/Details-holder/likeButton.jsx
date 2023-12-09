import usePersistedState from "../../../hooks/usePersistedState.js";
import {useNavigate} from "react-router-dom";

export default function Buttons(values){
    const navigate = useNavigate();
    const callHandle = () => {
        window.location.href = `tel:${values.product.phoneNumber}`;
    };
    const emailHandle = () => {
        window.location.href = `mailto:${values.product.email}`;
    };
    const registerHandle = () => {
        alert("Please login to get access to this function")
        navigate(`/login`);
    };

    if (values.userId !== undefined){
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