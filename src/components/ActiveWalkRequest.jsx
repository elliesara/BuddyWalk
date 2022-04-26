import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import Button from "./Button";
import Avatar from "./Avatar";
import "./activewalkrequest.css";

function ActiveWalkRequest({ requester, from, to }) {
    // requester probably should be changed from a string to a user account, and then reference that for the username string
    // distance from requester ? maybe with a location api if those exist
    // requester string and profile picture should be replaced from the user data, i just have placeholders for now

    const sendRequest = () => {
        // ? backend stuff
    }

    return (
        <div class="container">
            <div class="containerItem">
                <Avatar source="./a.png" />
            </div>
            <div class="containerItem">
                <p class="requester">{requester}</p>
            </div>
            <div class="containerItem">
                <div class="stackedContainer">
                    <p class="stacked">{from} <FontAwesomeIcon icon={faArrowRightLong} /></p>
                    <p class="stacked destination">{to}</p>
                </div>
            </div>
            <div class="stackedContainer">
                <Button text="Offer a walk" color="orange" callback={sendRequest} class="item" />
            </div>
        </div>
    ) // why is this not aligned properly i cant figure it out
}

export default ActiveWalkRequest;
