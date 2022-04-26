import "./login.css";
import Button from "../components/Button";

function Login() {
    return (
        <div className="loginContainer">
            <div className="loginCard">
                <header className="loginHeader1">Buddy Walk</header>
                <header className="loginHeader2">Log In</header>
                <form id="loginForm">
                    <input type="text" className="login" placeholder="Username" /><br />
                    <input type="password" className="login" placeholder="Password" /><br />
                    <Button text="Sign In" color="#5b91e2" />
                </form>
            </div>
        </div>
    )
}

export default Login;
