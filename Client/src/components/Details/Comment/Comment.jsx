export default function Comment(value){
    return(
    <div className="comment">
        <h3>{value.owner.email}</h3>
        <p>{value.comment}</p>
    </div>
    )
}