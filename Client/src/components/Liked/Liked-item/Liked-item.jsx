export default function LikedItem(value){
    let image = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    if (value.imageUrl !== ""){
        image = value.imageUrl;
    }
    return (
        <div className="listing">
            <img className="catalog-image" src={image}/>
            <div className="information-Container">
                <h3 className="listing-title">{value.title}</h3>
                <h3 className="price">{value.price} лв.</h3>
                <p>{value.location} district</p>
                <div className="button-holder">
                    <button className="button" onClick={() => window.location.href=`http://127.0.0.1:5173/details/${value._id}`}>Show</button>
                </div>

            </div>
        </div>
    )
}