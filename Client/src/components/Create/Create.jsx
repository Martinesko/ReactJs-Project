import * as productService from "../../services/productService.js";
import { useNavigate } from 'react-router-dom';
import {useContext} from "react";
import AuthContext from "../../contexts/context.js";
export default function Create(){
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);

    if(userId !== ""){
        navigate('/');
    }

    const productSubmitHandler = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const hasEmptyFields = Array.from(formData.entries()).some(([key, value]) => {
            return value.trim() === "";
        });

        if (hasEmptyFields) {
            alert("Please fill in all required fields.");
            return;
        }

        const priceValue = formData.get("price");
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

        const imageUrlValue = formData.get("photo");
        if (imageUrlValue && !(await isValidImageUrl(imageUrlValue))) {
            alert("Please enter a valid image URL.");
            return;
        }

        const emailValue = formData.get("email");
        if (!isValidEmail(emailValue)) {
            alert("Please enter a valid email address.");
            return;
        }

        const phoneNumberValue = formData.get("phoneNumber");
        if (!isValidPhoneNumber(phoneNumberValue)) {
            alert("Please enter a valid phone number (10 digits without spaces or special characters).");
            return;
        }

        function formatDate(isoDate) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };

            return new Date(isoDate).toLocaleDateString(undefined, options);
        }
        const date = formatDate(new Date());
        const productData = {
            title: formData.get("title"),
            category: formData.get("category"),
            price: formData.get("price"),
            details: formData.get("details"),
            location: formData.get("location"),
            firstName: formData.get("firstName"),
            email: formData.get("email"),
            phoneNumber: formData.get("phoneNumber"),
            imageUrl: formData.get("photo"),
            creationDate: `Added ${date}`,
            _ownerId: userId,
        };

        try {
            await productService.create(productData);
            alert("You have successfully created your listing!")
            navigate(`/listings`);
        } catch (err) {
            alert(err);
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
                <input id="price" name="price" placeholder="Enter price"></input>
            </div>

            </section>
            <section>
                <h2>Photo</h2>
                <div className="description">
                <textarea id="photo" name="photo" placeholder="Photo Url"></textarea>
                 </div>
            </section>
            <section>
                <h2>Details</h2>
                <div className="description">
                   <textarea id="details" name="details" placeholder="Enter the details of the product"></textarea>
                </div>
            </section>
            <section>
                <h2>Districts</h2>
                <div className="selection">
                <select id="location" name="location">
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