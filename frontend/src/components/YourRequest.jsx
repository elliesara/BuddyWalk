import "./yourrequest.css";
import PendingRequest from "./PendingRequest";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

function YourRequest( { request } ) {
    return (
        <div className="yourRequestContainer">
            <div className="yourRequest">
                <p className="from">Evans</p>
                <FontAwesomeIcon icon={faArrowRightLong} />
                <p className="destination">Foothill Residence Halls</p>
            </div>
            <PendingRequest requester="Alice" />
            <PendingRequest requester="Bob" />
        </div>
    )
}

export default YourRequest;
