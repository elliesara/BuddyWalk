import "./pastrequest.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

function PastRequest( { from, to } ) {
    return (
        <div className="pastWalkRequest">
            <p className="from">{from}</p>
            <FontAwesomeIcon icon={faArrowRightLong} />
            <p className="destination">{to}</p>
        </div>
    )
}

export default PastRequest;
