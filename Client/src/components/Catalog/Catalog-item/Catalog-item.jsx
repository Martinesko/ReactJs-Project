export default  function CatalogItem({_id,title,price,location,imageUrl}){
    return (
    <div className="listing">
        <img className="catalog-image" src={imageUrl}/>
          <div className="information-Container">
            <h3 className="listing-title">{title}</h3>
            <h3 className="price">{price} лв.</h3>
            <p>{location} district</p>
            <div className="button-holder">
                <button className="button" onClick={() => window.location.href=`http://127.0.0.1:5173/details/${_id}`}>Show</button>
            </div>

        </div>
    </div>
)
}