import "./activeoffer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

function ActiveOffer( { offeredTo, status } ) {
    return (
        <div className="activeOffer">
            <div className="horizContainer">
                <p className="emphasized">Offered to: </p>
                <p>{offeredTo}</p>
            </div>
            <div className="horizContainer">
                <p className="emphasized">Status:</p>
                <p>{status}</p>
            </div>
        </div>
    )
}

export default ActiveOffer;
