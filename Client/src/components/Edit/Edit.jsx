import * as productService from "../../services/productService.js";
import {useNavigate, useParams} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/context.js";
import {getProduct} from "../../services/productService.js";

export default function Create(){
        const navigate = useNavigate();
        const { _id } = useParams();
        const productData = getProduct(_id);
        console.log(_id);
        const [product, setProduct] = useState({
            title: '',
            category: '',
            price: '',
            details: '',
            location: '',
            firstName: '',
            email: '',
            phoneNumber: '',
            creatorId: ''
        });

        useEffect(() => {
            productService.getProduct(_id)
                .then(result => {
                    setProduct(result)
                });
        }, [_id]);

    const editReviewSubmitHandler = async (e) => {
        e.preventDefault();

        const product = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await productService.edit(_id, product);

            navigate(`/details/${_id}`);
        } catch (err) {
            // Error notification
            console.log(err);
        }
    }

    const onChange = (e) => {
        setProduct(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    return(
        <div className="Create-container">
            <h1> Edit </h1>
            <form id="form" onSubmit={editReviewSubmitHandler}>
                <section>
                    <h2>Title</h2>
                    <div className="input">
                        <input onChange={onChange} id="title" name="title" placeholder="Enter the title of your listing" value={product.title}></input>
                    </div>


                    <h2>Category</h2>
                    <div className="selection">
                        <select onChange={onChange} id="category" name="category" value={product.category}>
                            <option>hello</option>
                        </select>
                    </div>
                    <h2>Price</h2>
                    <div className="input-price">
                        <input onChange={onChange} id="price" name="price" placeholder="Enter price" value={product.price}></input>
                    </div>

                </section>
                <section>
                    <h2>Photos</h2>
                    <textarea onChange={onChange} id="photo" name="photo" placeholder="Photo Url" value={product.image}></textarea>
                </section>
                <section>
                    <h2>Details</h2>
                    <div className="description">
                        <textarea onChange={onChange} id="details" name="details" placeholder="Enter the details of the product" value={product.details}></textarea>
                    </div>
                </section>
                <section>
                    <h2>Location</h2>
                    <div className="selection">
                        <select onChange={onChange} id="location" name="location" value={product.location}>
                            <option>Kyustendil</option>
                        </select>
                    </div>
                </section>
                <section>
                    <h2>First name</h2>
                    <div className="input">
                        <input onChange={onChange} id="firstName" name="firstName" placeholder="Enter your first name" value={product.firstName}></input>
                    </div>

                    <h2>Email</h2>
                    <div className="input">
                        <input onChange={onChange} id="email" name="email" placeholder="Enter your email" value={product.email}></input>
                    </div>

                    <h2>Phone number</h2>
                    <div className="input">
                        <input onChange={onChange} id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" value={product.phoneNumber}></input>
                    </div>
                </section>
                <section className="button-container">
                    <input onChange={onChange} type="submit" className="button" value={"Edit"} />
                </section>
            </form>
        </div>
    )
}