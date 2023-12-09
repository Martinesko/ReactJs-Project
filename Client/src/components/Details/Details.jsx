import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import * as productService from "../../services/productService.js";
import * as commentService from "../../services/commentService.js";
import AuthContext from "../../contexts/context.js";
import Buttons from "./Details-holder/likeButton.jsx";
import Comment from "./Comment/Comment.jsx";
import usePersistedState from "../../hooks/usePersistedState.js";

export default function Details(){
    const [product, setProduct] = useState({});
    const [comments, setComments] = useState([]);
    const [commentsCount, setCommentsCount] = useState(0);
    const  {userId, email}  = useContext(AuthContext);
    const {productId} = useParams();


    useEffect( () => {

             productService.getProduct(productId).then((result)=>{
                 setProduct(result)}).catch((error) => {
                     console.error("Error fetching product:", error);
                 })

    }, [productId]);

    useEffect(() => {
        commentService.getAll(productId)
            .then((result) => {
                setComments(result)
                setCommentsCount(result.length)
            }).catch((e) => {
            alert(`Error: ${e.code} ${e.message}`);
        });
    },[commentsCount]);

    let image = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    if (product.imageUrl !== ""){
        image = product.imageUrl;
    }
    const addCommentHandler = (event) => {
        event.preventDefault();
        const commentForm = Object.fromEntries(new FormData(document.getElementById("comment-form")));
        const newComment = commentService.create(productId, commentForm.comment).then(() => {
            setCommentsCount(commentsCount+1);
            newComment.owner = {email} ;
        }).catch((e) => {
            alert(`Error: ${e.code} ${e.message}`);
        });

        document.getElementById("comment").value = "";
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
                    <h3>Comments ({commentsCount})</h3>
                    <div className="comments">
                        {comments.map(comment => (
                            <Comment key={comment._id} {...comment} />
                        ))}
                    </div>

                    <form id="comment-form" className="comment-holder" onSubmit={addCommentHandler}>
                        <textarea id="comment" name="comment" className="comment-input" placeholder="Comment..."></textarea>
                        <button type="submit" className="sent-button">Send</button>
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