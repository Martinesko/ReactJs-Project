import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as authService from './services/authService';
import AuthContext from "./contexts/context.js"
import usePersistedState from "./hooks/usePersistedState.js";


import Header from "./components/Header/Header.jsx"
import Home from "./components/Home/Home.jsx"
import Catalog from "./components/Catalog/Catalog.jsx"
import Create from "./components/Create/Create.jsx"
import Details from "./components/Details/Details.jsx"
import Register from "./components/Register/Register.jsx"
import Login from "./components/Login/Login.jsx"
import Logout from "./components/Logout/Logout.jsx"
import YourListings from "./components/CreatorListings/CreatorListings.jsx"
import Edit from "./components/Edit/Edit.jsx"
import Footer from "./components/Footer/Footer.jsx"
import Error from "./components/Error/Error.jsx"
import AuthGuard from "./components/Guards/AuthGuard.jsx"
import ListingGuard from "./components/Guards/ListingGuard.jsx"
import * as productService from "./services/productService.js";

function App() {
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', {});

    const loginSubmitHandler = async (values) => {

        try{
        const result = await authService.login(values.email, values.password);

        setAuth(result);
        localStorage.setItem('accessToken', result.accessToken);

        navigate("/");
        }
        catch(e){
            alert("Login or password don't match");
        }
    };

    const registerSubmitHandler = async (values) => {
        const { password, confirmPassword, ...rest } = values;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const result = await authService.register(
                rest.email,
                password,
            );
            setAuth(result);
            localStorage.setItem('accessToken', result.accessToken);

            navigate("/");
        }
        catch (e){
            alert("This account already exist!")
        }


    };

    const logoutHandler = async () => {
        const shouldLogout = window.confirm('Are you sure you want to log out?');
        if (shouldLogout){
            await authService.logout();
        }

        setAuth({});
        localStorage.removeItem('accessToken');

        navigate("/");
    };

    const values = {
        logoutHandler,
        registerSubmitHandler,
        loginSubmitHandler,
        isAuthenticated: !!auth.email,
        userId: auth._id
    };

    const isRegisterPage = location.pathname === '/register';
    const isLoginPage = location.pathname === '/login';
    return (

      <AuthContext.Provider value={values}>
          {isRegisterPage || isLoginPage ? null : <Header />}
          <div className='app'>
              <Routes>
                  <Route path={"/"} element={<Home/>} />
                  <Route path={"/listings"} element={<Catalog />} />
             <Route path={"/Details/:productId"} element={<Details />} />
                  <Route path={"*"} element={<Error/>} />
                  <Route path={"/register"} element={<Register />} />
                  <Route path={"/login"} element={<Login />} />
                  <Route element={<AuthGuard />}>
                      <Route path={"/listings/add"} element={<Create />} />
                      <Route path={"/yourlistings"} element={<YourListings />} />
                  <Route path={"/logout"} element={<Logout />} />
                      <Route element={<ListingGuard />}>
                          <Route path={"/yourlistings/edit/:_id"} element={<Edit />} />
                      </Route>
                  </Route>
              </Routes>
          </div>
          {isRegisterPage || isLoginPage ? null : <Footer/>}
      </AuthContext.Provider>
  )
}

export default App
