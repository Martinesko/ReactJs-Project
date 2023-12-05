import * as productService from "../../services/productService.js";
import { useNavigate } from 'react-router-dom';
import {useContext} from "react";
import AuthContext from "../../contexts/context.js";
export default function Create(){
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    console.log(userId);

    const productSubmitHandler = async (values) => {
        event.preventDefault();
        const tempData = Object.fromEntries(new FormData(values.currentTarget));
        const productData = {
              title: tempData.title,
                category: tempData.category,
                price: tempData.price,
                details: tempData.details,
                location: tempData.location,
                firstName: tempData.firstName,
                email: tempData.email,
                phoneNumber: tempData.phoneNumber,
                _ownerId: userId
        }
        console.log(productData);

        try{
            await productService.create(productData);

            navigate(`catalog`);
        }
        catch(err){
            console.log(err);
            navigate("/");
        }
    };
    return(
        <div className="Create-container">
        <h1> Add Listing </h1>
            <form id="form" onSubmit={productSubmitHandler}>
            <section>
                <h2>Title</h2>
                <div className="input">
                    <input id="title" name="title" placeholder="Enter the title of your listing"></input>
                </div>


                <h2>Category</h2>
                <div className="selection">
                    <select id="category" name="category">
                        <option>hello</option>
                    </select>
                </div>
                <h2>Price</h2>
                <div className="input-price">
                <input id="price" name="price" placeholder="Enter price"></input>
            </div>

            </section>
            <section>
                <h2>Photos</h2>
                <textarea id="photo" name="photo" placeholder="Photo Url"></textarea>
            </section>
            <section>
                <h2>Details</h2>
                <div className="description">
                   <textarea id="details" name="details" placeholder="Enter the details of the product"></textarea>
                </div>
            </section>
            <section>
                <h2>Location</h2>
                <div className="selection">
                <select id="location" name="location">
                    <option>Kyustendil</option>
                </select>
                </div>
            </section>
            <section>
                <h2>First name</h2>
                <div className="input">
                    <input id="firstName" name="firstName" placeholder="Enter your first name"></input>
                </div>

                <h2>Email</h2>
                <div className="input">
                    <input id="email" name="email" placeholder="Enter your email"></input>
                </div>

                <h2>Phone number</h2>
                <div className="input">
                    <input id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number"></input>
                </div>
            </section>
            <section className="button-container">
                <input type="submit" className="button" value={"Add Listing"} />
            </section>
            </form>
        </div>
    )
}