import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import * as productService from "../../services/productService.js";
import * as commentService from "../../services/commentService.js";
import useForm from "../../hooks/useForm";
import AuthContext from "../../contexts/context.js";
import Buttons from "./Details-holder/likeButton.jsx";
import Comment from "./Comment/Comment.jsx";
import usePersistedState from "../../hooks/usePersistedState.js";

export default function Details(){
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const  {userId, email}  = useContext(AuthContext);
    const [auth, setAuth] = usePersistedState('auth', {});
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

    useEffect(() => {
        commentService.getAll(productId)
            .then((result) => {
                setComments(result)
            }).catch((e) => {
            alert(`Error: ${e.code} ${e.message}`);
        });
    });

    let image = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    if (product.imageUrl !== ""){
        image = product.imageUrl;
    }
    const addCommentHandler = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const newComment = commentService.create(productId, formData.get("comment")).then(() => {
            console.log(email);
            newComment.owner = {email} ;
        }).catch((e) => {
            alert(`Error: ${e.code} ${e.message}`);
        });
    }



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
                <div id="description">
                    <h3>Comment</h3>
                    {comments.map(comment => (
                        <Comment key={comment._id} {...comment} />
                    ))}
                    <form onSubmit={addCommentHandler}>
                        <span className="error">{errors.comment}</span>
                        <textarea name="comment" className="form-control bg-white rounded-top mb-4" rows="4" placeholder="Comment..."></textarea>
                        <button type="submit" className="btn color-darker-orange mb-2 w-100 p-3 fw-bold text-white">Add Comment</button>
                    </form>
                </div>
            </div>
            <div className="secondary-column">
                <div className="main-information">
                    <p>{`${product.creationDate}`}</p>
                    <div className="title">
                        <h1>{product.title}</h1>
                        <p>{product.category}</p>
                    </div>
                    <h2>{product.price} lv.</h2>
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