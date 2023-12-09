import {Link} from "react-router-dom";

export default  function CatalogItem({_id,title,price,location,imageUrl}){

    let image = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    if (imageUrl !== ""){
        image = imageUrl;
    }
    return (
    <div className="listing">
        <img className="catalog-image" src={image}/>
          <div className="information-Container">
            <h3 className="listing-title">{title}</h3>
            <h3 className="price">{price} lv.</h3>
            <p>{location} district</p>
        </div><
        div className="button-holder">
        <Link to={`/details/${_id}`} className="button">Show</Link>
    </div>
    </div>
)
}