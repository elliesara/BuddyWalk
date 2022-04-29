import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import Button from "./Button";
import Avatar from "./Avatar";
import "./activerequest.css";

function ActiveRequest({ requester, from, to }) {
    // requester probably should be changed from a string to a user account, and then reference that for the username string
    // distance from requester ? maybe with a location api if those exist
    // requester string and profile picture should be replaced from the user data, i just have placeholders for now

    const sendRequest = () => {
        // ? backend stuff
    }

    return (
        <div class="container">
            <Avatar source="./a.png" />
            <p class="requester">{requester}</p>
            <div class="stackedContainer">
                <p class="stacked">{from} <FontAwesomeIcon icon={faArrowRightLong} /></p>
                <p class="stacked destination">{to}</p>
            </div>
            <Button text="Offer a walk" color="orange" callback={sendRequest} />
        </div>
    ) // why is this not aligned properly i cant figure it out
}

export default ActiveRequest;
