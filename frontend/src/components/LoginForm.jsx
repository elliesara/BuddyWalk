import "./loginform.css";
import Button from "./Button"

function LoginForm() {
    function login() {

    }

    function signup(e) {
        e.preventDefault();
        fetch("http://localhost:8000/createUser", {
            method: "POST",
            body: JSON.stringify({
                "username": document.getElementById("signupUser").value,
                "password": document.getElementById("signupPw").value,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
                if (data["message"] === "success") {
                    console.log("success");
                } else {
                    console.log("fml");
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
                <input type="text" className="login" id="loginUser" placeholder="Username" /><br />
                <input type="password" className="login" id="loginPw" placeholder="Password" /><br />
                <div className="buttonContainer">
                    <Button text="Log In" color="#5b91e2" />
                </div>
            </form> <br />
            <header className="loginHeader2">Sign Up</header>
            <form id="signupForm" method="POST" onSubmit={signup}>
                <input type="text" className="login" id="signupUser" placeholder="Username" /><br />
                <input type="password" className="login" id="signupPw" placeholder="Password" /><br />
                <div className="buttonContainer">
                    <Button text="Sign Up" color="#5b91e2" />
                </div>
            </form>
        </div>
            
    )
}

export default LoginForm;
