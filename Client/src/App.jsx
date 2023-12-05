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

function App() {
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', {});

    const loginSubmitHandler = async (values) => {

        const result = await authService.login(values.email, values.password);

        setAuth(result);
        localStorage.setItem('accessToken', result.accessToken);

        console.log(result);

        navigate("/");
    };

    const registerSubmitHandler = async (values) => {
        const result = await authService.register(values.email, values.password);

        setAuth(result);
        localStorage.setItem('accessToken', result.accessToken);


        console.log(result);

        navigate("/");
    };

    const logoutHandler = async () => {

        await authService.logout();

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
                  <Route path={"/listings/add"} element={<Create />} />
                  <Route path={"/Details/:productId"} element={<Details />} />
                  <Route path={"/register"} element={<Register />} />
                  <Route path={"/yourlistings"} element={<YourListings />} />
                  <Route path={"/yourlistings/edit/:_id"} element={<Edit />} />
                  <Route path={"/login"} element={<Login />} />
                  <Route path={"/logout"} element={<Logout />} />
              </Routes>
          </div>
      </AuthContext.Provider>
  )
}

export default App
