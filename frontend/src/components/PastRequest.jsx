import "./pastrequest.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

function PastRequest( { from, to } ) {
    return (
        <div class="pastWalkRequest">
            <p class="from">{from}</p>
            <FontAwesomeIcon icon={faArrowRightLong} />
            <p class="destination">{to}</p>
        </div>
    )
}

export default PastRequest;
