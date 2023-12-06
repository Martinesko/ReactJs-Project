import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";



import * as productService from "../../services/productService.js";

export default function Details(){

    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const {productId} = useParams();
    useEffect(() => {
        productService.getProduct(productId)
            .then(result => setProduct(result));
    }, );
    const handleCallNow = () => {
        window.location.href = `tel:${product.phoneNumber}`;
    };
    return(
        <div className="details-container">
            <div className="main-column">
                <div className="images">
                    <img src={product.imageUrl}/>
                </div>
                <div id="description">
                    <h3>Description</h3>
                    <p>{product.details}</p>
                </div>
            </div>
            <div className="secondary-column">
                <div className="main-information">
                    <p>Added December 23, 2022</p>
                    <h1>{product.title}</h1>
                    <h2>{product.price} лв.</h2>
                    <div className="like-holder">
                        <button id="callnow" onClick={handleCallNow} className="button">Call now</button>
                        <button id="like" className="button-like">❤</button>
                    </div>
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