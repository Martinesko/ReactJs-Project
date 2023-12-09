import * as productService from "../../../services/productService.js";
import { useNavigate } from 'react-router-dom';

export default  function CatalogItem(value){
    const navigate = useNavigate();
    const productRemoveHandler = async () => {
           const shouldDelete = window.confirm('Are you sure you want to delete this product?');
           if (shouldDelete){
           await productService.removeProduct(value._id);
        }

        }
        let image = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    if (value.imageUrl !== ""){
        image = value.imageUrl;
    }

return (
    <div className="listing">
        <img className="catalog-image" src={image}/>
              <div className="information-Container-your">
            <h3 className="listing-title">{value.title}</h3>
            <h3 className="price">{value.price} lv.</h3>
            <p>{value.location} district</p>
        </div>
        <div className="buttons">
        <button id = "edit" onClick={()=>{navigate(`edit/${value._id}`)}} className="button" >Edit</button>
        <button id ="delete" onClick={productRemoveHandler} className="button" >Delete</button>
    </div>
    </div>
)
}