import React from 'react';
import {Link} from 'react-router-dom';
import {useEffect} from 'react';

const Register = (props) => {
    const {isLoggedIn, isLoading, onSubmit} = props;
    const [inputs, setInputs] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState({});

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit({email: inputs.emailInput, password: inputs.passwordInput});
    };

    const handleInput = (evt) => {
        setInputs({
            ...inputs,
            [evt.target.name]: evt.target.value,
        });
        setErrorMessage({
            ...errorMessage,
            [evt.target.name]: evt.target.validationMessage,
        });
    };

    useEffect(() => {
        const notFilledInputs = !inputs.emailInput || !inputs.passwordInput;
        const errorsInInputs = Boolean(errorMessage.emailInput || errorMessage.passwordInput);
        const isFormValid = !(notFilledInputs || errorsInInputs);
        setIsValid(isFormValid);
    }, [inputs, errorMessage]);

    useEffect(() => {
        setInputs({});
        setErrorMessage({});
        setIsValid(false);
    }, [isLoggedIn]);

    return (
        <div className="auth-page__section">
            <h2 className="auth-page__title">Sign up</h2>
            <form onSubmit={handleSubmit} className={`auth-page__form`} name="register">
                <input
                    onChange={handleInput}
                    value={inputs.emailInput || ''}
                    id="email-input"
                    type="email"
                    className={`auth-page__input`}
                    name="emailInput"
                    required
                    minLength="2"
                    maxLength="40"
                    placeholder="Email"
                />
                <span
                    className={`auth-page__input_error ${isValid ? '' : 'auth-page__input_error_active'}`}>{errorMessage.emailInput}
                </span>
                <input
                    onChange={handleInput}
                    value={inputs.passwordInput || ''}
                    id="password-input"
                    type="password"
                    className={`auth-page__input`}
                    name="passwordInput"
                    required
                    minLength="2"
                    maxLength="200"
                    placeholder="Password"
                />
                <span
                    className={`auth-page__input_error ${isValid ? '' : 'auth-page__input_error_active'}`}>
                    {errorMessage.passwordInput}
                </span>
                <button disabled={!isValid} type="submit"
                        className={`button auth-page__button-submit 
                        ${!isValid ? 'auth-page__button-submit_disabled' : ''}`}>
                        {isLoading ? 'Signing you up...' : 'Sign up'}
                </button>
                <div className="auth-page__status">
                    <Link to="/signin"
                          className="auth-page__link">
                        Already a member? Log in here!
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;