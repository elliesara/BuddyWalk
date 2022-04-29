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
                <p className="stacked requesterDistance">0.4mi</p>
            </div>
            <div className="stacked">
                <p className="stacked currentlyAt">Currently at</p>
                <p className="stacked requesterLocation">Crossroads</p>
            </div>
            <div className="choices">
                <Button text="Accept" color="#34c258" callback={acceptRequest} />
                <Button text="Decline" color="#c23445" callback={rejectRequest} />
            </div>
        </div>
    )
}

export default PendingRequest;
