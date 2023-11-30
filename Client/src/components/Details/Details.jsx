export default function Details(){
    return(
        <div class="details-container">
            <div class="main-column">
                <div class="images">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHa2uFOS9MnYEi_lswFQY99pNNI45T_pQRcA&usqp=CAU"/>
                </div>
                <div id="description">
                    <h3>Description</h3>
                    <p1>Example description Example description Example description Example description Example description Example description Example description Example description Example description</p1>
                </div>
            </div>
            <div class="secondary-column">
                <div class="main-information">
                    <p>Added December 23, 2022</p>
                    <h1>Title 1</h1>
                    <h2>28 лв.</h2>
                    <button class="button">Call now</button>
                </div>
                <div class="seller-container">
                    <h4>Seller</h4>
                    <div class="seller-information">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"/>
                            <h4>Name of the seller</h4>
                    </div>
                </div>
                <div class="location-container">
                    <h4>Location</h4>
                    <h4>Sofia District</h4>
                </div>
            </div>
        </div>
    )
}