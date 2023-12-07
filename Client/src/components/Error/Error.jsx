
import {useNavigate} from "react-router-dom";

export default function Error(){
    const navigate = useNavigate();
    return(

        <div id="error" style={{ textAlign: 'center', marginTop: '300px' }}>
            <h1>Error 404</h1>
            <p>Page not found</p>
            <button onClick={()=>{navigate(`/`)}} className="home-button">Back to home</button>
        </div>
    )
}