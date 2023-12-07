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
            creatorId: ''
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
                            <option value="real_estate">Real Estate</option>
                            <option value="vehicles">Cars, Caravans, Boats</option>
                            <option value="auto_parts">Auto Parts, Accessories, Tires, and Rims</option>
                            <option value="electronics">Electronics</option>
                            <option value="sports_books_hobbies">Sports, Books, Hobbies</option>
                            <option value="pets">Pets</option>
                            <option value="home_garden">Home and Garden</option>
                            <option value="fashion">Fashion</option>
                            <option value="baby_child">For Babies and Children</option>
                            <option value="tours_vacations">Tours, Vacations</option>
                            <option value="services">Services</option>
                            <option value="machinery_tools">Machinery, Tools, Business Equipment</option>
                            <option value="jobs">Jobs</option>
                            <option value="free">Free/Giveaways</option>
                            <option value="laptops_computers">Laptops and Computers</option>
                            <option value="accommodation">Accommodation for Christmas and New Year</option>
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