import * as productService from "../../services/productService.js";
import {useNavigate, useParams} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/context.js";
import {getProduct} from "../../services/productService.js";

export default function Edit(){
        const navigate = useNavigate();
        const { _id } = useParams();

    const { userId } = useContext(AuthContext);

        const [product, setProduct] = useState({
            title: '',
            category: '',
            price: '',
            details: '',
            imageUrl: '',
            location: '',
            firstName: '',
            email: '',
            phoneNumber: '',
            creatorId: '',
        });

        useEffect(() => {
            productService.getProduct(_id)
                .then(result => {
                    setProduct(result);
                    if (result._ownerId !== userId) {
                       return navigate("/");
                    }
                });

        }, [_id]);

    const editReviewSubmitHandler = async (e) => {
        e.preventDefault();

        const product = Object.fromEntries(new FormData(e.currentTarget));

        const hasEmptyFields = Array.from(product).some(([key, value]) => {
            return value.trim() === "";
        });

        if (hasEmptyFields) {
            alert("Please fill in all required fields.");
            return;
        }

        const priceValue = product.price;
        if (!/^\d+(\.\d{1,2})?$/.test(priceValue)) {
            alert("Please enter a valid numeric price.");
            return;
        }
        const isValidEmail = (email) => {
            // Use a regular expression for basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
        const isValidPhoneNumber = (phoneNumber) => {
            // Use a regular expression for basic phone number validation
            const phoneRegex = /^\d{10}$/;
            return phoneRegex.test(phoneNumber);
        };

        const isValidImageUrl = async (url) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
            });
        };

        const imageUrlValue = product.imageUrl;
        if (imageUrlValue && !(await isValidImageUrl(imageUrlValue))) {
            alert("Please enter a valid image URL.");
            return;
        }



        const emailValue = product.email;
        if (!isValidEmail(emailValue)) {
            alert("Please enter a valid email address.");
            return;
        }

        const phoneNumberValue = product.phoneNumber;
        if (!isValidPhoneNumber(phoneNumberValue)) {
            alert("Please enter a valid phone number (10 digits without spaces or special characters).");
            return;
        }
        function formatDate(isoDate) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };

            return new Date(isoDate).toLocaleDateString(undefined, options);
        }
        product.creationDate = `Edited on ${formatDate(new Date())}`;

        try {
            await productService.edit(_id, product);
            alert("You have successfully edited your listing!")
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
                            <option value="Real Estate">Real Estate</option>
                            <option value="Cars, Caravans, Boats">Cars, Caravans, Boats</option>
                            <option value="Auto Parts, Accessories, Tires, and Rims">Auto Parts, Accessories, Tires, and Rims</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Sports, Books, Hobbies">Sports, Books, Hobbies</option>
                            <option value="Pets">Pets</option>
                            <option value="Home and Garden">Home and Garden</option>
                            <option value="Fashion">Fashion</option>
                            <option value="For Baby and Children">For Babies and Children</option>
                            <option value="Tours and vacations">Tours, Vacations</option>
                            <option value="Services">Services</option>
                            <option value="Machinery, Tools, Business Equipment">Machinery, Tools, Business Equipment</option>
                            <option value="Jobs">Jobs</option>
                            <option value="Laptops and  computers">Laptops and Computers</option>
                            <option value="Accommodation for Christmas and New Year">Accommodation for Christmas and New Year</option>
                        </select>
                    </div>
                    <h2>Price</h2>
                    <div className="input-price">
                        <input onChange={onChange} id="price" name="price" placeholder="Enter price" value={product.price}></input>
                    </div>

                </section>
                <section>
                    <h2>Photos</h2>
                    <div className="description">
                    <textarea onChange={onChange} id="imageUrl" name="imageUrl" placeholder="Photo Url" value={product.imageUrl}></textarea>
                    </div>
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
                                <option value="Burgas">Burgas</option>
                                <option value="Varna">Varna</option>
                                <option value="Veliko Tarnovo">Veliko Tarnovo</option>
                                <option value="Vidin">Vidin</option>
                                <option value="Vratsa">Vratsa</option>
                                <option value="Gabrovo">Gabrovo</option>
                                <option value="Dobrich">Dobrich</option>
                                <option value="Kardzhali">Kardzhali</option>
                                <option value="Kyustendil">Kyustendil</option>
                                <option value="Lovech">Lovech</option>
                                <option value="Montana">Montana</option>
                                <option value="Pazardzhik">Pazardzhik</option>
                                <option value="Pernik">Pernik</option>
                                <option value="Pleven">Pleven</option>
                                <option value="Plovdiv">Plovdiv</option>
                                <option value="Razgrad">Razgrad</option>
                                <option value="Ruse">Ruse</option>
                                <option value="Silistra">Silistra</option>
                                <option value="Sliven">Sliven</option>
                                <option value="Smolyan">Smolyan</option>
                                <option value="Sofia">Sofia</option>
                                <option value="Stara Zagora">Stara Zagora</option>
                                <option value="Targovishte">Targovishte</option>
                                <option value="Haskovo">Haskovo</option>
                                <option value="Shumen">Shumen</option>
                                <option value="Yambol">Yambol</option>
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