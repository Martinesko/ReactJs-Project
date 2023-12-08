import { useEffect, useState } from 'react';

import * as productService from "../../services/productService.js";
import CatalogItem from './Catalog-item/Catalog-item.jsx';

export default function Catalog(){
    const [products, setProduct] = useState([]);
    const [selectedSort, setSelectedSort] = useState("date-old-new");

    useEffect(() => {
        productService.getProducts()
            .then(result => setProduct(result));
    }, []);

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    };



    const sortAndFilterProducts = (products, sortOption) => {
        let sortedProducts = [...products];

        switch (sortOption) {
            case "date-old-new":
                sortedProducts.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
                break;
            case "date-new-old":
                sortedProducts.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
                break;
            case "price-low-high":
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case "price-high-low":
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case "category":
                sortedProducts.sort((a, b) => a.category.localeCompare(b.category));
                break;
                default:
                break;
        }

        return sortedProducts;
    };

    const sortedProducts = sortAndFilterProducts(products, selectedSort);

    return(
            <div className="catalog-container">
            <h1>Catalog</h1>

            <div className="sort">
                <select className="sortSelector" value={selectedSort} onChange={handleSortChange}>
                    <option value="date-old-new">Date (oldest first)</option>
                    <option value="date-new-old">Date (newest first)</option>
                    <option value="price-low-high">Price (lowest first)</option>
                    <option value="price-high-low">Price (highest first)</option>
                    <option value="category">Category</option>
                </select>
            </div>
            <div className="catalog">


                {sortedProducts.map(product=>(
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