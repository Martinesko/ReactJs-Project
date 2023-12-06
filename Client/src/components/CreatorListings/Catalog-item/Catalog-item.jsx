import * as productService from "../../../services/productService.js";
import { useNavigate } from 'react-router-dom';

export default  function CatalogItem(key){
    const navigate = useNavigate();
    const productRemoveHandler = async () => {
        await productService.removeProduct(key._id);
        }
console.log(key._id);

return (
    <div className="listing">
        <img className="catalog-image" src={key.imageUrl}/>
              <div className="information-Container">
            <h3 className="listing-title">{key.title}</h3>
            <h3 className="price">{key.price} лв.</h3>
            <p>{key.location} district</p>
            <div className="buttons">
                <button id = "edit" onClick={()=>{navigate(`edit/${key._id}`)}} className="button" >Edit</button>
                <button id ="delete" onClick={productRemoveHandler} className="button" >Delete</button>
            </div>

        </div>
    </div>
)
}