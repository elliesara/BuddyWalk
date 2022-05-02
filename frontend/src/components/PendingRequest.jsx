import "./pendingrequest.css";
import Button from "./Button";
import Avatar from "./Avatar";

function PendingRequest( {requester} ) {
    // usual stuff, populate this with user details from requester object (avatar, distance, location)

    const acceptRequest = () => {
        // fill out
        return;
    }

    const rejectRequest = () => {
        // fill out
        return;
    }

    return (
        <div className="pendingRequest">
            <Avatar source="./a.png" />
            <div className="stackedContainer">
                <p className="stacked requester">{requester}</p>
            </div>
            <div className="choices">
                <Button text="Accept" color="#34c258" callback={acceptRequest} />
                <Button text="Decline" color="#c23445" callback={rejectRequest} />
            </div>
        </div>
    )
}

export default PendingRequest;
