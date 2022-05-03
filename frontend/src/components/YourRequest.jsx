import "./yourrequest.css";
import PendingRequest from "./PendingRequest";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

function YourRequest( { rid, from, to } ) {
    return (
        <div className="yourRequestContainer">
            <div className="yourRequest">
                <p className="from">{from}</p>
                <FontAwesomeIcon icon={faArrowRightLong} />
                <p className="destination">{to}</p>
            </div>
        </div>
    )
}

export default YourRequest;
