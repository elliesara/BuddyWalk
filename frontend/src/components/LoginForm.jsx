import "./loginform.css";
import Button from "./Button"
import { useNavigate } from 'react-router-dom';

function LoginForm() {

    let navigate = useNavigate();

    function login(e) {
        e.preventDefault();
        fetch("http://localhost:8000/login", {
            method: "POST",
            body: JSON.stringify({
                "username": document.getElementById("user").value,
                "password": document.getElementById("pw").value,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
                if (data["message"] === "success") {
                    // send user to the front page with user=user
                } else {
                    alert("Login failed, please try again.");
                    console.log(data);
                }
            }
        )
        .catch(console.error);
    }

    function signup(e) {
        e.preventDefault();
        fetch("http://localhost:8000/createUser", {
            method: "POST",
            body: JSON.stringify({
                "username": document.getElementById("user").value,
                "password": document.getElementById("pw").value,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
                if (data["message"] === "success") {
                    // send user to the front page with user=user
                } else {
                    alert("Signup failed, please try again.");
                    console.log(data);
                }
            }
        )
        .catch(console.error);
    }

    return (
        <div className="loginCard">
            <header className="loginHeader1">Buddy Walk</header>
            <header className="loginHeader2">Log In</header>
            <form id="loginForm" onSubmit={login}>
                <input type="text" className="login" id="user" placeholder="Username" /><br />
                <input type="password" className="login" id="pw" placeholder="Password" /><br />
                <div className="buttonContainer">
                    <Button text="Log In" color="#5b91e2" callback={login} /> <Button text="Sign Up" color="#5b91e2" callback={signup}/>
                </div>
            </form>
        </div>
            
    )
}

export default LoginForm;
