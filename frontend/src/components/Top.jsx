import "./top.css";
import Avatar from "./Avatar"

function Top( {user} ) {
    return (
        <div className="top">
            <header className="top-header">Buddy Walk</header>
            <div className="userInfo">
                {/* <Avatar source="./a.png" /> */}
                <p className="username">{user}</p>
            </div>
        </div>
    )
}

export default Top;
