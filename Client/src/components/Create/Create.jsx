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
                imageUrl: tempData.photo,
                creationDate:new Date(),
                _ownerId: userId
        }

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
                <input id="price" name="price" placeholder="Enter price"></input>
            </div>

            </section>
            <section>
                <h2>Photos</h2>
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
                    <option value="blagoevgrad">Blagoevgrad</option>
                    <option value="burgas">Burgas</option>
                    <option value="varna">Varna</option>
                    <option value="veliko_tarnovo">Veliko Tarnovo</option>
                    <option value="vidin">Vidin</option>
                    <option value="vraca">Vratsa</option>
                    <option value="gabrovo">Gabrovo</option>
                    <option value="dobrich">Dobrich</option>
                    <option value="kardzhali">Kardzhali</option>
                    <option value="kyustendil">Kyustendil</option>
                    <option value="lovech">Lovech</option>
                    <option value="montana">Montana</option>
                    <option value="pazardzhik">Pazardzhik</option>
                    <option value="pernik">Pernik</option>
                    <option value="pleven">Pleven</option>
                    <option value="plovdiv">Plovdiv</option>
                    <option value="razgrad">Razgrad</option>
                    <option value="ruse">Ruse</option>
                    <option value="silistra">Silistra</option>
                    <option value="sliven">Sliven</option>
                    <option value="smolyan">Smolyan</option>
                    <option value="sofia">Sofia</option>
                    <option value="stara_zagora">Stara Zagora</option>
                    <option value="targovishte">Targovishte</option>
                    <option value="haskovo">Haskovo</option>
                    <option value="shumen">Shumen</option>
                    <option value="yambol">Yambol</option>
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