import { useContext } from "react";
import useForm  from "../../hooks/useForm.js";
import AuthContext from "../../contexts/context.js"

const LoginFormKeys = {
    email: 'email',
    password: 'password',
}

export default function Login(){
    const { loginSubmitHandler } = useContext(AuthContext);

    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        [LoginFormKeys.email]: '',
        [LoginFormKeys.password]: ''
    });

    return(
        <div className="register-main">
            <div className="register-col">
                <div className="login-container">
                    <h1>Login</h1>
                    <form onSubmit={onSubmit} className="form" >
                        <div className="reg-sec">
                            <label className="label" htmlFor="emailAddress">Email Address</label>
                            <input
                                onChange={onChange}
                                name={LoginFormKeys.email}
                                value={values[LoginFormKeys.email]}
                                type="email"
                                id="emailAddress"
                                className="form-control" />
                        </div>
                        <div className="reg-sec">
                            <label className="label" htmlFor="password">Password</label>
                            <input
                                onChange={onChange}
                                name={LoginFormKeys.password}
                                value={values[LoginFormKeys.password]}
                                type="password"
                                id="password"
                                className="form-control" />
                        </div>
                        <div className="buttons">
                            <button className="home-button">Back to home</button>
                            <button type="submit" className="register-button">Login</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}