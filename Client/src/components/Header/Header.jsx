export default function Header(){
    return(
        <header>
            <p1>Shop</p1>
            <nav>
               <div id="user">
                   <a>Create</a>
                   <a>Your profile</a>
                   <a>Logout</a>
               </div>
               <div id="guest">
                   <a>Login</a>
                   <a>Register</a>
               </div>
            </nav>
        </header>
    );
}