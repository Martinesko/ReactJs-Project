import {useEffect, useState} from "react";
import * as productService from "../../services/productService.js";
import * as authService from "../../services/authService.js";
import CatalogItem from "../Catalog/Catalog-item/Catalog-item.jsx";

export default function Liked(){
    const [userId] = useState([]);

    const [userLikedPosts, setUserLikedPosts] = useState([]);

    useEffect(() => {
        const fetchUserLikedPosts = async () => {
            const userLikedPosts = await productService.getUserLikedPosts(userId);
            setUserLikedPosts(userLikedPosts);
        };

        fetchUserLikedPosts();
    }, [userId]);
    return(
        <div className="catalog-container">
            <h1>Catalog</h1>
            <div className="catalog">
                {userLikedPosts.map(product=>(
                    <CatalogItem key={product._id} {...product}/>
                ))
                }
                {
                    userLikedPosts.length === 0 && (
                        <h3 className="no-products">No products yet</h3>
                    )
                }


            </div>
        </div>


    )
}