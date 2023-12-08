import AuthContext from "../../contexts/context.js";
import {useContext} from "react";

export default function Home(){
    const { userId } = useContext(AuthContext);
    return(
        <div className="home-container">
            <div className="title-container">
                <div className="Title">
                    <h1>Welcome to my online reselling store :)</h1>
                    <p>Here you can find variety of thing </p>
                </div>

            </div>
        </div>
    )
}