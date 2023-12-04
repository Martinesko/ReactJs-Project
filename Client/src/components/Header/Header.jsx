import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <header>
            <a href="http://127.0.0.1:5173/">Shop</a>
            <nav>
               <div id="user">
                   <Link to="/products/add">Create</Link>
                   <Link to="/yourlistings">Your listings</Link>
                   <Link to="/logout">Logout</Link>
               </div>
               <div id="guest">
                   <Link to="/login">Login</Link>
                   <Link to="/register">Register</Link>
               </div>
            </nav>
        </header>
    );
}