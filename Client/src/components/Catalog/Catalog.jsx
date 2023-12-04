import { useEffect, useState } from 'react';

import * as productService from "../../services/productService.js";
import CatalogItem from './Catalog-item/Catalog-item.jsx';

export default function Catalog(){
    const [products, setProduct] = useState([]);

    useEffect(() => {
        productService.getProducts()
            .then(result => setProduct(result));
    }, []);
    return(
        <div className="catalog-container">
            <h1>Catalog</h1>
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