import {useContext, useEffect, useState} from 'react';

import * as productService from "../../services/productService.js";
import CatalogItem from './Catalog-item/Catalog-item.jsx';
import AuthContext from "../../contexts/context.js";

export default function YourListings(){
    const [products, setProduct] = useState([]);
    const  {userId}  = useContext(AuthContext);
    useEffect(() => {
        productService.getUserProducts(userId)
            .then(result => setProduct(result));
    }, []);
    return(
        <div className="catalog-container">
            <h1>Your Listings</h1>
            <div className="catalog">
                {products.map(product=>(

                    <CatalogItem key={product._id} {...product}/>
                ))
                }
                {
                    products.length === 0 && (
                        <h3 className="no-products">No products yet</h3>
                    )
                }


            </div>
        </div>


    )
}