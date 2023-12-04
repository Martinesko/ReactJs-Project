import { useContext } from "react";
import useForm  from "../../hooks/useForm.js";
import AuthContext from "../../contexts/context.js"

const RegisterFormKeys = {
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword',
}

export default function Register(){
    const { registerSubmitHandler } = useContext(AuthContext);

    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        [RegisterFormKeys.email]: '',
        [RegisterFormKeys.password]: ''
    });

    return(
        <div className="register-main">
            <div className="register-col">
                <div className="register-container">
                    <h1>Register</h1>
                    <form onSubmit={onSubmit} className="form">
                        <div className="reg-sec">
                            <label className="label" htmlFor="emailAddress">Email Address</label>
                            <input
                                onChange={onChange}
                                name={RegisterFormKeys.email}
                                value={values[RegisterFormKeys.email]}
                                type="email"
                                id="emailAddress"
                                className="form-control" />
                        </div>
                        <div className="reg-sec">
                            <label className="label" htmlFor="password">Password</label>
                            <input
                                onChange={onChange}
                                name={RegisterFormKeys.password}
                                value={values[RegisterFormKeys.password]}
                                type="password"
                                id="password"
                                className="form-control" />
                        </div>
                        <div className="reg-sec">
                            <label className="label" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                onChange={onChange}
                                name={RegisterFormKeys.confirmPassword}
                                value={values[RegisterFormKeys.confirmPassword]}
                                type="password"
                                id="confirmPassword"
                                className="form-control" />
                        </div>
                        <div className="buttons">
                            <button className="home-button">Back to home</button>
                            <button type="submit" className="register-button">Register</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}