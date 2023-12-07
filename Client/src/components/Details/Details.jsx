import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import * as productService from "../../services/productService.js";
import AuthContext from "../../contexts/context.js";
import Buttons from "./Details-holder/likeButton.jsx";

export default function Details(){
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const  {userId}  = useContext(AuthContext);
    const {productId} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await productService.getProduct(productId);
                setProduct(result);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    let image = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    if (product.imageUrl !== ""){
        image = product.imageUrl;
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return(
        <div className="details-container">
            <div className="main-column">
                <div className="images">
                    <img src={image}/>
                </div>
                <div id="description">
                    <h3>Description</h3>
                    <p>{product.details}</p>
                </div>
            </div>
            <div className="secondary-column">
                <div className="main-information">
                    {/*<p>{`Added ${months[product.creationDate.getMonth()]} ${product.creationDate.getDate()}, ${product.creationDate.getFullYear()}`}</p>*/}
                    <h1>{product.title}</h1>
                    <h2>{product.price} лв.</h2>
                    <Buttons product={product} userId={userId}/>
                </div>
                <div className="seller-container">
                    <h4>Seller</h4>
                    <div className="seller-information">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"/>
                            <h4>{product.firstName}</h4>
                    </div>
                </div>
                <div className="location-container">
                    <h4>Location</h4>
                    <h4>{product.location} District</h4>
                </div>
            </div>
        </div>
    )
}