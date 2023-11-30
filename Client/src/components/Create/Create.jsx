export default function Create(){
    return(
        <div class="Create-container">
        <h1> Add Listing </h1>
            <section>
                <h2>Title</h2>
                <div class="input">
                    <input placeholder="Enter the title of your listing"></input>
                </div>

                <h2>Category</h2>
                <div class="selection">
                    <select>
                        <option>hello</option>
                    </select>
                </div>

            </section>
            <section>
                <h2>Photos</h2>
            </section>
            <section>
                <h2>Details</h2>
                <div className="description">
                   <textarea placeholder="Enter the details of the product"></textarea>
                </div>
            </section>
            <section>
                <h2>Location</h2>
                <div className="selection">
                <select>
                    <option>Kyustendil</option>
                </select>
                </div>
            </section>
            <section>
                <h2>First name</h2>
                <div className="input">
                    <input placeholder="Enter your first name"></input>
                </div>

                <h2>Email</h2>
                <div className="input">
                    <input placeholder="Enter your email"></input>
                </div>

                <h2>Phone number</h2>
                <div className="input">
                    <input placeholder="Enter your phone number"></input>
                </div>
            </section>
            <section class="button-container">
                <button class="button">Add Listing</button>
            </section>
        </div>


    )
}